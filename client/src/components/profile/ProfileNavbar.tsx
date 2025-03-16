"use client";

import { Link } from "@heroui/link";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";

export default function ProfileNavbar({
  isProfileSelected = false,
  isWatchlistSelected = false,
  isSettingsSelected = false,
}: {
  isProfileSelected?: boolean;
  isWatchlistSelected?: boolean;
  isSettingsSelected?: boolean;
}) {
  return (
    <div className="h-16 w-full bg-white dark:bg-gray-800">
      <Navbar
        className="h-16 w-full bg-white dark:bg-gray-800"
        position="static"
      >
        <NavbarContent
          className="h-full w-full justify-center gap-8"
          justify="center"
        >
          <NavbarItem
            isActive={isProfileSelected}
            className={`text-blue-500 dark:text-cyan-400 ${
              isProfileSelected
                ? "border-b-2 border-blue-500 dark:border-cyan-400"
                : ""
            }`}
          >
            <Link
              href="/user/profile"
              className={`flex items-center gap-x-2 ${isProfileSelected ? "text-blue-500 dark:text-cyan-400" : "text-black dark:text-white"}`}
              color="foreground"
            >
              <UserCircleIcon className="h-5 w-5" />
              <p>Profile</p>
            </Link>
          </NavbarItem>
          <NavbarItem
            isActive={isWatchlistSelected}
            className={`${
              isWatchlistSelected
                ? "border-b-2 border-blue-500 dark:border-cyan-400"
                : ""
            }`}
          >
            <Link
              href="/user/watchlist"
              className={`flex items-center gap-x-2 ${isWatchlistSelected ? "text-blue-500 dark:text-cyan-400" : "text-black dark:text-white"}`}
              color="foreground"
            >
              <QueueListIcon className="h-5 w-5" />
              <p>Watchlist</p>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
