import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import { IFormData } from "../Types/Product";

type AddProductTextFieldProps = {
  name: keyof IFormData;
  label: string;
  type: "text" | "number" | "radio";
  multiline?: boolean;
  rows?: number;
  control: Control<IFormData>;
  errors: FieldErrors<IFormData>;
};

const AddProductTextField = ({
  name,
  label,
  type,
  multiline,
  rows,
  control,
  errors,
}: AddProductTextFieldProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            multiline={multiline}
            rows={rows}
            error={Boolean(errors[name])}
            helperText={errors[name] ? errors[name]?.message : ""}
            sx={{ width: { xs: 300, sm: 400 } }}
          />
        )}
      />
    </>
  );
};

export default AddProductTextField;
