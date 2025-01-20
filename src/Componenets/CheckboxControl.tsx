import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { useState } from "react";

type CheckBox = {
  label: string;
  value: string;
  onChange: (selectedOptions: string[]) => void;
  checked: boolean;
};

const CheckboxControl = ({ label, value, onChange, checked }: CheckBox) => {
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
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={() => handleCheckboxChange(value)}
          />
        }
        label={label}
      />
    </Stack>
  );
};

export default CheckboxControl;
