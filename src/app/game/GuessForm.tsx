import {
  CheckCircleOutlined,
  CloseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Box } from "@mui/material";
import { type FormEventHandler } from "react";
import { type Control, Controller } from "react-hook-form";

import CustomButton from "@/components/Button/Button";
import CustomSelect from "@/components/Select/Select";
import { type IFormValues, type TColor } from "@/types/common";
import { fakeArray } from "@/utils/common";
import { COLORS } from "@/utils/constant";

interface IGuessFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  control: Control<IFormValues>;
  watchedColors: TColor[];
  isFinished: boolean;
  randomColors: TColor[];
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
}

export default function GuessForm(props: IGuessFormProps) {
  const {
    onSubmit,
    control,
    watchedColors,
    isFinished,
    randomColors,
    isSubmitted,
    setIsSubmitted,
  } = props;

  const getStatus = (value: TColor | "", index: number) => {
    if (!isSubmitted || !value) {
      return null;
    }
    if (value === randomColors[index]) {
      return <CheckCircleOutlined style={{ color: "green" }} />;
    } else if (randomColors.includes(value)) {
      return <MinusCircleOutlined style={{ color: "yellow" }} />;
    }
    return <CloseOutlined style={{ color: "red" }} />;
  };

  return (
    <Box className="px-4" component="form" onSubmit={onSubmit}>
      <Box className="grid grid-cols-4 gap-2 mb-4">
        {fakeArray(4).map((_, index) => (
          <Box key={index}>
            <Controller
              name={`colors.${index}`}
              control={control}
              render={({ field }) => (
                <CustomSelect
                  options={[...COLORS]}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value as TColor);
                    setIsSubmitted(false);
                  }}
                  label={`Color ${index + 1}`}
                  labelIcon={getStatus(watchedColors[index], index)}
                />
              )}
            />
          </Box>
        ))}
      </Box>
      <Box className="text-end">
        <CustomButton type="submit" disabled={isFinished}>
          Submit
        </CustomButton>
      </Box>
    </Box>
  );
}
