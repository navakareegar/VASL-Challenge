"use client";
import { useState } from "react";
import { Box, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import clsx from "clsx";
import { CSSProperties } from "styled-components";

type SelectValue = string | number | readonly string[];

interface ICustomSelectProps<T extends SelectValue = string> {
  options: T[];
  onChange: (val: T) => void;
  value?: T;
  label?: string;
  labelIcon?: React.ReactNode;
}

export default function CustomSelect<T extends SelectValue>(
  props: ICustomSelectProps<T>
) {
  const { options, onChange, value, label, labelIcon } = props;
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
      >
        {options.map(
          (option) =>
            option && (
              <MenuItem
                key={String(option)}
                value={option}
                className="flex items-center gap-2"
              >
                <Box
                  className="w-4 h-4 rounded-full"
                  sx={{ backgroundColor: String(option) as CSSProperties }}
                />
                {String(option)}
              </MenuItem>
            )
        )}
      </Select>
    </Box>
  );
}
