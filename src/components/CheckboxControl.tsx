import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { useState } from "react";

type CheckBox = {
  options: { value: string; label: string }[];
  onChange: (selectedOptions: string[]) => void;
};

const CheckboxControl = ({ options, onChange }: CheckBox) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    const updatedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <Stack>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          control={
            <Checkbox
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
          }
          label={option.label}
        />
      ))}
    </Stack>
  );
};

export default CheckboxControl;
