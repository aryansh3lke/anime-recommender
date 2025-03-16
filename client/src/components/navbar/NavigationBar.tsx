"use client";

import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import ThemeSwitcher from "@/components/navbar/ThemeSwitcher";
import HamburgerButton from "@/components/navbar/HamburgerButton";
import UserAvatar from "@/components/navbar/UserAvatar";
import GithubButton from "@/components/navbar/GithubButton";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <Navbar
      className="mb-5 drop-shadow-xl dark:bg-gray-800 dark:shadow-white"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left-side Items */}
      <NavbarBrand>
        <Link href="/" className="gap-4">
          <Image
            className="rounded-lg shadow-md shadow-gray-600 max-sm:hidden"
            src="/anime-recommender-logo.png"
            alt="Anime Recommender Logo"
            width={40}
            height={40}
          />
          <p className="text-2xl font-bold text-black dark:text-white sm:text-4xl">
            AnimeRecsAI
          </p>
        </Link>
      </NavbarBrand>

      {/* Right-side Items */}
      <NavbarContent justify="end">
        <NavbarItem className="flex flex-row items-center justify-center gap-2 sm:hidden">
          {session?.user ? (
            <UserAvatar userImage={session.user.image} size="sm" />
          ) : (
            <Button onPress={() => signIn()} color="secondary" size="sm">
              Sign In
            </Button>
          )}
          <GithubButton size="sm" />
          <ThemeSwitcher size="sm" />
        </NavbarItem>
        <NavbarItem className="flex flex-row items-center justify-center gap-2 max-sm:hidden">
          {session?.user ? (
            <UserAvatar userImage={session.user.image} size="md" />
          ) : (
            <Button onPress={() => signIn()} color="secondary" size="md">
              Sign In
            </Button>
          )}
          <GithubButton size="md" />
          <ThemeSwitcher size="md" />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
