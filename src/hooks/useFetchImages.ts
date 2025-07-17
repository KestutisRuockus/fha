import { useEffect, useRef, useState, useCallback } from "react";
import type { Image } from "../types/types";

const useFetchImages = () => {
  const [imagesList, setImagesList] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const isFetchingRef = useRef(false);

  const fetchImages = useCallback(async (pageToFetch: number) => {
    const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
    const BASE_URL = import.meta.env.VITE_PEXELS_BASE_URL;
    const perPage = 10;

    if (!API_KEY || !BASE_URL) {
      throw new Error("Missing API key or base URL in environment variables");
    }
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const url = `${BASE_URL}curated?page=${pageToFetch}&per_page=${perPage}`;
      const response = await fetch(url, {
        headers: { Authorization: API_KEY },
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

      setImagesList((prev) => [...prev, ...requiredData]);
      setHasMoreResults(!!json.next_page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchImages(page);
  }, [page, fetchImages]);

  return { imagesList, setPage, loading, hasMoreResults };
};

export default useFetchImages;
