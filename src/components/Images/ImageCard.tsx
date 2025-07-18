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
      <img
        src={src.medium}
        alt={alt}
        loading="lazy"
        srcSet={`
           ${src.tiny} 280w,
           ${src.small} 130w,
          ${src.medium} 350w,
          ${src.large} 940w,
          ${src.large2x} 1880w
  `}
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        style={{ backgroundColor: imageDetails.avg_color }}
      />
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
