"use client";
import { useState } from "react";
import { Anime } from "@/lib/types/interfaces";

import { Button } from "@heroui/button";
import AnimeCard from "@/components/recommendations/AnimeCard";

export default function AnimeCardList({
  recommendations,
  onAdd,
  onRemove,
  isWatchlist = false,
}: {
  recommendations: Anime[];
  onAdd?: (anime: Anime) => Promise<void>;
  onRemove?: (anime: Anime) => Promise<void>;
  isWatchlist?: boolean;
}) {
  const gridLayoutClasses =
    "mb-12 mt-8 grid grid-cols-1 gap-8 max-sm:max-w-[300px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4";
  const [loading, setLoading] = useState<boolean>(recommendations.length > 12);
  const [limit, setLimit] = useState<number>(12);
  const [removingAnime, setRemovingAnime] = useState<string | null>(null);

  const handleLoadMore = () => {
    if (limit < recommendations.length) {
      setLimit(limit + 12);
    } else {
      setLoading(false);
    }
  };

  const handleRemove = async (anime: Anime) => {
    if (onRemove) {
      setRemovingAnime(anime.name);
      // Wait for animation
      setTimeout(() => {
        onRemove(anime);
      }, 300);
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
            <AnimeCard
              anime={recommendation}
              onAdd={onAdd}
              onRemove={handleRemove}
              isRemoving={removingAnime === recommendation.name}
              isWatchlist={isWatchlist}
            />
          </div>
        ))}
      </div>

      {loading && (
        <Button
          color="secondary"
          size="lg"
          onPress={handleLoadMore}
          className="bottom-20 transform text-xl shadow-xl shadow-black transition duration-300 hover:scale-105"
        >
          Load More
        </Button>
      )}
    </div>
  );
}
