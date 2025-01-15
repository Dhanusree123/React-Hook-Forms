import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IProduct, NewProductSchema } from "../Types/product";
import TextFieldController from "../components/TextFieldController";

const AddProductForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      shoppingsite: "",
    },
  });

  const productData = localStorage.getItem("Products");
  console.log(productData);
  const parsedProducts: IProduct[] = productData
    ? JSON.parse(productData ?? "")
    : [];
  const onSubmit = (data: IProduct) => {
    console.log(data);
    const newData = { ...data, productId: crypto.randomUUID() };
    localStorage.setItem(
      "Products",
      JSON.stringify([...parsedProducts, newData])
    );
    console.log(newData);
    navigate("/products");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextFieldController
          name="description"
          control={control}
          helperText={errors.description?.message}
        />
        <TextFieldController
          name="review"
          control={control}
          helperText={errors.review?.message}
        />
        <TextFieldController
          name="mrp"
          type="number"
          control={control}
          helperText={errors.mrp?.message}
        />
        <TextFieldController
          name="dealPrize"
          type="number"
          control={control}
          helperText={errors.dealPrize?.message}
        />
        <TextFieldController
          name="rating"
          type="number"
          control={control}
          helperText={errors.rating?.message}
        />

        <TextFieldController
          name="shoppingsite"
          type="string"
          control={control}
          helperText={errors.shoppingsite?.message}
        />

        <Controller
          name="category"
          defaultValue="fashion"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" error={!!errors.category}>
              <FormLabel>Category</FormLabel>
              <Select {...field} label="Category">
                <MenuItem value="furniture">Furniture</MenuItem>
                <MenuItem value="fashion">Fashion</MenuItem>
                <MenuItem value="electricals">Electricals</MenuItem>
              </Select>
              {errors.category && (
                <Typography color="error">{errors.category.message}</Typography>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="availability"
          control={control}
          defaultValue="available"
          render={({ field }) => (
            <FormControl
              component="fieldset"
              margin="normal"
              error={!!errors.availability}
            >
              <FormLabel component="legend">Availability</FormLabel>
              <RadioGroup {...field}>
                <FormControlLabel
                  value="available"
                  control={<Radio />}
                  label="Available"
                />
                <FormControlLabel
                  value="not-available"
                  control={<Radio />}
                  label="Not Available"
                />
              </RadioGroup>
              {errors.availability && (
                <Typography color="error">
                  {errors.availability.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddProductForm;
