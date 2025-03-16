import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { SIGNIN_ERROR_URL } from "@/lib/constants";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import PasswordInput from "@/components/auth/PasswordInput";

export default function SignInForm() {
  return (
    <form
      className="flex flex-col gap-2"
      action={async (formData) => {
        "use server";
        try {
          await signIn("credentials", formData);
        } catch (error) {
          if (error instanceof AuthError) {
            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
          }
          throw error;
        }
      }}
    >
      <Input type="username" label="Username" />
      <PasswordInput />
      <Button className="bg-sky-500" type="submit" size="lg">
        Sign in
      </Button>
    </form>
  );
}
