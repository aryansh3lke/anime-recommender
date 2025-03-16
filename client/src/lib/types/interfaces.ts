export interface User {
  name: string | null;
  image: string | null;
  id: string;
  email: string;
  emailVerified: Date | null;
  watchlist: Anime[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Anime {
  name: string;
  image: string;
  url: string;
  score: number;
  popularity: number;
  synopsis: string;
  isAdded?: boolean;
}

export type SortType = "score" | "popularity" | "name";
export type SortOrder = "ascending" | "descending";
