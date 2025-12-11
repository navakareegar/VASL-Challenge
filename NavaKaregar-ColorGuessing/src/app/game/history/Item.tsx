import { IGuessHistory } from "@/types/common";
import { Box, Collapse } from "@mui/material";
import { memo, useEffect, useMemo, useRef } from "react";
import Status from "./Status";

interface IItemProps {
  entry: IGuessHistory;
  index: number;
  historyLength: number;
}

const Item = (props: IItemProps) => {
  const { entry, index, historyLength } = props;
  const ref = useRef<HTMLDivElement>(null);
  const isLatest = index === historyLength - 1;

  // Only scroll into view for the latest item
  useEffect(() => {
    if (isLatest && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLatest, historyLength]);

  // Memoize computed counts
  const correctCount = useMemo(
    () => entry.guesses.filter((g) => g.status === "correct").length,
    [entry.guesses]
  );

  const wrongPositionCount = useMemo(
    () => entry.guesses.filter((g) => g.status === "wrong-position").length,
    [entry.guesses]
  );

  // Memoize styles based on isLatest
  const containerSx = useMemo(
    () => ({
      backgroundColor: isLatest ? "rgba(59, 130, 246, 0.08)" : "white",
      border: isLatest
        ? "1px solid rgba(59, 130, 246, 0.3)"
        : "1px solid #e5e7eb",
    }),
    [isLatest]
  );

  const indexBadgeSx = useMemo(
    () => ({
      backgroundColor: isLatest ? "#3b82f6" : "#6b7280",
      color: "white",
    }),
    [isLatest]
  );

  return (
    <Collapse in={true} timeout={300} ref={ref}>
      <Box
        className="flex items-center gap-3 p-3 rounded-lg transition-all hover:shadow-md"
        sx={containerSx}
      >
        <Box
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          sx={indexBadgeSx}
        >
          {index + 1}
        </Box>

        <Box className="flex flex-wrap gap-2 flex-1">
          {entry.guesses.map((guess, colorIndex) => (
            <Status key={colorIndex} guess={guess} />
          ))}
        </Box>

        <Box className="flex gap-1">
          <Box
            className="px-2 py-0.5 rounded text-xs font-medium"
            sx={{ backgroundColor: "#dcfce7", color: "#166534" }}
          >
            {correctCount}✓
          </Box>
          <Box
            className="px-2 py-0.5 rounded text-xs font-medium"
            sx={{ backgroundColor: "#fef9c3", color: "#854d0e" }}
          >
            {wrongPositionCount}~
          </Box>
        </Box>
      </Box>
    </Collapse>
  );
};

export default memo(Item);
