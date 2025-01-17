import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { useState } from "react";

type CheckBox = {
  onChange: (selected: string) => void;
  label: string;
  value: string;
  checked: boolean;
};

const CheckBoxController = (props: CheckBox) => {
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { onChange, label, value, checked } = props;

  const handleFilterCategory = () => {
    // const updatedValues = selectedCategories.includes(value)
    //   ? selectedCategories.filter((item) => item !== value)
    //   : [...selectedCategories, value];
    // setSelectedCategories(updatedValues);
    onChange(value);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          // checked={selectedCategories.includes(value)}
          checked={checked}
          onChange={handleFilterCategory}
        />
      }
      label={label}
    />
  );
};

export default CheckBoxController;
