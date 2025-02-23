import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

export type ProductProps = TextFieldProps;

const RHFNTextField = ({ type = "text", ...other }: ProductProps) => {
  return (
    <>
      <TextField fullWidth type={type} {...other} />
    </>
  );
};

export default RHFNTextField;
