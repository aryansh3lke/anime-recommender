"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@heroui/button";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeSwitcher({ size = "md" }: { size?: "sm" | "md" }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <Button
      isIconOnly
      className={`transform rounded-full border-2 p-1 shadow-md shadow-gray-600 transition duration-300 hover:scale-105 ${
        resolvedTheme === "dark"
          ? "border-orange-400 dark:bg-gray-600"
          : "border-cyan-400 bg-white"
      } `}
      size={size}
      onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={
        resolvedTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-6 w-6 text-orange-300 max-sm:h-5 max-sm:w-5" />
      ) : (
        <MoonIcon className="h-6 w-6 text-cyan-300 max-sm:h-5 max-sm:w-5" />
      )}
    </Button>
  );
}
