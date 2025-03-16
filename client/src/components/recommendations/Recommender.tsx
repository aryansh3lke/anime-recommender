"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Anime, SortOrder, SortType } from "@/lib/types/interfaces";
import { FLASK_BACKEND_PROXY } from "@/lib/constants";
import { getDefaultSortOrder } from "@/lib/utilities";

import InputBar from "@/components/recommendations/InputBar";
import RecommendationList from "@/components/recommendations/RecommendationList";
import RecommendationHeader from "@/components/recommendations/RecommendationHeader";
import SortSettingBar from "@/components/sort-settings/SortSettingBar";
import MissingRecommendations from "@/components/recommendations/MissingRecommendations";
import ErrorAlert from "@/components/ErrorAlert";

export default function Recommender({
  title,
  description,
  apiEndpoint,
}: {
  title: string;
  description: string;
  apiEndpoint: string;
}) {
  const [key, setKey] = useState<number>(0);
  const [anime, setAnime] = useState<string>("");
  const [queuedAnime, setQueuedAnime] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>("score");
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    getDefaultSortOrder(sortType),
  );
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const [watchlist, setWatchlist] = useState<Anime[] | null>(null);
  const [recommendations, setRecommendations] = useState<Anime[]>([]);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated") {
      fetch("/api/watchlist/get-watchlist")
        .then((response) => response.json())
        .then((data) => {
          setWatchlist(data);
          if (queuedAnime) {
            fetchRecommendations(queuedAnime);
            setQueuedAnime(null);
          }
        })
        .catch((error) => handleError(error.message));
    } else if (status === "unauthenticated" && queuedAnime) {
      fetchRecommendations(queuedAnime);
      setQueuedAnime(null);
    }
  }, [status]);

  const fetchRecommendations = async (anime_name: string) => {
    fetch(
      FLASK_BACKEND_PROXY +
        `${apiEndpoint}?anime_name=${encodeURIComponent(anime_name)}`,
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

        if (watchlist) {
          setRecommendations(
            body.recommendations.map((recommendation: Anime) => ({
              ...recommendation,
              isAdded: watchlist?.some(
                (anime) => anime.name === recommendation.name,
              ),
            })),
          );
        } else {
          setRecommendations(body.recommendations);
        }
        setAnime(anime_name);
        setKey((prevKey) => prevKey + 1);
      })
      .catch((error) => handleError(error.message));
  };

  const recommendAnimes = async (anime_name: string) => {
    if (!anime_name) {
      handleError("Please select an anime from the dropdown menu");
      return;
    }

    if (status === "loading") {
      setQueuedAnime(anime_name);
      return;
    }

    fetchRecommendations(anime_name);
  };

  const addAnimeToWatchlist = async (anime: Anime) => {
    // Optimistically update UI
    anime.isAdded = true;
    setRecommendations((currentRecs) =>
      currentRecs.map((rec) =>
        rec.name === anime.name ? { ...rec, isAdded: true } : rec,
      ),
    );

    // Make API call
    fetch("/api/watchlist/add-anime", {
      method: "PATCH",
      body: JSON.stringify({ anime }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // Revert on error
          anime.isAdded = false;
          setRecommendations((currentRecs) =>
            currentRecs.map((rec) =>
              rec.name === anime.name ? { ...rec, isAdded: false } : rec,
            ),
          );
          handleError(data.error);
        }
      })
      .catch((error) => {
        // Revert on error
        anime.isAdded = false;
        setRecommendations((currentRecs) =>
          currentRecs.map((rec) =>
            rec.name === anime.name ? { ...rec, isAdded: false } : rec,
          ),
        );
        handleError(error.message);
      });
  };

  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000); // Auto-hide error after 5 seconds
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* Fixed position error alert */}
      {error && (
        <div className="fixed left-1/2 top-20 z-50 w-full max-w-xl -translate-x-1/2 transform">
          <ErrorAlert message={error} />
        </div>
      )}
      <h1 className="mb-5 px-3 text-center text-4xl font-bold text-black dark:text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mb-10 px-3 text-center text-small text-black dark:text-white max-sm:mx-5 sm:text-large md:text-xl lg:text-2xl">
        {description}
      </p>
      <InputBar handleSubmit={recommendAnimes} />

      {anime.length > 0 && (
        <div
          key={key}
          className="flex flex-col items-center justify-center px-4"
        >
          {recommendations.length === 0 ? (
            <MissingRecommendations />
          ) : (
            <>
              <RecommendationHeader anime={anime} />
              <div className="animation-delay-[2s] animate-flip-down">
                <SortSettingBar
                  sortOrder={sortOrder}
                  setSortType={setSortType}
                  setSortOrder={setSortOrder}
                />
              </div>
              <RecommendationList
                key={key}
                recommendations={recommendations}
                sortType={sortType}
                sortOrder={sortOrder}
                onAdd={addAnimeToWatchlist}
                isWatchlist={false}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
