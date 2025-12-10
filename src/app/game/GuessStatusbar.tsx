import { Box } from "@mui/material";
import clsx from "clsx";
import { MAX_GUESSES } from "@/utils/constant";

interface IGuessStatusbarProps {
  guessCount: number;
  remainingGuesses: number;
  isGameOver: boolean;
}

export default function GuessStatusbar(props: IGuessStatusbarProps) {
  const { guessCount, remainingGuesses, isGameOver } = props;
  return (
    <Box className="mb-4 p-3 bg-gray-100 rounded-lg mx-4">
      <Box className="flex justify-between items-center">
        <span className="font-medium">
          Guesses: {guessCount} / {MAX_GUESSES}
        </span>
        <span
          className={clsx("font-bold", {
            "text-red-500": remainingGuesses <= 3,
            "text-green-600": remainingGuesses > 3,
          })}
        >
          {isGameOver ? "No guesses left!" : `${remainingGuesses} remaining`}
        </span>
      </Box>
    </Box>
  );
}
