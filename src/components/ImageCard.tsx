import type { Image } from "../types/types";

const ImageCard = ({ imageDetails }: { imageDetails: Image }) => {
  const { photographer, src, alt } = imageDetails;
  return (
    <div className="image-card">
      <img src={src.medium} alt={alt} />
      <div className="image-details">
        <h1>{alt}</h1>
        <div className="dash"></div>
        <p>{photographer}</p>
        <button>Favourite</button>
      </div>
    </div>
  );
};

export default ImageCard;
