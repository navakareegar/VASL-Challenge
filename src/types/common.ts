import { type COLORS } from "@/utils/constant";

export type TColor = (typeof COLORS)[number];

export interface IFormValues {
  colors: (TColor | "")[];
}
