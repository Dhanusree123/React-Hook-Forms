import { IProduct } from "@/Types/Products";
import { TextField } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";

export type AddProductTextField = {
  name: keyof IProduct;
  label: string;
  type: string;
  multiline?: boolean;
  rows?: number;
  control: Control<IProduct>;
  errors: FieldErrors<IProduct>;
};

const ProductTextField = ({
  name,
  label,
  type,
  multiline,
  rows,
  control,
  errors,
}: AddProductTextField) => {
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

export default ProductTextField;
