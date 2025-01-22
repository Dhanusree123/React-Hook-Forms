"use client";
import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

const TextFieldComponent = () => {
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box sx={{ margin: 5 }}>
      <TextField
        label="Enter Text"
        variant="standard"
        value={text}
        onChange={handleChange}
        fullWidth
      />
    </Box>
  );
};

export default TextFieldComponent;
