import React from "react";
import type { Image } from "../types/types";

const ImageCard = React.forwardRef<HTMLDivElement, { imageDetails: Image }>(
  ({ imageDetails }, lastElementRef) => {
    const { photographer, src, alt } = imageDetails;

    return (
      <div className="image-card" ref={lastElementRef}>
        <img src={src.medium} alt={alt} />
        <div className="image-details">
          <h1>{alt}</h1>
          <div className="dash"></div>
          <p>{photographer}</p>
          <button>Favourite</button>
        </div>
      </div>
    );
  }
);

export default React.memo(ImageCard);
