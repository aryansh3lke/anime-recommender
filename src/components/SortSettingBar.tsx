import React, { useEffect, useMemo, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  SharedSelection,
} from "@nextui-org/react";
import StarIcon from "@mui/icons-material/Star";
import GroupsIcon from "@mui/icons-material/Groups";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { SortSetting } from "@/types/interfaces";

export default function SortSettingBar({
  setSortSetting,
}: {
  setSortSetting: React.Dispatch<React.SetStateAction<SortSetting>>;
}) {
  const iconClasses = "h-5 w-5";
  const [selectedKeys, setSelectedKeys] = useState<SharedSelection>(
    new Set(["score"]),
  );

  let selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  useEffect(() => {
    setSortSetting(selectedValue as SortSetting);
  }, [selectedKeys]);

  return (
    <Dropdown className="text-black dark:text-white">
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          Sort By {selectedKeys}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select sort setting for recommendations"
        variant="faded"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys as any}
      >
        <DropdownItem
          key="score"
          startContent={<StarIcon className={iconClasses} />}
        >
          Score
        </DropdownItem>
        <DropdownItem
          key="popularity"
          startContent={<GroupsIcon className={iconClasses} />}
        >
          Popularity
        </DropdownItem>
        <DropdownItem
          key="name"
          startContent={<SortByAlphaIcon className={iconClasses} />}
        >
          Name
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
