import React, { useEffect, useState } from "react";
import { Recommendation, SortSetting } from "../types/interfaces";
import AnimeCardList from "./AnimeCardList";

export default function RecommendationList({
  recommendations,
  sortSetting,
}: {
  recommendations: Recommendation[];
  sortSetting: SortSetting;
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
  }, [sortSetting]);

  const sortRecommendations = async () => {
    if (sortSetting === "score") {
      // sort score first then popularity
      recommendations.sort((a, b) => {
        if (a.score === b.score) {
          return a.popularity - b.popularity;
        } else {
          return b.score - a.score;
        }
      });
    } else if (sortSetting === "popularity") {
      recommendations.sort((a, b) => a.popularity - b.popularity);
    } else if (sortSetting === "name") {
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
  };

  return (
    <>
      {isMounted && (
        <AnimeCardList key={key} recommendations={recommendations} />
      )}
    </>
  );
}
