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
import { toast } from "sonner";
import { useEffect } from "react";
import { useProductStore } from "../Types/productStore";
const AddProductForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: zodResolver(NewProductSchema),
  });

  const addProduct = useProductStore((state) => state.addProduct);
  const saveProductsToLocalStorage = useProductStore(
    (state) => state.saveProductsToLocalStorage
  );
  const loadProductsFromLocalStorage = useProductStore(
    (state) => state.loadProductsFromLocalStorage
  );

  const onSubmit = (data: IProduct) => {
    const newData = { ...data, productId: crypto.randomUUID() };
    addProduct(newData);
    saveProductsToLocalStorage();
    toast.success("Form submitted successfully");
    navigate("/products");
  };

  useEffect(() => {
    loadProductsFromLocalStorage();
  }, [loadProductsFromLocalStorage]);

  return (
    <Box
      component="form"
      sx={{ maxWidth: 600, mx: "auto", p: 2 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>

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
        name="dealPrice"
        type="number"
        control={control}
        helperText={errors.dealPrice?.message}
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
    </Box>
  );
};

export default AddProductForm;
