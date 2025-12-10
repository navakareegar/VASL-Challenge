import { COLORS, MAX_COLORS } from "./constant";

export function getRandomArbitrary(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

export const fakeArray = (length: number): Array<number> =>
  Array.from({ length }, (_, i) => i + 1);

export const generateRandomColors = (numberOfColors: number = MAX_COLORS) =>
  fakeArray(numberOfColors).map(
    () => COLORS[getRandomArbitrary(0, COLORS.length - 1)]
  );
