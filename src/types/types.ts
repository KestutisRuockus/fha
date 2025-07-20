import type { Dispatch, SetStateAction } from "react";

type ImagesSrc = {
  original: string;
  large2x?: string;
  large?: string;
  medium?: string;
  small?: string;
  portrait?: string;
  landscape?: string;
  tiny?: string;
};

export type Image = {
  id: number;
  photographer: string;
  src: ImagesSrc;
  avg_color: string;
  alt: string;
};

export type InfiniteScrollProps = {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
};

export type ActiveComponent = "images" | "favourites";

export type LinkProps = {
  name: string;
  component: ActiveComponent;
};

export type NavbarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ViewType = "images" | "favourites";

export type ViewContextType = {
  view: ViewType;
  setView: (view: ViewType) => void;
};

export type SearchContextType = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};
