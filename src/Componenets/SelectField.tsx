import { Control, Controller, FieldErrors } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { IProduct } from "@/Types/Products";
import { Box } from "@mui/material";

type SelectControlProps = {
  name: keyof IProduct;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  control: Control<IProduct>;
  errors: FieldErrors<IProduct>;
};

const SelectControl = ({
  control,
  name,
  label,
  options,
  errors,
  defaultValue = "",
}: SelectControlProps) => {
  return (
    <>
      <FormControl
        sx={{ width: { xs: 300, sm: 400 } }}
        error={Boolean(errors.status)}
      >
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select
              labelId={`${name}-label`}
              id={name}
              label={label}
              {...field}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.selectfield && (
          <Box color="error.main" mt={1}>
            {errors.selectfield.message}
          </Box>
        )}
      </FormControl>
    </>
  );
};
export default SelectControl;
