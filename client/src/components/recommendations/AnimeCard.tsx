"use client";

import { Anime } from "@/lib/types/interfaces";

import Image from "next/image";
import { Card, CardBody, CardFooter } from "@heroui/card";
import CardButtons from "@/components/recommendations/CardButtons";

export default function AnimeCard({
  anime,
  onAdd,
  onRemove,
  isRemoving = false,
  isWatchlist = false,
}: {
  anime: Anime;
  onAdd?: (anime: Anime) => Promise<void>;
  onRemove?: (anime: Anime) => Promise<void>;
  isRemoving: boolean;
  isWatchlist?: boolean;
}) {
  // Get appropriate score coloring based on which range it falls in
  const getScoreColorClass = (score: number) => {
    if (score >= 8) {
      return "text-green-500"; // Great score
    } else if (score >= 6) {
      return "text-yellow-500"; // Mediocre score
    } else if (score >= 4) {
      return "text-orange-500"; // Low score
    } else {
      return "text-red-500"; // Terrible score
    }
  };

  return (
    <div
      className={`transform animate-flip-down transition-all duration-300 animate-once ${
        isRemoving
          ? "scale-75 opacity-0"
          : "scale-100 opacity-100 hover:scale-[101%]"
      }`}
    >
      <Card className="flex h-full flex-col bg-white transition-all duration-300 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
        <CardBody className="overflow-visible p-0">
          <CardButtons
            animeLink={anime.url}
            handleAdd={!isWatchlist && onAdd ? () => onAdd(anime) : undefined}
            handleRemove={
              isWatchlist && onRemove ? () => onRemove(anime) : undefined
            }
            isAdded={anime.isAdded}
            isWatchlist={isWatchlist}
          />
          <Image
            width={300}
            height={300}
            alt={anime.name}
            className="aspect-square w-full rounded-b-none object-cover shadow-sm"
            src={anime.image}
            priority={false}
          />
        </CardBody>
        <CardFooter className="m-flex flex-col px-4">
          <h5 className="mb-2 line-clamp-1 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {anime.name}
          </h5>
          <div className="flex flex-row justify-between gap-4">
            <p
              className={`mb-3 font-normal ${getScoreColorClass(anime.score)}`}
            >
              Score: {anime.score.toFixed(2)}/10
            </p>
            <p className="text-gray-900 dark:text-white">
              Popularity: #{anime.popularity}
            </p>
          </div>
          <p className="line-clamp-5 text-sm text-gray-400">
            {anime.synopsis.length > 250
              ? anime.synopsis.slice(0, 250) + "..."
              : anime.synopsis}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
