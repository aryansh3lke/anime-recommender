import Recommender from "@/components/recommendations/Recommender";

export default async function Home() {
  return (
    <Recommender
      title="MyAnimeList Recommender"
      description="Receive recommendations directly from MyAnimeList users"
      apiEndpoint="/api/get_myanimelist_recommendations"
    />
  );
}
