"use client";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const SliderCom = () => {
  const [sliderValue, setSlidervalue] = useState<number>(30);

  const handleChange = (e: Event, newValue: number | number[]) => {
    setSlidervalue(newValue as number);
    console.log(newValue);
  };

  return (
    <Stack sx={{ margin: 5 }} spacing={2} direction="row">
      <Slider aria-label="slider" value={sliderValue} onChange={handleChange} />
    </Stack>
  );
};

export default SliderCom;
