import { act, renderHook } from "@testing-library/react";
import useFetchImages from "./useFetchImages";

const mockPhotos = [
  {
    id: 1,
    photographer: "Alice",
    src: { medium: "photo1.jpg" },
    avg_color: "#ffffff",
    alt: "Photo 1",
  },
  {
    id: 2,
    photographer: "Bob",
    src: { medium: "photo2.jpg" },
    avg_color: "#000000",
    alt: "Photo 2",
  },
];

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("useFetchImages", () => {
  it("should initialize with correct default state", () => {
    globalThis.fetch = vi.fn(
      () => new Promise(() => {})
    ) as unknown as typeof fetch;

    const { result } = renderHook(() => useFetchImages());

    expect(result.current.imagesList).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.hasMoreResults).toBe(true);
  });

  it("fetches images and updates state correctly", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ photos: mockPhotos, next_page: true }),
    }) as unknown as typeof fetch;

    const { result } = renderHook(() => useFetchImages());

    await act(async () => {
      await Promise.resolve();
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(result.current.imagesList).toEqual(mockPhotos);
    expect(result.current.loading).toBe(false);
    expect(result.current.hasMoreResults).toBe(true);
  });

  it("sets hasMOreResults to false if no next_page in response", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ photos: mockPhotos, next_page: null }),
    }) as unknown as typeof fetch;

    const { result } = renderHook(() => useFetchImages());

    await act(async () => {});

    expect(result.current.hasMoreResults).toBe(false);
  });

  it("handles non-OK response gracefullt", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }) as unknown as typeof fetch;

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useFetchImages());

    await act(async () => {});

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.imagesList).toEqual([]);
  });

  it("handle throw erros ( e.g. network failure )", async () => {
    globalThis.fetch = vi
      .fn()
      .mockRejectedValue(new Error("Network error")) as unknown as typeof fetch;

    const consoleSpyError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useFetchImages());

    await act(async () => {});

    expect(consoleSpyError).toHaveBeenCalledWith(expect.any(Error));
    expect(result.current.loading).toBe(false);
    expect(result.current.imagesList).toEqual([]);
  });

  it("avoids duplicate fetches if already fetching", async () => {
    let resolveFetch: (
      value: Response | PromiseLike<Response>
    ) => void = () => {};

    globalThis.fetch = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        })
    );

    const { result } = renderHook(() => useFetchImages());

    act(() => {
      result.current.setPage(2);
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    resolveFetch(
      new Response(JSON.stringify({ photos: mockPhotos, next_page: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    await act(async () => {});
  });

  it("fetches next page when setPage is called", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ photos: mockPhotos, next_page: "page=3" }),
    }) as unknown as typeof fetch;

    const { result } = renderHook(() => useFetchImages());

    await act(async () => {});

    act(() => {
      result.current.setPage(2);
    });

    await act(async () => {});

    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    expect(result.current.imagesList.length).toBe(4);
  });

  it("logs a message and stops loading if API key or Base URL is missing", async () => {
    import.meta.env.VITE_PEXELS_API_KEY = "";
    import.meta.env.VITE_PEXELS_BASE_URL = "";

    globalThis.fetch = vi.fn();

    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const { result } = renderHook(() => useFetchImages());

    await act(async () => {});

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Missing API key or base URL in environment variables"
    );
    expect(result.current.loading).toBe(false);
  });
});
