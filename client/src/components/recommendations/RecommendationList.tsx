import React, { useEffect, useState } from "react";
import { Anime, SortType, SortOrder } from "@/lib/types/interfaces";

import AnimeCardList from "@/components/recommendations/AnimeCardList";

export default function RecommendationList({
  recommendations,
  sortType,
  sortOrder,
  onAdd,
  onRemove,
  isWatchlist = false,
}: {
  recommendations: Anime[];
  sortType: SortType;
  sortOrder: SortOrder;
  onAdd?: (anime: Anime) => Promise<void>;
  onRemove?: (anime: Anime) => Promise<void>;
  isWatchlist?: boolean;
}) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    setIsMounted(false);
    const callSort = async () => {
      sortRecommendations().then(() => setIsMounted(true));
      setKey((prevKey) => prevKey + 1);
    };
    callSort();
  }, [sortType, sortOrder]);

  const sortRecommendations = async () => {
    if (sortOrder === "ascending") {
      if (sortType === "score") {
        // sort score first then popularity
        recommendations.sort((a, b) => {
          if (a.score === b.score) {
            return a.popularity - b.popularity;
          } else {
            return a.score - b.score;
          }
        });
      } else if (sortType === "popularity") {
        recommendations.sort((a, b) => b.popularity - a.popularity);
      } else if (sortType === "name") {
        recommendations.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      }
    } else {
      if (sortType === "score") {
        // sort score first then popularity
        recommendations.sort((a, b) => {
          if (a.score === b.score) {
            return a.popularity - b.popularity;
          } else {
            return b.score - a.score;
          }
        });
      } else if (sortType === "popularity") {
        recommendations.sort((a, b) => a.popularity - b.popularity);
      } else if (sortType === "name") {
        recommendations.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        });
      }
    }
  };

  return (
    <>
      {isMounted && (
        <AnimeCardList
          key={key}
          recommendations={recommendations}
          onAdd={onAdd}
          onRemove={onRemove}
          isWatchlist={isWatchlist}
        />
      )}
    </>
  );
}
