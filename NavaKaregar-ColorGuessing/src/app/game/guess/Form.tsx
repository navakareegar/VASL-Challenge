import {
  CheckCircleOutlined,
  CloseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Box } from "@mui/material";
import { type FormEventHandler, memo, useCallback, useMemo } from "react";
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormClearErrors,
} from "react-hook-form";
import CustomButton from "@/components/Button/Button";
import CustomSelect from "@/components/Select/Select";
import { type IFormValues, type TColor } from "@/types/common";
import { fakeArray } from "@/utils/common";
import { COLORS, MAX_COLORS } from "@/utils/constant";

interface IFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  control: Control<IFormValues>;
  watchedColors: TColor[];
  isFinished: boolean;
  randomColors: TColor[];
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
  errors: FieldErrors<IFormValues>;
  clearErrors: UseFormClearErrors<IFormValues>;
}

// Memoized color options to prevent recreation on every render
const colorOptions = [...COLORS] as const;

// Memoized array for form fields
const formFieldIndices = fakeArray(MAX_COLORS);

const Form = (props: IFormProps) => {
  const {
    onSubmit,
    control,
    watchedColors,
    isFinished,
    randomColors,
    isSubmitted,
    setIsSubmitted,
    errors,
    clearErrors,
  } = props;

  const getStatus = useCallback(
    (value: TColor | "", index: number) => {
      if (!isSubmitted || !value) {
        return null;
      }
      if (value === randomColors[index]) {
        return <CheckCircleOutlined style={{ color: "green" }} />;
      } else if (randomColors.includes(value)) {
        return <MinusCircleOutlined style={{ color: "yellow" }} />;
      }
      return <CloseOutlined style={{ color: "red" }} />;
    },
    [isSubmitted, randomColors]
  );

  // Memoize status icons for each color
  const statusIcons = useMemo(
    () => watchedColors.map((color, index) => getStatus(color, index)),
    [watchedColors, getStatus]
  );

  return (
    <Box className="px-4" component="form" onSubmit={onSubmit}>
      <Box className="grid grid-cols-5 gap-2 mb-4">
        {formFieldIndices.map((_, index) => (
          <Box key={index}>
            <Controller
              name={`colors.${index}`}
              control={control}
              rules={{
                required: "Please select a color",
              }}
              render={({ field }) => (
                <CustomSelect
                  options={colorOptions}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value as TColor);
                    setIsSubmitted(false);
                    if (value) {
                      clearErrors(`colors.${index}`);
                    }
                  }}
                  label={`Color ${index + 1}`}
                  labelIcon={statusIcons[index]}
                  error={!!errors.colors?.[index]}
                  helperText={errors.colors?.[index]?.message}
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
};

export default memo(Form);
