import { Controller, useFormContext } from "react-hook-form";

import { TextField, Autocomplete } from "@mui/material";

type Props = {
  name: string;
  options?: string[];
  label: string;
  placeholder?: string;
  helperText?: string;
};

const RhfAutocomplete = (props: Props) => {
  const { control } = useFormContext();
  const {
    name,
    options = [],
    label,
    placeholder = "",
    helperText = "",
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          multiple
          freeSolo
          options={options}
          value={field.value || []}
          onChange={(_event, value) => {
            field.onChange(value);
          }}
          renderInput={(params) => (
            <TextField
              sx={{ textTransform: "capitalize" }}
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error.message : helperText}
            />
          )}
        />
      )}
    />
  );
};

export default RhfAutocomplete;
