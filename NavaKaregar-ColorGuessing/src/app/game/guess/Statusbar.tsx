import { Box } from "@mui/material";
import clsx from "clsx";
import { memo, useMemo } from "react";
import { MAX_GUESSES } from "@/utils/constant";

interface IStatusbarProps {
  guessCount: number;
  remainingGuesses: number;
  isGameOver: boolean;
}

const Statusbar = (props: IStatusbarProps) => {
  const { guessCount, remainingGuesses, isGameOver } = props;

  const remainingClassName = useMemo(
    () =>
      clsx("font-bold", {
        "text-red-500": remainingGuesses <= 3,
        "text-green-600": remainingGuesses > 3,
      }),
    [remainingGuesses]
  );

  const remainingText = useMemo(
    () => (isGameOver ? "No guesses left!" : `${remainingGuesses} remaining`),
    [isGameOver, remainingGuesses]
  );

  return (
    <Box className="mb-4 p-3 bg-gray-100 rounded-lg mx-4">
      <Box className="flex justify-between items-center">
        <span className="font-medium">
          Guesses: {guessCount} / {MAX_GUESSES}
        </span>
        <span className={remainingClassName}>{remainingText}</span>
      </Box>
    </Box>
  );
};

export default memo(Statusbar);
