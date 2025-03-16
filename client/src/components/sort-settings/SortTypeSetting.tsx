import React, { useEffect, useMemo, useState } from "react";
import { SortOrder, SortType } from "@/lib/types/interfaces";
import { getDefaultSortOrder } from "@/lib/utilities";

import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import StarIcon from "@heroicons/react/24/outline/StarIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import BoldIcon from "@heroicons/react/24/outline/BoldIcon";

type SharedSelection = Set<string>;

const iconClasses = "h-5 w-5";

export default function SortTypeSetting({
  setSortType,
  setSortOrder,
}: {
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}) {
  const [selectedKeys, setSelectedKeys] = useState<SharedSelection>(
    new Set(["score"]),
  );

  let selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  useEffect(() => {
    setSortType(selectedValue as SortType);
    setSortOrder(getDefaultSortOrder(selectedValue as SortType));
  }, [selectedKeys]);

  return (
    <Dropdown className="text-black dark:text-white">
      <DropdownTrigger>
        <Button variant="bordered" className="flex flex-row capitalize">
          {selectedValue === "score" && <StarIcon className={iconClasses} />}
          {selectedValue === "popularity" && (
            <UserGroupIcon className={iconClasses} />
          )}
          {selectedValue === "name" && <BoldIcon className={iconClasses} />}
          <p>Sort By {selectedKeys}</p>
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
          startContent={<UserGroupIcon className={iconClasses} />}
        >
          Popularity
        </DropdownItem>
        <DropdownItem
          key="name"
          startContent={<BoldIcon className={iconClasses} />}
        >
          Name
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
