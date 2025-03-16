import { Anime } from "@/lib/types/interfaces";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import AddIcon from "@heroicons/react/24/outline/PlusIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/outline/ArrowTopRightOnSquareIcon";

export default function CardButtons({
  animeLink,
  handleAdd,
  handleRemove,
  isAdded = false,
  isWatchlist = false,
}: {
  animeLink: string;
  handleAdd?: () => void;
  handleRemove?: () => void;
  isAdded?: boolean;
  isWatchlist?: boolean;
}) {
  const buttonClasses =
    "transition-none rounded-xl dark:bg-white shadow-black shadow-xl border-2 border-gray-200 dark:border-gray-700";
  const iconClasses = "h-6 w-6 rounded-full3 text-white transition-none";
  const addColoring = "bg-red-500 dark:bg-red-500";
  const addedColoring = "bg-green-500 dark:bg-lime-500";
  const removeColoring = "bg-red-600 dark:bg-red-600";
  const launchColoring = "bg-blue-600 dark:bg-cyan-500 transition-none";

  return (
    <div className="absolute right-2 top-2 z-10 flex flex-row items-center justify-center gap-2 transition-none">
      {!isWatchlist && handleAdd && (
        <Button
          isIconOnly
          onPress={() => {
            if (!isAdded) {
              handleAdd();
            }
          }}
          className={`${buttonClasses} ${isAdded ? addedColoring : addColoring}`}
        >
          {isAdded ? (
            <CheckIcon className={iconClasses} />
          ) : (
            <AddIcon className={iconClasses} />
          )}
        </Button>
      )}
      {isWatchlist && handleRemove && (
        <Button
          isIconOnly
          onPress={handleRemove}
          className={`${buttonClasses} ${removeColoring}`}
        >
          <TrashIcon className={iconClasses} />
        </Button>
      )}
      <Button isIconOnly className={buttonClasses + " " + launchColoring}>
        <Link href={animeLink} target="_blank">
          <ArrowTopRightOnSquareIcon className={iconClasses} />
        </Link>
      </Button>
    </div>
  );
}
