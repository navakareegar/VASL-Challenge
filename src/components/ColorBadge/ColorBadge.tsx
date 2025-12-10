import { Box } from "@mui/material";
import React from "react";
import { type TColor } from "@/types/common";

interface IColorBadgeProps {
  color: TColor;
}
export default function ColorBadge(props: IColorBadgeProps) {
  const { color } = props;
  return (
    <Box
      className="w-4 h-4 rounded-full"
      sx={{ backgroundColor: String(color) }}
    />
  );
}
