import {
  CheckCircleOutlined,
  CloseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Box } from "@mui/material";

export default function Hint() {
  return (
    <Box className="flex gap-4 mt-3 pt-3 border-t border-gray-200">
      <Box className="flex items-center gap-1 text-xs text-gray-500">
        <CheckCircleOutlined style={{ color: "#22c55e" }} />
        <span>Correct</span>
      </Box>
      <Box className="flex items-center gap-1 text-xs text-gray-500">
        <MinusCircleOutlined style={{ color: "#eab308" }} />
        <span>Wrong position</span>
      </Box>
      <Box className="flex items-center gap-1 text-xs text-gray-500">
        <CloseOutlined style={{ color: "#ef4444" }} />
        <span>Wrong</span>
      </Box>
    </Box>
  );
}
