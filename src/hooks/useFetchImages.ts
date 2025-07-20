import { useEffect, useRef, useState, useCallback, useContext } from "react";
import type { Image } from "../types/types";
import { SearchContext } from "../context/SearchContext";

const useFetchImages = () => {
  const [imagesList, setImagesList] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const isFetchingRef = useRef(false);
  const prevQueryRef = useRef<string>("");

  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error("must be used within a ViewProvider");
  }

  const { query } = searchContext;

  const fetchImages = useCallback(
    async (pageToFetch: number, query: string = "") => {
      const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
      const BASE_URL = import.meta.env.VITE_PEXELS_BASE_URL;
      const perPage = 10;

      if (!API_KEY || !BASE_URL) {
        console.log("Missing API key or base URL in environment variables");
        setLoading(false);
        return;
      }
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;
      setLoading(true);

      try {
        let url: string;
        if (query) {
          console.log(`QUERY EXIST: ${query}`);
          url = `${BASE_URL}/search?query=${query}&page=${pageToFetch}&per_page=${perPage}`;
        } else {
          console.log(`QUERY IS EMPTY`);
          url = `${BASE_URL}curated?page=${pageToFetch}&per_page=${perPage}`;
        }

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
    },
    []
  );

  useEffect(() => {
    if (prevQueryRef.current !== query) {
      setImagesList([]);
      setPage(1);
      prevQueryRef.current = query;

      fetchImages(1, query);
    } else {
      fetchImages(page, query);
    }

    fetchImages(page, query);
  }, [page, fetchImages, query]);

  return { imagesList, setPage, loading, hasMoreResults };
};

export default useFetchImages;
