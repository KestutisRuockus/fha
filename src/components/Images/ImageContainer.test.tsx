import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ImagesContainer from "./ImagesContainer";
import type { Image } from "../../types/types";

import useFetchImages from "../../hooks/useFetchImages";
import { getFavouritePhotos } from "../../utils/localStorage";
import { SearchContext } from "../../context/SearchContext";

vi.mock("../../hooks/useFetchImages");
vi.mock("../../utils/localStorage");

// Mock ImageCard
vi.mock("./ImageCard", () => ({
  __esModule: true,
  default: ({
    imageDetails,
    isFavourited,
    onRemove,
  }: {
    imageDetails: Image;
    isFavourited: boolean;
    onRemove?: (photoId: number) => void;
  }) => {
    const handleClick = () => {
      if (onRemove) {
        onRemove(imageDetails.id);
      }
    };

    return (
      <div data-testid="image-card">
        <img src={imageDetails.src.original} alt={imageDetails.alt} />
        <button onClick={handleClick}>
          {isFavourited ? "Remove" : "Favourite"}
        </button>
      </div>
    );
  },
}));

const mockedUseFetchImages = vi.mocked(useFetchImages);
const mockedGetFavouritePhotos = vi.mocked(getFavouritePhotos);

const renderWithSearchProvider = () => {
  return render(
    <SearchContext.Provider value={{ query: "", setQuery: vi.fn() }}>
      <ImagesContainer />
    </SearchContext.Provider>
  );
};

describe("ImagesContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders images and favorites correctly", () => {
    const images: Image[] = [
      {
        id: 1,
        photographer: "Photographer 1",
        src: { original: "url1.jpg" },
        avg_color: "#000",
        alt: "Image 1",
      },
      {
        id: 2,
        photographer: "Photographer 2",
        src: { original: "url2.jpg" },
        avg_color: "#fff",
        alt: "Image 2",
      },
    ];

    mockedUseFetchImages.mockReturnValue({
      imagesList: images,
      loading: false,
      hasMoreResults: false,
      setPage: vi.fn(),
    });

    mockedGetFavouritePhotos.mockReturnValue([images[0]]);

    renderWithSearchProvider();

    const imageCards = screen.getAllByTestId("image-card");
    expect(imageCards).toHaveLength(2);

    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(2);
    expect(imgs[0]).toHaveAttribute("src", "url1.jpg");
    expect(imgs[0]).toHaveAttribute("alt", "Image 1");
    expect(imgs[1]).toHaveAttribute("src", "url2.jpg");
    expect(imgs[1]).toHaveAttribute("alt", "Image 2");

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    expect(removeButtons).toHaveLength(1);
  });

  it("shows loading message when loading is true", () => {
    mockedUseFetchImages.mockReturnValue({
      imagesList: [],
      loading: true,
      hasMoreResults: false,
      setPage: vi.fn(),
    });
    mockedGetFavouritePhotos.mockReturnValue([]);

    renderWithSearchProvider();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("throws error if SearchContext is missing", () => {
    const renderWithoutProvider = () => render(<ImagesContainer />);
    expect(renderWithoutProvider).toThrow("must be used within a ViewProvider");
  });
});
