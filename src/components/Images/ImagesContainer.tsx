import { useCallback, useRef } from "react";
import useFetchImages from "../../hooks/useFetchImages";
import ImageCard from "./ImageCard";

function ImagesContainer() {
  const { imagesList, loading, hasMoreResults, setPage } = useFetchImages();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreResults) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMoreResults, setPage]
  );

  return (
    <div className="container">
      {imagesList.map((image, index) => {
        const isLast = index === imagesList.length - 1;

        return (
          <ImageCard
            key={`${image.id}-${index}`}
            imageDetails={image}
            ref={isLast ? lastElementRef : null}
          />
        );
      })}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default ImagesContainer;
