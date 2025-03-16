import React, { useEffect, useMemo, useState } from "react";
import { SortOrder } from "@/lib/types/interfaces";

import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import ArrowTrendingUpIcon from "@heroicons/react/24/outline/ArrowTrendingUpIcon";
import ArrowTrendingDownIcon from "@heroicons/react/24/outline/ArrowTrendingDownIcon";

type SharedSelection = Set<string>;

const iconClasses = "h-5 w-5";

export default function SortOrderSetting({
  sortOrder,
  setSortOrder,
}: {
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}) {
  const [selectedKeys, setSelectedKeys] = useState<SharedSelection>(
    new Set(["descending"]),
  );

  let selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  useEffect(() => {
    setSortOrder(selectedValue as SortOrder);
  }, [selectedKeys]);

  useEffect(() => {
    setSelectedKeys(new Set([sortOrder]));
  }, [sortOrder]);

  return (
    <Dropdown className="text-black dark:text-white">
      <DropdownTrigger>
        <Button variant="bordered" className="flex flex-row capitalize">
          {selectedValue === "ascending" ? (
            <ArrowTrendingUpIcon className={iconClasses} />
          ) : (
            <ArrowTrendingDownIcon className={iconClasses} />
          )}
          <p>{selectedKeys}</p>
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
          key="ascending"
          startContent={<ArrowTrendingUpIcon className={iconClasses} />}
        >
          Ascending
        </DropdownItem>
        <DropdownItem
          key="descending"
          startContent={<ArrowTrendingDownIcon className={iconClasses} />}
        >
          Descending
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
