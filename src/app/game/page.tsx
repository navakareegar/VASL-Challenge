"use client";

import { Box } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { type IFormValues, type TColor } from "@/types/common";
import {
  fakeArray,
  generateRandomColors,
  getRandomArbitrary,
} from "@/utils/common";
import { COLORS, MAX_GUESSES } from "@/utils/constant";

import GuessForm from "./GuessForm";
import GuessStatusbar from "./GuessStatusbar";
import ResultMessage from "./ResultMessage";

export default function GamePage() {
  const { control, handleSubmit, reset } = useForm<IFormValues>({
    defaultValues: {
      colors: ["", "", "", ""],
    },
  });

  const watchedColors = useWatch({ control, name: "colors" });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [randomColors, setRandomColors] = useState<TColor[]>([]);

  const isGameOver = useMemo(() => guessCount >= MAX_GUESSES, [guessCount]);
  const remainingGuesses = useMemo(
    () => MAX_GUESSES - guessCount,
    [guessCount]
  );

  const handlePlayAgain = useCallback(() => {
    setRandomColors(generateRandomColors());
    setGuessCount(0);
    setIsSubmitted(false);
    setIsWinner(false);
    reset({ colors: ["", "", "", ""] });
  }, [reset]);

  const onSubmit = (data: IFormValues) => {
    if (isGameOver || isWinner) {
      return;
    }
    setGuessCount((prev) => prev + 1);
    setIsSubmitted(true);

    // Check if all colors match
    const allCorrect = data.colors.every(
      (color, index) => color === randomColors[index]
    );
    if (allCorrect) {
      setIsWinner(true);
    }
  };

  return (
    <Box className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Color Guessing Game
      </h1>

      <ResultMessage
        isWinner={isWinner}
        isGameOver={isGameOver}
        guessCount={guessCount}
        randomColors={randomColors}
        handlePlayAgain={handlePlayAgain}
      />

      <GuessStatusbar
        guessCount={guessCount}
        remainingGuesses={remainingGuesses}
        isGameOver={isGameOver}
      />

      <GuessForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watchedColors={watchedColors as TColor[]}
        isFinished={isGameOver || isWinner}
        randomColors={randomColors}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
    </Box>
  );
}
