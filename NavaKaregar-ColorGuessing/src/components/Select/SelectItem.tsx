import { Box } from "@mui/material";
import ColorBadge from "../ColorBadge/ColorBadge";
import { TColor } from "@/types/common";

interface ISelectItemProps<T = string> {
  item: T;
}
export default function SelectItem<T>(props: ISelectItemProps<T>) {
  const { item } = props;
  return (
    <Box className="flex items-center gap-2">
      <ColorBadge color={item as TColor} />
      {String(item)}
    </Box>
  );
}
