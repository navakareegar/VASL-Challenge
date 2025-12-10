"use client";

import { Box } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  type IFormValues,
  type IGuessHistory,
  type IGuessResult,
  type TColor,
  type TGuessStatus,
} from "@/types/common";
import { generateRandomColors } from "@/utils/common";
import { MAX_GUESSES } from "@/utils/constant";

import Form from "./guess/Form";
import History from "./history/History";
import Statusbar from "./guess/Statusbar";
import ResultMessage from "./guess/ResultMessage";
import { v4 as uuidv4 } from "uuid";

export default function GamePage() {
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      colors: ["", "", "", ""],
    },
    mode: "onChange",
  });

  const watchedColors = useWatch({ control, name: "colors" });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [randomColors, setRandomColors] = useState<TColor[]>(
    generateRandomColors()
  );
  const [guessHistory, setGuessHistory] = useState<IGuessHistory[]>([]);
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
    setGuessHistory([]);
    reset({ colors: ["", "", "", ""] });
  }, [reset]);

  const getGuessStatus = (color: TColor, index: number): TGuessStatus => {
    if (color === randomColors[index]) {
      return "correct";
    } else if (randomColors.includes(color)) {
      return "wrong-position";
    }
    return "wrong";
  };

  const onSubmit = (data: IFormValues) => {
    if (isGameOver || isWinner) {
      return;
    }

    // Build guess results for history
    const guessResults: IGuessResult[] = data.colors
      .filter((color): color is TColor => color !== "")
      .map((color, index) => ({
        color,
        status: getGuessStatus(color, index),
      }));

    // Add to history (newest first)
    const newHistoryEntry: IGuessHistory = {
      id: uuidv4(),
      guesses: guessResults,
      timestamp: new Date(),
    };
    setGuessHistory((prev) => [newHistoryEntry, ...prev]);

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

      <Statusbar
        guessCount={guessCount}
        remainingGuesses={remainingGuesses}
        isGameOver={isGameOver}
      />

      <Form
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watchedColors={watchedColors as TColor[]}
        isFinished={isGameOver || isWinner}
        randomColors={randomColors}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        errors={errors}
        clearErrors={clearErrors}
      />

      <History history={guessHistory} />
    </Box>
  );
}
