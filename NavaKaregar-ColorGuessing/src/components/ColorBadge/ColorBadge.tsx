import { Box } from "@mui/material";
import { memo, useMemo } from "react";
import { type TColor } from "@/types/common";

interface IColorBadgeProps {
  color: TColor;
}

const ColorBadge = (props: IColorBadgeProps) => {
  const { color } = props;

  const sx = useMemo(() => ({ backgroundColor: String(color) }), [color]);

  return <Box className="w-4 h-4 rounded-full" sx={sx} />;
};

export default memo(ColorBadge);
