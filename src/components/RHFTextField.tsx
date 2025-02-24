import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
};
const RHFTextField = (props: Props) => {
  const { name, helperText, type = "text" } = props;

  const { control, register } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={field.value}
          type={type}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...register(name)}
        />
      )}
    />
  );
};

export default RHFTextField;
