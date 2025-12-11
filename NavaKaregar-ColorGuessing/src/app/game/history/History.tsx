"use client";

import { Box, Typography } from "@mui/material";
import { memo, useMemo } from "react";
import { IGuessHistory } from "@/types/common";
import Hint from "./Hint";
import Item from "./Item";

interface IHistoryProps {
  history: IGuessHistory[];
}

const History = memo(function History({ history }: IHistoryProps) {
  // Create reversed copy without mutating original array
  const reversedHistory = useMemo(
    () => [...history].reverse(),
    [history]
  );

  if (history.length === 0) return null;

  return (
    <Box className="px-4 mb-6">
      <Typography
        variant="subtitle2"
        className="mb-3 text-gray-600 font-semibold"
      >
        Guess History
      </Typography>

      <Box className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {reversedHistory.map((entry, index) => (
          <Item
            key={entry.id}
            entry={entry}
            index={index}
            historyLength={history.length}
          />
        ))}
      </Box>

      <Hint />
    </Box>
  );
});

export default History;
