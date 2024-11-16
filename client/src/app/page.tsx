import NavigationBar from "../components/NavigationBar";
import MALRecommender from "../components/MALRecommender";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800">
        <NavigationBar />
        <main className="flex max-w-7xl flex-col items-center justify-center bg-white dark:bg-gray-800">
          <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-800">
            <MALRecommender />
          </div>
        </main>
      </div>
    </>
  );
}
