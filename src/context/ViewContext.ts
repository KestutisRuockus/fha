import { createContext } from "react";
import { type ViewContextType } from "../types/types";

export const ViewContext = createContext<ViewContextType | undefined>(
  undefined
);
