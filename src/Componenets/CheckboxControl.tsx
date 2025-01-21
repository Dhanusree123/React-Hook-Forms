import { Checkbox, FormControlLabel, Stack } from "@mui/material";

type CheckBox = {
  label: string;
  value: string;
  onChange: (selectedOptions: string) => void;
  checked: boolean;
};

const CheckboxControl = ({ label, value, onChange, checked }: CheckBox) => {
  return (
    <Stack>
      <FormControlLabel
        control={
          <Checkbox
            value={value}
            checked={checked}
            onChange={() => {
              //console.log(value);
              onChange(value);
            }}
          />
        }
        label={label}
      />
    </Stack>
  );
};

export default CheckboxControl;
