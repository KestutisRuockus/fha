import { createContext } from "react";
import type { SearchContextType } from "../types/types";

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);
