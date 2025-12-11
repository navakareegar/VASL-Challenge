"use client";
import { memo, useCallback, useState } from "react";
import { Box, FormHelperText, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import SelectItem from "./SelectItem";

interface ICustomSelectProps<T = string> {
  options: readonly T[] | T[];
  onChange: (val: T) => void;
  value?: T;
  label?: string;
  labelIcon?: React.ReactNode;
  error?: boolean;
  helperText?: string;
}

const CustomSelect = memo(function CustomSelect<T>(
  props: ICustomSelectProps<T>
) {
  const { options, onChange, value, label, labelIcon, error, helperText } =
    props;
  const [open, setOpen] = useState(false);

  const handleChange = useCallback(
    (event: SelectChangeEvent<T>) => {
      onChange(event.target.value as T);
    },
    [onChange]
  );

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const renderValue = useCallback(
    (selected: T) => <SelectItem item={selected} />,
    []
  );

  return (
    <Box>
      <Box className="flex items-center justify-between">
        <InputLabel
          id="demo-simple-select-helper-label"
          className="cursor-pointer"
          error={error}
          onClick={handleOpen}
        >
          {label ?? "Select"}
        </InputLabel>
        {labelIcon}
      </Box>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value ?? ("" as T)}
        onChange={handleChange}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        className="inline-block w-full"
        error={error}
        renderValue={renderValue}
      >
        {options.map(
          (option) =>
            option && (
              <MenuItem
                key={String(option)}
                value={String(option)}
                className="flex items-center gap-2"
              >
                <SelectItem item={option} />
              </MenuItem>
            )
        )}
      </Select>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </Box>
  );
}) as <T>(props: ICustomSelectProps<T>) => React.ReactElement;

export default CustomSelect;
