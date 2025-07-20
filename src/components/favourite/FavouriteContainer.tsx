import { useEffect, useState } from "react";
import type { Image } from "../../types/types";
import {
  getFavouritePhotos,
  saveFavouritePhoto,
} from "../../utils/localStorage";
import ImageCard from "../Images/ImageCard";

function FavouriteContainer() {
  const [favouritePhotos, setFavouritePhotos] = useState<Image[] | []>([]);

  function handleRemovePhoto(photoId: number) {
    const updatedPhotos = favouritePhotos.filter(
      (photo) => photo.id !== photoId
    );
    saveFavouritePhoto(updatedPhotos);

    setFavouritePhotos(updatedPhotos);
  }

  useEffect(() => {
    const photos = getFavouritePhotos();
    setFavouritePhotos(photos);
  }, []);

  return (
    <div className="container">
      <header>Favourite</header>

      {favouritePhotos.length === 0 ? (
        <div className="empty-favourite-container">
          <p>No favourite photos.</p>
          <p>Add some from the curated gallery!</p>
        </div>
      ) : (
        favouritePhotos.map((image, index) => (
          <ImageCard
            key={`${image.id}-${index}`}
            imageDetails={image}
            isFavourited={true}
            onRemove={handleRemovePhoto}
          />
        ))
      )}
    </div>
  );
}

export default FavouriteContainer;
