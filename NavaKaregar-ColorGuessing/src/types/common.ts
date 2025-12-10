import { type COLORS } from "@/utils/constant";

export type TColor = (typeof COLORS)[number];

export type TGuessStatus = "correct" | "wrong-position" | "wrong";

export interface IGuessResult {
  color: TColor;
  status: TGuessStatus;
}

export interface IGuessHistory {
  id: string;
  guesses: IGuessResult[];
  timestamp: Date;
}

export interface IFormValues {
  colors: (TColor | "")[];
}
