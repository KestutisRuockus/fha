import type { Image } from "../types/types";

export const saveFavouritePhoto = (photos: Image[]) => {
  localStorage.setItem("photos", JSON.stringify(photos));
};

export const getFavouritePhotos = () => {
  const data = localStorage.getItem("photos");
  return data ? JSON.parse(data) : [];
};

export const removeFavouritePhoto = (id: number) => {
  const photosInStorage = getFavouritePhotos();
  const filteredPhotos = photosInStorage.filter(
    (photo: Image) => photo.id !== id
  );
  saveFavouritePhoto(filteredPhotos);
};

export const toggleFavouritePhoto = (image: Image) => {
  const photosInStorage = getFavouritePhotos();
  if (photosInStorage.some((photo: Image) => photo.id === image.id)) {
    removeFavouritePhoto(image.id);
  } else {
    saveFavouritePhoto([...photosInStorage, image]);
  }
};
