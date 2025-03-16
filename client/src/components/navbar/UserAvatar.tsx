import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { isValidUrl } from "@/lib/utilities";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import ArrowRightStartOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightStartOnRectangleIcon";

const defaultImage = "/default-user.png";
const iconClasses = "h-5 w-5 mr-2";

export default function UserAvatar({
  userImage,
  size = "md",
}: {
  userImage: string | null | undefined;
  size?: "sm" | "md";
}) {
  const src: string =
    userImage && isValidUrl(userImage) ? userImage : defaultImage;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          size={size}
          className="m-0 transform rounded-full border-2 border-purple-500 shadow-md shadow-gray-600 transition duration-300 hover:scale-105 dark:border-purple-600"
        >
          <Image width={100} height={100} src={src} alt="User Avatar" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User Actions"
        className="text-black dark:text-white"
      >
        <DropdownItem
          key="profile"
          color="default"
          startContent={<UserCircleIcon className={iconClasses} />}
          as={Link}
          href="/user/profile"
        >
          Your Profile
        </DropdownItem>

        <DropdownItem
          key="watchlist"
          color="default"
          startContent={<QueueListIcon className={iconClasses} />}
          as={Link}
          href="/user/watchlist"
        >
          Your Watchlist
        </DropdownItem>

        <DropdownItem
          key="logout"
          color="danger"
          startContent={
            <ArrowRightStartOnRectangleIcon className={iconClasses} />
          }
          onPress={async () => {
            await signOut();
            window.location.href = "/";
          }}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
