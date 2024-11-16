import React from "react";

export default function RecommendationHeader({ anime }: { anime: string }) {
  return (
    <>
      {anime && (
        <h1 className="animation-delay-[2s] m-10 mb-5 animate-flip-down text-center text-xl font-bold text-black animate-duration-1000 dark:text-white sm:text-2xl lg:text-4xl">
          Recommendations for "{anime}"
        </h1>
      )}
    </>
  );
}
