import { COLORS } from "./constant";

export function getRandomArbitrary(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

export const fakeArray = (length: number): Array<number> =>
  Array.from({ length }, (_, i) => i + 1);

export const generateRandomColors = () =>
  fakeArray(4).map(() => COLORS[getRandomArbitrary(0, COLORS.length - 1)]);
