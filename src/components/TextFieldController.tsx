/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

type Props = {
  name: string;
  control: any;
  type?: string;
  helperText?: string | undefined;
};

const TextFieldController = (props: Props) => {
  const { control, name, type, helperText } = props;
  return (
    <Controller
      name={name}
      defaultValue=''
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={name}
          type={type}
          fullWidth
          margin='normal'
          error={error ? true : false}
          helperText={helperText}
        />
      )}
    />
  );
};

export default TextFieldController;
