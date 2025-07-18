import React, { useState } from "react";
import type { Image } from "../../types/types";
import { toggleFavouritePhoto } from "../../utils/localStorage";

const ImageCard = React.forwardRef<
  HTMLDivElement,
  { imageDetails: Image; isFavourited: boolean }
>(({ imageDetails, isFavourited }, lastElementRef) => {
  const { photographer, src, alt } = imageDetails;
  const [favourited, setFavourited] = useState<boolean>(isFavourited);

  const favouritePhoto = () => {
    toggleFavouritePhoto(imageDetails);
    setFavourited(!favourited);
  };

  return (
    <div className="image-card" ref={lastElementRef}>
      <img src={src.medium} alt={alt} />
      <div className="image-details">
        <h1>{alt}</h1>
        <div className="dash"></div>
        <p>{photographer}</p>
        <button onClick={favouritePhoto}>
          {favourited ? "Remove" : "Favourite"}
        </button>
      </div>
    </div>
  );
});

export default React.memo(ImageCard);
