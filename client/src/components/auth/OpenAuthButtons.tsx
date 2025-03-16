import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/auth";
import { AuthError } from "next-auth";
import { NEXT_PUBLIC_DOMAIN, SIGNIN_ERROR_URL } from "@/lib/constants";

import Image from "next/image";
import { Button } from "@heroui/button";

export default function OpenAuthButtons() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 max-lg:flex-col">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: NEXT_PUBLIC_DOMAIN,
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <Button
            type="submit"
            className="flex flex-row gap-3 rounded-md bg-white px-6 py-6"
          >
            <Image
              src={`/icons/${provider.name.toLowerCase()}.svg`}
              alt={provider.name}
              width="25"
              height="25"
            />
            <span className="text-black dark:text-black">
              Continue with {provider.name}
            </span>
          </Button>
        </form>
      ))}
    </div>
  );
}
