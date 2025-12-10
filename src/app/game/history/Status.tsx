import { IGuessResult, TGuessStatus } from "@/types/common";
import {
  CheckCircleOutlined,
  CloseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Box, Chip } from "@mui/material";
import React, { ReactElement } from "react";

interface IStatusProps {
  guess: IGuessResult;
}
export default function Status(props: IStatusProps) {
  const { guess } = props;
  return (
    <Chip
      size="small"
      icon={statusConfig[guess.status].icon as ReactElement}
      label={
        <Box className="flex items-center gap-1.5">
          <Box
            className="w-3 h-3 rounded-full"
            sx={{ backgroundColor: guess.color }}
          />
          <span className="capitalize text-xs">{guess.color}</span>
        </Box>
      }
      sx={{
        borderColor: statusConfig[guess.status].borderColor,
        borderWidth: 2,
        backgroundColor: "white",
        "& .MuiChip-icon": {
          marginLeft: "8px",
        },
      }}
      variant="outlined"
    />
  );
}

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
