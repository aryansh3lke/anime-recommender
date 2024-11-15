"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSwitch = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null; // Render nothing while waiting for the theme to be initialized
  }

  return (
    <div>
      <Button
        isIconOnly
        variant="bordered"
        className={`rounded-full p-1 ${resolvedTheme === "dark" ? "border-orange-400 dark:bg-white" : "border-cyan-400 bg-gray-600"}`}
        onClick={handleThemeSwitch}
        aria-label={
          resolvedTheme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
      >
        {resolvedTheme === "dark" ? (
          <SunIcon className="h-6 w-6 text-orange-300" />
        ) : (
          <MoonIcon className="h-6 w-6 text-cyan-300" />
        )}
      </Button>
    </div>
  );
}
