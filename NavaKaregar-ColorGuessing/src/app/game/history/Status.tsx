import { IGuessResult, TGuessStatus } from "@/types/common";
import {
  CheckCircleOutlined,
  CloseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Box, Chip } from "@mui/material";
import React, { memo, ReactElement, useMemo } from "react";

// Static config defined outside component to prevent recreation
const statusConfig: Record<
  TGuessStatus,
  { icon: React.ReactNode; borderColor: string }
> = {
  correct: {
    icon: <CheckCircleOutlined style={{ color: "#22c55e", fontSize: 12 }} />,
    borderColor: "#22c55e",
  },
  "wrong-position": {
    icon: <MinusCircleOutlined style={{ color: "#eab308", fontSize: 12 }} />,
    borderColor: "#eab308",
  },
  wrong: {
    icon: <CloseOutlined style={{ color: "#ef4444", fontSize: 12 }} />,
    borderColor: "#ef4444",
  },
};

// Base chip styles - defined outside to prevent recreation
const baseChipSx = {
  borderWidth: 2,
  backgroundColor: "white",
  "& .MuiChip-icon": {
    marginLeft: "8px",
  },
} as const;

interface IStatusProps {
  guess: IGuessResult;
}

const Status = memo(function Status(props: IStatusProps) {
  const { guess } = props;

  const config = statusConfig[guess.status];

  const chipSx = useMemo(
    () => ({
      ...baseChipSx,
      borderColor: config.borderColor,
    }),
    [config.borderColor]
  );

  const colorIndicatorSx = useMemo(
    () => ({ backgroundColor: guess.color }),
    [guess.color]
  );

  const label = useMemo(
    () => (
      <Box className="flex items-center gap-1.5">
        <Box className="w-3 h-3 rounded-full" sx={colorIndicatorSx} />
        <span className="capitalize text-xs">{guess.color}</span>
      </Box>
    ),
    [guess.color, colorIndicatorSx]
  );

  return (
    <Chip
      size="small"
      icon={config.icon as ReactElement}
      label={label}
      sx={chipSx}
      variant="outlined"
    />
  );
});

export default Status;
