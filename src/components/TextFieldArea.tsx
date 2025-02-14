import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IProductFormData, productSchema } from "../type/Schema";
import { TextField } from "@mui/material";

export type ProductProps = {
  name: keyof IProductFormData;
  label: string;
  type: "text" | "number";
  productData?: IProductFormData[];
};

const TextFieldArea = ({ name, label, type }: ProductProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<IProductFormData>({
    resolver: zodResolver(productSchema),
  });
  return (
    <>
      <TextField
        {...register(name)}
        label={label}
        type={type}
        fullWidth
        error={!!errors[name]}
        helperText={errors[name]?.message}
      />
    </>
  );
};

export default TextFieldArea;
