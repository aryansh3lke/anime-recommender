export interface Recommendation {
  name: string;
  image: string;
  url: string;
  score: number;
  popularity: number;
  synopsis: string;
}

export type SortSetting = "score" | "popularity" | "name";

export interface CircleImageProps {
  src: string;
  alt: string;
}
