import useFetchImages from "../hooks/useFetchImages";
import ImageCard from "./ImageCard";

function ImagesContainer() {
  const { imagesList, loading } = useFetchImages();

  return (
    <div className="container">
      {!loading &&
        imagesList.map((image) => (
          <ImageCard key={image.id} imageDetails={image} />
        ))}
    </div>
  );
}

export default ImagesContainer;
