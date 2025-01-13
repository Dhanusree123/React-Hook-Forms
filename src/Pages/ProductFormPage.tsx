import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
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
import * as z from "zod";
// import { useNavigate } from "react-router-dom";

const schema = z.object({
  productId: z.string().min(1, { message: "Product ID is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  review: z.string().min(1, { message: "Review is required" }),
  mrp: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "MRP should be a positive number" })
  ),
  dealPrize: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Deal Prize should be a positive number" })
  ),
  rating: z.preprocess(
    (val) => Number(val),
    z.number().min(1).max(5, { message: "Rating should be between 1 and 5" })
  ),
  category: z.enum(["furniture", "fashion", "electricals"]),
  availability: z.enum(["available", "not-available"]),
});

type Iproduct = z.infer<typeof schema>;

const AddProductForm = () => {
  // const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Iproduct>({
    resolver: zodResolver(schema),
  });

  const productData = localStorage.getItem("Products");
  const dataP: Iproduct[] = JSON.parse(productData ?? "") ?? [];
  console.log(dataP);
  const onSubmit = (data: Iproduct) => {
    console.log([data]);
    dataP.push(data);
    localStorage.setItem("Products", JSON.stringify(dataP));
    // navigate("/products");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="productId"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Product ID"
              fullWidth
              margin="normal"
              error={!!errors.productId}
              helperText={errors.productId?.message}
            />
          )}
        />
        <Controller
          name="description"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
        <Controller
          name="review"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Review"
              fullWidth
              margin="normal"
              error={!!errors.review}
              helperText={errors.review?.message}
            />
          )}
        />
        <Controller
          name="mrp"
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="MRP"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.mrp}
              helperText={errors.mrp?.message}
            />
          )}
        />
        <Controller
          name="dealPrize"
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Deal Prize"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.dealPrize}
              helperText={errors.dealPrize?.message}
            />
          )}
        />
        <Controller
          name="rating"
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Rating"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.rating}
              helperText={errors.rating?.message}
            />
          )}
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
