import { SortType, SortOrder } from "@/lib/types/interfaces";
import SortTypeSetting from "@/components/sort-settings/SortTypeSetting";
import SortOrderSetting from "@/components/sort-settings/SortOrderSetting";

export default function SortSettingBar({
  sortOrder,
  setSortType,
  setSortOrder,
}: {
  sortOrder: SortOrder;
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <SortTypeSetting setSortType={setSortType} setSortOrder={setSortOrder} />
      <SortOrderSetting sortOrder={sortOrder} setSortOrder={setSortOrder} />
    </div>
  );
}
