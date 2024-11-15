import React from "react";
import { Add, LaunchOutlined } from "@mui/icons-material";
import { Button, Link } from "@nextui-org/react";

export default function CardButtons({ animeLink }: { animeLink: string }) {
  const buttonClasses =
    "transition-none rounded-full dark:bg-white shadow-2xl shadow-black";
  const iconClasses = "rounded-full3 text-white transition-none";
  const addColoring = "bg-green-500 dark:bg-lime-500";
  const launchColoring = "bg-blue-600 dark:bg-cyan-500 transition-none";

  return (
    <div className="z-2 absolute right-2 top-2 flex flex-row items-center justify-center gap-2 transition-none">
      <Button isIconOnly className={buttonClasses + " " + addColoring}>
        <Add className={iconClasses + " " + addColoring} />
      </Button>
      <Button isIconOnly className={buttonClasses + " " + launchColoring}>
        <Link href={animeLink} target="_blank" className={launchColoring}>
          <LaunchOutlined className={iconClasses + " " + launchColoring} />
        </Link>
      </Button>
    </div>
  );
}
