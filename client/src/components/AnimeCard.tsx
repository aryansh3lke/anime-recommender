"use client";

import React, { useState } from "react";
import { Recommendation } from "../types/interfaces";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
} from "@nextui-org/react";
import CardButtons from "./CardButtons";

export default function AnimeCard({
  recommendation,
  delay,
}: {
  recommendation: Recommendation;
  delay: number;
}) {
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
    <div className="animation-delay-[${delay}ms] animate-flip-down animate-once">
      <Card
        className={`flex h-full flex-col bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600`}
      >
        <Link
          className="flex flex-col"
          href={recommendation.url}
          target="_blank"
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              width="100%"
              alt={recommendation.name}
              height={300}
              className="w-full rounded-b-none object-cover max-sm:h-full"
              src={recommendation.image}
            />
          </CardBody>
          <CardFooter className="m-flex flex-col px-4">
            <h5 className="mb-2 line-clamp-1 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {recommendation.name}
            </h5>
            <div className="flex flex-row justify-between gap-4">
              <p
                className={`mb-3 font-normal ${getScoreColorClass(recommendation.score)}`}
              >
                Score: {recommendation.score.toFixed(2)}/10
              </p>
              <p className="text-gray-900 dark:text-white">
                Popularity: #{recommendation.popularity}
              </p>
            </div>
            <p className="line-clamp-5 text-sm text-gray-400">
              {recommendation.synopsis.length > 250
                ? recommendation.synopsis.slice(0, 250) + "..."
                : recommendation.synopsis}
            </p>
          </CardFooter>
        </Link>
      </Card>
      {/* <CardButtons animeLink={recommendation.url} /> */}
    </div>
  );
}
