"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";

export default function Profile() {
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/signin");
    } else {
      setLoading(false);
    }
  }, [status]);

  return (
    <div className="h-full min-h-[calc(100vh-12rem)]">
      <h1 className="my-5 text-center text-3xl font-bold text-black dark:text-white">
        Your User Profile
      </h1>

      <div className="flex flex-col items-center justify-center px-4">
        {!loading ? (
          session && (
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
              <Image
                src={session.user?.image || "/default-user.png"}
                className="rounded-full border-4 border-blue-500 dark:border-cyan-400"
                alt="profile"
                width={200}
                height={200}
              />
              <div className="flex flex-col items-start justify-center gap-2">
                <p className="text-center text-2xl text-black dark:text-white max-sm:text-lg">
                  <b>Name:</b> {session.user?.name}
                </p>
                <p className="text-center text-2xl text-black dark:text-white max-sm:text-lg">
                  <b>Email:</b> {session.user?.email}
                </p>
              </div>
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
