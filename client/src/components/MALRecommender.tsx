"use client";

import React, { useState } from "react";
import { Recommendation, SortSetting } from "../types/interfaces";
import InputBar from "./InputBar";
import RecommendationList from "./RecommendationList";
import RecommendationHeader from "./RecommendationHeader";
import SortSettingBar from "./SortSettingBar";
import NEXT_PUBLIC_FLASK_BACKEND_PROXY_URL from "../proxy";
import MissingRecommendations from "./MissingRecommendations";

export default function MALRecommender() {
  const [key, setKey] = useState<number>(0);
  const [anime, setAnime] = useState<string>("");
  const [sortSetting, setSortSetting] = useState<SortSetting>("score");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  async function recommendMAL(anime_name: string) {
    fetch(
      NEXT_PUBLIC_FLASK_BACKEND_PROXY_URL +
        `/api/get_myanimelist_recommendations?anime_name=${encodeURIComponent(anime_name)}`,
    )
      .then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data })),
      )
      .then(({ status, body }) => {
        if (status !== 200) {
          console.error(body.error);
          throw new Error(body.error);
        }

        setRecommendations(body.recommendations);
        setAnime(anime_name);
        setKey((prevKey) => prevKey + 1);
      })
      .catch((error) => window.alert(error.message));
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="mb-5 text-center text-4xl font-bold text-black dark:text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
        MyAnimeList Recommender
      </h1>
      <p className="mb-10 text-center text-small text-black dark:text-white max-sm:mx-5 sm:text-large md:text-xl lg:text-2xl">
        Receive recommendations directly from MyAnimeList users
      </p>
      <InputBar handleSubmit={recommendMAL} />

      {anime.length > 0 && (
        <div
          key={key}
          className="flex flex-col items-center justify-center px-10"
        >
          {recommendations.length === 0 ? (
            <MissingRecommendations />
          ) : (
            <>
              <RecommendationHeader anime={anime} />
              <div className="animation-delay-[2s] animate-flip-down">
                <SortSettingBar setSortSetting={setSortSetting} />
              </div>
              <RecommendationList
                key={key}
                recommendations={recommendations}
                sortSetting={sortSetting}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
