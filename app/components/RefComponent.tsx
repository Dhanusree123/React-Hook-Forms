"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";

const RefComponent = () => {
  const [add, setAdd] = useState(0);
  const [sub, setSub] = useState(100);

  const addRef = useRef<HTMLButtonElement>(null);
  const subRef = useRef<HTMLButtonElement>(null);

  const handleAdd = () => {
    setAdd((c) => c + 1);
    if (subRef.current) {
      subRef.current.click();
    }
  };

  const handleSubtract = () => {
    setSub((c) => c - 1);
  };
  return (
    <Box sx={{ p: 30 }}>
      <Button ref={addRef} onClick={handleAdd}>
        Add
      </Button>
      <Box>{add}</Box>
      <Box>{sub}</Box>
      <Button ref={subRef} onClick={handleSubtract}>
        Subtract
      </Button>
    </Box>
  );
};

export default RefComponent;
