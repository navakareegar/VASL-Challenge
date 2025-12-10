import { Box } from "@mui/material";
import React from "react";
import ColorBadge from "../ColorBadge/ColorBadge";
import { SelectValue } from "./Select";
import { TColor } from "@/types/common";

interface ISelectItemProps<T extends SelectValue = string> {
  item: T;
}
export default function SelectItem<T extends SelectValue>(
  props: ISelectItemProps<T>
) {
  const { item } = props;
  return (
    <Box className="flex items-center gap-2">
      <ColorBadge color={item as TColor} />
      {String(item)}
    </Box>
  );
}
