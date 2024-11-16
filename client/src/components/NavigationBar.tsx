"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      className="mb-5 drop-shadow-xl dark:bg-gray-800 dark:shadow-white"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left-side Items */}
      <NavbarBrand className="gap-4">
        <Image
          className="rounded-lg max-sm:hidden"
          src="/anime-recommender-logo.png"
          alt="Anime Recommender Logo"
          width={40}
          height={40}
        />
        <p className="text-2xl font-bold text-black dark:text-white sm:text-4xl">
          AnimeRecsAI
        </p>
      </NavbarBrand>

      {/* Center Navigation Items */}
      {/* <NavbarContent className="hidden lg:flex gap-5" justify="center">
        <NavbarItem>
          <Link color="foreground" href="">MyAnimeList</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="">KNN</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="">SVD</Link>
        </NavbarItem>
      </NavbarContent> */}

      {/* Right-side Items */}
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="/login" className="text-blue-500 dark:text-cyan-300">Login</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button className="bg-blue-500 dark:bg-cyan-400"><Link href="/signup" className="text-white">Sign up</Link></Button>
        </NavbarItem> */}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        {/* Hamburger Menu Toggle for Smaller Devices */}
        {/* <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-black dark:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-12 w-12" />
          ) : (
            <Bars3Icon className="h-16 w-16" />
          )}
        </Button> */}
      </NavbarContent>

      {/* Hamburger Menu
      <NavbarMenu className="dark:bg-gray-800">
        {menuItems.map((menuItem, index) => (
          <NavbarMenuItem key={index}>
            <Link
              href={menuItem.href}
              className={`w-full ${menuItem.className || 'text-black dark:text-white'}`}
              size="lg"
            >
              {menuItem.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}
    </Navbar>
  );
}
