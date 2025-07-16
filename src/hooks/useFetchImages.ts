import { useCallback, useEffect, useRef, useState } from "react";
import type { Image } from "../types/types";

const useFetchImages = () => {
  const [imagesList, setImagesList] = useState<Image[] | []>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreResulsts, setHasMoreResults] = useState<boolean>(true);
  const isFetchingRef = useRef<boolean>(false);

  const fetchImages = useCallback(async () => {
    if (isFetchingRef.current) return;

    const API_KEY = "lxh1DxF1eYJWsFAAWb0fR2u7v7UIbG2qKDaCmROu1YW25Z6zVCpAa9qG";
    const BASE_URL = "https://api.pexels.com/v1/";

    setLoading(true);
    isFetchingRef.current = true;

    try {
      const url = `${BASE_URL}curated?page=${page}&per_page=${perPage}`;
      const response = await fetch(url, {
        headers: {
          Authorization: API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      const requiredData: Image[] = json.photos.map((photo: Image) => ({
        id: photo.id,
        photographer: photo.photographer,
        src: photo.src,
        avg_color: photo.avg_color,
        alt: photo.alt,
      }));

      setHasMoreResults(json.next_page ? true : false);
      setImagesList((prev) => [...prev, ...requiredData]);
    } catch (err) {
      console.log(err);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, [page, perPage]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages, page]);

  return { imagesList, setPage, loading, hasMoreResulsts };
};

export default useFetchImages;
