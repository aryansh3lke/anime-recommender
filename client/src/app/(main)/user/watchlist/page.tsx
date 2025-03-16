import ProfileNavbar from "@/components/profile/ProfileNavbar";
import Watchlist from "@/components/profile/Watchlist";

export default async function WatchlistPage() {
  return (
    <>
      <ProfileNavbar isWatchlistSelected />
      <Watchlist />
    </>
  );
}
