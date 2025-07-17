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
