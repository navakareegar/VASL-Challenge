import { IGuessHistory } from "@/types/common";
import { Box, Collapse } from "@mui/material";
import { useEffect, useRef } from "react";
import Status from "./Status";

interface IItemProps {
  entry: IGuessHistory;
  index: number;
  historyLength: number;
}
export default function Item(props: IItemProps) {
  const { entry, index, historyLength } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [historyLength]);

  return (
    <Collapse key={entry.id} in={true} timeout={300} ref={ref}>
      <Box
        className="flex items-center gap-3 p-3 rounded-lg transition-all hover:shadow-md"
        sx={{
          backgroundColor:
            index === historyLength - 1 ? "rgba(59, 130, 246, 0.08)" : "white",
          border:
            index === historyLength - 1
              ? "1px solid rgba(59, 130, 246, 0.3)"
              : "1px solid #e5e7eb",
        }}
      >
        <Box
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          sx={{
            backgroundColor:
              index === historyLength - 1 ? "#3b82f6" : "#6b7280",
            color: "white",
          }}
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
            {entry.guesses.filter((g) => g.status === "correct").length}✓
          </Box>
          <Box
            className="px-2 py-0.5 rounded text-xs font-medium"
            sx={{ backgroundColor: "#fef9c3", color: "#854d0e" }}
          >
            {entry.guesses.filter((g) => g.status === "wrong-position").length}~
          </Box>
        </Box>
      </Box>
    </Collapse>
  );
}
