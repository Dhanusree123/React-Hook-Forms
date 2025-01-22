"use client";
import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const SelectComponent = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value as string);
    console.log(event.target.value);
  };

  return (
    <Box sx={{ margin: 5 }}>
      <FormControl fullWidth>
        <InputLabel>Options</InputLabel>
        <Select value={selectedValue} label="Options" onChange={handleChange}>
          <MenuItem value={10}>Low</MenuItem>
          <MenuItem value={20}>Medium</MenuItem>
          <MenuItem value={30}>High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
