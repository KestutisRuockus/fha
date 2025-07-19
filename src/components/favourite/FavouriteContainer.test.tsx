import { fireEvent, render, screen } from "@testing-library/react";
import * as localStorageUtils from "../../utils/localStorage";
import FavouriteContainer from "./FavouriteContainer";

// Sample images to mock
const samplePhotos = [
  {
    id: 1,
    photographer: "Alice",
    src: { medium: "img1-medium.jpg", tiny: "img1-tiny.jpg" },
    avg_color: "#000000",
    alt: "Photo 1",
  },
  {
    id: 2,
    photographer: "Bob",
    src: { medium: "img2-medium.jpg", tiny: "img2-tiny.jpg" },
    avg_color: "#111111",
    alt: "Photo 2",
  },
];

vi.mock("../../utils/localStorage", () => ({
  getFavouritePhotos: vi.fn(),
  saveFavouritePhoto: vi.fn(),
}));

describe("FavouriteContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders empty state if no favorite photos", () => {
    vi.mocked(localStorageUtils.getFavouritePhotos).mockReturnValue([]);

    render(<FavouriteContainer />);

    expect(screen.getByText(/No favourite photos/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Add some from the curated gallery/i)
    ).toBeInTheDocument();
  });

  it("renders favourite photos when available", () => {
    vi.mocked(localStorageUtils.getFavouritePhotos).mockReturnValue(
      samplePhotos
    );

    render(<FavouriteContainer />);
    expect(screen.getAllByRole("img").length).toBe(samplePhotos.length);

    samplePhotos.forEach((photo) => {
      expect(screen.getByAltText(photo.alt)).toBeInTheDocument();
      expect(screen.getByText(photo.photographer)).toBeInTheDocument();
    });
  });

  it("removes photo when onRemove called", () => {
    vi.mocked(localStorageUtils.getFavouritePhotos).mockReturnValue(
      samplePhotos
    );
    const { rerender } = render(<FavouriteContainer />);

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    fireEvent.click(removeButtons[0]);

    expect(localStorageUtils.saveFavouritePhoto).toHaveBeenCalledWith([
      samplePhotos[1],
    ]);

    rerender(<FavouriteContainer />);

    expect(screen.getAllByRole("img").length).toBe(1);
    expect(screen.getByAltText(samplePhotos[1].alt)).toBeInTheDocument();
  });
});
