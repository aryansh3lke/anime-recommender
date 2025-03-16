import Image from "next/image";

export default function MissingRecommendations() {
  return (
    <div className="mb-10 mt-5 flex animate-jump flex-col items-center justify-center">
      <p className="mb-5 mt-10 text-3xl font-bold text-black dark:text-white">
        No recommendations found
      </p>
      <Image
        src={"/missing-recommendations.png"}
        alt="No recommendations found"
        width="300"
        height="300"
      />
    </div>
  );
}
