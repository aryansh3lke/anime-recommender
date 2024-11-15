import React, { useState } from "react";
import AnimeCard from "./AnimeCard";
import { Recommendation } from "@/types/interfaces";
import { Button } from "@nextui-org/button";
import SkeletonCard from "./SkeletonCard";

export default function AnimeCardList({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  const gridLayoutClasses =
    "mb-12 mt-8 grid grid-cols-1 gap-8 max-sm:max-w-[300px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4";
  const [loading, setLoading] = useState<boolean>(recommendations.length > 12);
  const [limit, setLimit] = useState<number>(12);

  const handleLoadMore = () => {
    if (limit < recommendations.length) {
      setLimit(limit + 12);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={gridLayoutClasses}>
        {recommendations.slice(0, limit).map((recommendation, index) => (
          <div
            key={index}
            className="transform transition duration-300 hover:scale-105"
          >
            <AnimeCard recommendation={recommendation} delay={index * 200} />
          </div>
        ))}
      </div>

      {loading && (
        <>
          <div className={gridLayoutClasses}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <Button
            color="secondary"
            size="lg"
            onClick={handleLoadMore}
            className="bottom-20 text-xl"
          >
            Load More
          </Button>
        </>
      )}
    </div>
  );
}
