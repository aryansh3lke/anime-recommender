import Image from "next/image";
import { Button } from "@heroui/button";

export default function GithubButton({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <Button
      isIconOnly
      as="a"
      href="https://github.com/aryansh3lke/anime-recommender"
      target="_blank"
      rel="noopener noreferrer"
      className={`transform rounded-full border-2 border-red-500 bg-white p-1 shadow-md shadow-gray-600 transition duration-300 hover:scale-105 dark:bg-gray-600`}
      size={size}
    >
      <Image
        src={`/icons/lucide-github.svg`}
        alt="GitHub"
        width="20"
        height="20"
        className="[filter:invert(45%)_sepia(83%)_saturate(2849%)_hue-rotate(335deg)_brightness(98%)_contrast(96%)]"
      />
    </Button>
  );
}
