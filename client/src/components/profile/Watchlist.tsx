"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Anime, SortOrder, SortType } from "@/lib/types/interfaces";
import { getDefaultSortOrder } from "@/lib/utilities";

import ErrorAlert from "@/components/ErrorAlert";
import { Spinner } from "@heroui/spinner";
import RecommendationList from "@/components/recommendations/RecommendationList";
import SortSettingBar from "@/components/sort-settings/SortSettingBar";

export default function Watchlist() {
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState<number>(0);
  const [sortType, setSortType] = useState<SortType>("score");
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    getDefaultSortOrder(sortType),
  );
  const [watchlist, setWatchlist] = useState<Anime[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await fetch("/api/watchlist/get-watchlist");

        console.log(response.status);

        if (response.status === 401) {
          console.log("redirecting");
          router.push("/signin");
          return;
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setWatchlist(data);
        setLoading(false);
      } catch (error: any) {
        handleError(error.message);
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, []);

  const handleError = (message: string) => {
    setError(message);
    // Auto-hide error after 5 seconds
    setTimeout(() => setError(null), 5000);
  };

  const removeAnimeFromWatchlist = async (anime: Anime) => {
    // Optimistically update UI
    const previousWatchlist = watchlist;
    setWatchlist((currentWatchlist) =>
      currentWatchlist
        ? currentWatchlist.filter((item) => item.name !== anime.name)
        : null,
    );

    // Make API call
    fetch("/api/watchlist/remove-anime", {
      method: "PATCH",
      body: JSON.stringify({ anime }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // Revert on error
          setWatchlist(previousWatchlist);
          handleError(data.error);
        }
      })
      .catch((error) => {
        // Revert on error
        setWatchlist(previousWatchlist);
        handleError(error.message);
      });
  };

  return (
    <div className="h-full min-h-[calc(100vh-12rem)]">
      {error && (
        <div className="fixed left-1/2 top-20 z-50 w-full max-w-xl -translate-x-1/2 transform">
          <ErrorAlert message={error} />
        </div>
      )}
      <h1 className="my-5 text-center text-3xl font-bold text-black dark:text-white">
        Your Anime Watchlist
      </h1>

      <div key={key} className="flex flex-col items-center justify-center px-4">
        {!loading ? (
          watchlist && watchlist.length > 0 ? (
            <>
              <div className="animation-delay-[2s] animate-flip-down">
                <SortSettingBar
                  sortOrder={sortOrder}
                  setSortType={setSortType}
                  setSortOrder={setSortOrder}
                />
              </div>
              <RecommendationList
                key={key}
                recommendations={watchlist}
                sortType={sortType}
                sortOrder={sortOrder}
                onRemove={removeAnimeFromWatchlist}
                isWatchlist={true}
              />
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="my-24 text-center text-2xl text-black dark:text-white">
                Your watchlist is empty
              </p>
            </div>
          )
        ) : (
          <div className="my-24 flex h-full items-center justify-center">
            <Spinner variant="simple" size="lg" />
          </div>
        )}
      </div>
    </div>
  );
}
