import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import SignInForm from "@/components/auth/SignInForm";
import OpenAuthButtons from "@/components/auth/OpenAuthButtons";
import Image from "next/image";

export default async function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <Card className="m-10 flex flex-col items-center justify-center rounded-3xl border-4 border-white bg-gray-700 px-10 py-5">
        <CardHeader className="flex flex-col items-center justify-center gap-4">
          <Image
            className="rounded-lg shadow-md shadow-gray-600"
            src="/anime-recommender-logo.svg"
            alt="Anime Recommender Logo"
            width={100}
            height={100}
          />
          <h1 className="text-center text-3xl font-semibold">
            Sign up for AnimeRecomAI
          </h1>
        </CardHeader>
        <CardBody>
          <SignInForm />
          <div className="my-6 flex w-full flex-row items-center justify-center px-14">
            <Divider />
            <p className="mx-2">Or</p>
            <Divider />
          </div>
          <OpenAuthButtons />
        </CardBody>
        <CardFooter className="flex flex-row items-center justify-center gap-1 max-sm:flex-col">
          <p>Already have an account?</p>
          <Link className="text-cyan-300" href="/signin" underline="always">
            Sign in!
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
