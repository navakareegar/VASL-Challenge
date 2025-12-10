"use client";

import { Box, Typography } from "@mui/material";
import { IGuessHistory } from "@/types/common";
import Hint from "./Hint";
import Item from "./Item";

interface IHistoryProps {
  history: IGuessHistory[];
}

export default function History({ history }: IHistoryProps) {
  if (history.length === 0) return;

  return (
    <Box className="px-4 mb-6">
      <Typography
        variant="subtitle2"
        className="mb-3 text-gray-600 font-semibold"
      >
        Guess History
      </Typography>

      <Box className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {history?.reverse()?.map((entry, index) => (
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
}
