import { Button } from "@heroui/button";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

export default function HamburgerButton({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Button
      isIconOnly
      onPress={() => setIsMenuOpen(!isMenuOpen)}
      className="transform rounded-full border-2 border-black bg-white p-1 shadow-md shadow-gray-600 transition duration-300 hover:scale-105 dark:border-white dark:bg-gray-600 sm:hidden"
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMenuOpen ? (
        <XMarkIcon className="h-6 w-6" />
      ) : (
        <Bars3Icon className="h-6 w-6" />
      )}
    </Button>
  );
}
