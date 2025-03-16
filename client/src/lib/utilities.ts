import { SortOrder, SortType } from "./types/interfaces";

// Check if image url is valid
export const isValidUrl = (urlString: string): boolean => {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};

// Return default sorting order for current sort type
export const getDefaultSortOrder = (sortType: SortType): SortOrder => {
  if (sortType === "score" || sortType === "popularity") {
    return "descending";
  } else {
    // if (sortType === "name")
    return "ascending";
  }
};
