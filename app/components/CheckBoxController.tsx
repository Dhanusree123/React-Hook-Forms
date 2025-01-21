"use client";
import { Checkbox, FormControlLabel } from "@mui/material";

type CheckBox = {
  onChange: (selected: string) => void;
  label: string;
  value: string;
  checked: boolean;
};

const CheckBoxController = (props: CheckBox) => {
  const { onChange, label, value, checked } = props;

  const handleFilterSite = () => {
    onChange(value);
  };
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleFilterSite} />}
      label={label}
    />
  );
};

export default CheckBoxController;
