import { useCallback, useContext, useEffect, useRef, useState } from "react";
import useFetchImages from "../../hooks/useFetchImages";
import ImageCard from "./ImageCard";
import type { Image } from "../../types/types";
import { getFavouritePhotos } from "../../utils/localStorage";
import { SearchContext } from "../../context/SearchContext";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

function ImagesContainer() {
  const { imagesList, loading, hasMoreResults, setPage } = useFetchImages();

  const [favouritePhotos, setFavouritePhotos] = useState<Image[] | []>([]);

  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error("must be used within a ViewProvider");
  }

  const { query } = searchContext;

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

  useEffect(() => {
    const photos = getFavouritePhotos();
    setFavouritePhotos(photos);
  }, []);

  return (
    <div className="container">
      <header>Photos</header>
      {query && imagesList.length === 0 && !loading && (
        <p>There Are No Results by query: '{query}'</p>
      )}

      {imagesList.map((image, index) => {
        const isLast = index === imagesList.length - 1;

        return (
          <ImageCard
            key={`${image.id}-${index}`}
            imageDetails={image}
            ref={isLast ? lastElementRef : null}
            isFavourited={favouritePhotos.some(
              (photo) => photo.id === image.id
            )}
          />
        );
      })}
      {loading && <LoadingSpinner />}
    </div>
  );
}

export default ImagesContainer;
