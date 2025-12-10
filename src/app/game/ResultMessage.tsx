import { TrophyOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";

import CustomButton from "@/components/Button/Button";
import { type TColor } from "@/types/common";
import { MAX_GUESSES } from "@/utils/constant";

interface IResultMessageProps {
  isWinner: boolean;
  isGameOver: boolean;
  guessCount: number;
  randomColors: TColor[];
  handlePlayAgain: () => void;
}

export default function ResultMessage(props: IResultMessageProps) {
  const { isWinner, isGameOver, guessCount, randomColors, handlePlayAgain } =
    props;
  return (
    <div className="px-4">
      {isWinner && (
        <Box className="mb-4 p-4 bg-green-100 border border-green-400 rounded-lg text-center">
          <TrophyOutlined style={{ fontSize: 32, color: "#faad14" }} />
          <h2 className="text-xl font-bold text-green-700 mt-2">
            🎉 Congratulations! You Won! 🎉
          </h2>
          <p className="text-green-600 mb-3">
            You guessed all colors correctly in {guessCount}{" "}
            {guessCount === 1 ? "try" : "tries"}!
          </p>
          <CustomButton
            onClick={handlePlayAgain}
            variant="contained"
            color="success"
          >
            Play Again
          </CustomButton>
        </Box>
      )}

      {isGameOver && !isWinner && (
        <Box className="mb-4 p-4 bg-red-100 border border-red-400 rounded-lg text-center">
          <h2 className="text-xl font-bold text-red-700">😔 Game Over!</h2>
          <p className="text-red-600 mb-3">
            You&apos;ve used all {MAX_GUESSES} guesses. The correct colors were:{" "}
            <strong>{randomColors.join(", ")}</strong>
          </p>
          <CustomButton
            onClick={handlePlayAgain}
            variant="contained"
            color="error"
          >
            Try Again
          </CustomButton>
        </Box>
      )}
    </div>
  );
}
