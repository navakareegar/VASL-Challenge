import {
  CheckCircleOutlined,
  CloseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Box } from "@mui/material";
import { memo } from "react";

// Static icon styles - defined outside component to prevent recreation
const correctIconStyle = { color: "#22c55e" } as const;
const wrongPositionIconStyle = { color: "#eab308" } as const;
const wrongIconStyle = { color: "#ef4444" } as const;

const Hint = memo(function Hint() {
  return (
    <Box className="flex gap-4 mt-3 pt-3 border-t border-gray-200">
      <Box className="flex items-center gap-1 text-xs text-gray-500">
        <CheckCircleOutlined style={correctIconStyle} />
        <span>Correct</span>
      </Box>
      <Box className="flex items-center gap-1 text-xs text-gray-500">
        <MinusCircleOutlined style={wrongPositionIconStyle} />
        <span>Wrong position</span>
      </Box>
      <Box className="flex items-center gap-1 text-xs text-gray-500">
        <CloseOutlined style={wrongIconStyle} />
        <span>Wrong</span>
      </Box>
    </Box>
  );
});

export default Hint;
