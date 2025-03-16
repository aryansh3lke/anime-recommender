import Image from "next/image";
import { Link } from "@heroui/link";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import OpenAuthButtons from "@/components/auth/OpenAuthButtons";

export default async function SignInPage(props: {
  searchParams: Promise<{ error?: string }>;
}) {
  const searchParams = await props.searchParams;

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "OAuthAccountNotLinked":
        return "Email already exists with different provider. Please sign in with the original provider.";
      // Add other error cases as needed
      default:
        return "An error occurred during sign in.";
    }
  };

  return (
    <main className="z-10 flex min-h-screen flex-col items-center justify-center bg-black">
      <Image
        className="rounded-lg"
        src="/anime-recommender-logo.svg"
        alt="Anime Recommender Logo"
        width={75}
        height={75}
      />
      <Card className="m-10 flex max-w-[300px] flex-col items-center justify-center rounded-3xl border-5 border-white bg-gray-700 bg-gradient-to-b from-pink-700 to-purple-700 px-10 py-5 shadow-lg shadow-black">
        <CardHeader className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-center text-3xl font-semibold text-white">
            Sign in to AnimeRecsAI
          </h1>
        </CardHeader>
        <CardBody>
          {searchParams.error && searchParams.error !== "" && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/50 dark:text-red-400">
              {getErrorMessage(searchParams.error)}
            </div>
          )}
          <OpenAuthButtons />
        </CardBody>
        {/* <CardFooter className="flex flex-row flex-wrap items-center justify-center gap-1">
          <p>Don't have an account yet?</p>
          <Link className="text-sky-300" href="/signup" underline="always">
            Sign up!
          </Link>
        </CardFooter> */}
      </Card>
    </main>
  );
}
