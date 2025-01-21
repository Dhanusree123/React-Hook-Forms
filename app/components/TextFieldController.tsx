"use client";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  type?: string;
  helperText?: string | undefined;
};

const TextFieldController = (props: Props) => {
  const { label, name, type, helperText } = props;
  const { control, register } = useFormContext();
  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          {...register(name)}
          type={type}
          fullWidth
          margin="normal"
          error={error ? true : false}
          helperText={helperText}
        />
      )}
    />
  );
};

export default TextFieldController;
