import type { Image } from "../types/types";
import {
  getFavouritePhotos,
  removeFavouritePhoto,
  saveFavouritePhoto,
  toggleFavouritePhoto,
} from "./localStorage";

describe("favourite photos utils", () => {
  const mockPhotos: Image[] = [
    {
      id: 1,
      photographer: "Alice",
      src: { original: "photo1.jpg", medium: "photo1_medium.jpg" },
      avg_color: "#ffffff",
      alt: "Photo 1",
    },
    {
      id: 2,
      photographer: "Bob",
      src: { original: "photo2.jpg", medium: "photo2_medium.jpg" },
      avg_color: "#000000",
      alt: "Photo 2",
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("saveFavouritePhoto", () => {
    it("saves photos array to localStorage", () => {
      saveFavouritePhoto(mockPhotos);
      const stored = localStorage.getItem("photos");
      expect(stored).toBe(JSON.stringify(mockPhotos));
    });
  });

  describe("getFavouritePhotos", () => {
    it("returns empty array if nothing in localStorage", () => {
      expect(getFavouritePhotos()).toEqual([]);
    });

    it("parses and returns stored photos", () => {
      localStorage.setItem("photos", JSON.stringify(mockPhotos));
      expect(getFavouritePhotos()).toEqual(mockPhotos);
    });
  });

  describe("removeFavouritePhoto", () => {
    it("removes photo by id and updates storage", () => {
      localStorage.setItem("photos", JSON.stringify(mockPhotos));
      removeFavouritePhoto(2);
      const updatedPhotos = JSON.parse(localStorage.getItem("photos")!);
      expect(updatedPhotos).toHaveLength(1);
      expect(updatedPhotos[0].id).toBe(1);
    });
  });

  describe("toggleFavouritePhoto", () => {
    it("adds photo if not already in favourites", () => {
      localStorage.setItem("photos", JSON.stringify([mockPhotos[0]]));
      toggleFavouritePhoto(mockPhotos[1]);
      const stored = JSON.parse(localStorage.getItem("photos")!);
      expect(stored).toHaveLength(2);
      expect(stored.some((photo: Image) => photo.id === mockPhotos[0].id)).toBe(
        true
      );
    });

    it("remove photo if already in favourites", () => {
      localStorage.setItem("photos", JSON.stringify(mockPhotos));
      toggleFavouritePhoto(mockPhotos[0]);
      const stored = JSON.parse(localStorage.getItem("photos")!);
      expect(stored).toHaveLength(1);
      expect(stored.some((photo: Image) => photo.id === mockPhotos[0].id)).toBe(
        false
      );
    });

    it("works correctly if localStorage is empty", () => {
      localStorage.clear();
      toggleFavouritePhoto(mockPhotos[0]);
      const stored = JSON.parse(localStorage.getItem("photos")!);
      expect(stored).toHaveLength(1);
      expect(stored[0].id).toBe(mockPhotos[0].id);
    });
  });
});
