import { Box } from "@mui/material";
import { memo } from "react";
import ColorBadge from "../ColorBadge/ColorBadge";
import { TColor } from "@/types/common";

interface ISelectItemProps<T = string> {
  item: T;
}

const SelectItem = memo(function SelectItem<T>(props: ISelectItemProps<T>) {
  const { item } = props;
  return (
    <Box className="flex items-center gap-2">
      <ColorBadge color={item as TColor} />
      {String(item)}
    </Box>
  );
}) as <T>(props: ISelectItemProps<T>) => React.ReactElement;

export default SelectItem;
