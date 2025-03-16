import { auth, signIn } from "@/auth";
import UserAvatar from "@/components/navbar/UserAvatar";
import { Button } from "@heroui/button";

export default async function UserSection() {
  const session = await auth();

  if (session?.user) {
    return <UserAvatar userImage={session.user.image} />;
  }

  return (
    <Button
      onPress={async () => {
        "use server";
        await signIn();
      }}
      color="secondary"
    >
      Sign In
    </Button>
  );
}
