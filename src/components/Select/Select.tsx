"use client";
import { useState } from "react";
import { Box, FormHelperText, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import SelectItem from "./SelectItem";

interface ICustomSelectProps<T = string> {
  options: T[];
  onChange: (val: T) => void;
  value?: T;
  label?: string;
  labelIcon?: React.ReactNode;
  error?: boolean;
  helperText?: string;
}

export default function CustomSelect<T>(props: ICustomSelectProps<T>) {
  const { options, onChange, value, label, labelIcon, error, helperText } =
    props;
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent<T>) => {
    onChange(event.target.value as T);
  };

  return (
    <Box>
      <Box className="flex items-center justify-between">
        <InputLabel
          id="demo-simple-select-helper-label"
          className="cursor-pointer"
          error={error}
          onClick={() => setOpen(true)}
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
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        className="inline-block w-full"
        error={error}
        renderValue={(selected) => {
          return <SelectItem item={selected as T} />;
        }}
      >
        {options.map(
          (option) =>
            option && (
              <MenuItem
                key={String(option)}
                value={String(option)}
                className="flex items-center gap-2"
              >
                <SelectItem item={option as T} />
              </MenuItem>
            )
        )}
      </Select>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </Box>
  );
}
