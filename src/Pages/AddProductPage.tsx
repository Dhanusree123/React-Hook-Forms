import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IFormData, NewProductSchema } from "../Types/Product";
import AddProductTextField from "../components/AddProductTextField";
import SelectControl from "../components/SelectField";

const AddProductPage = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      image: "",
      title: "",
      description: "",
      mrp: 0,
      ourprice: 0,
      status: "active",
      rating: 0,
      review: "",
    },
  });

  const onSubmit = (data: IFormData) => {
    const newProduct = { ...data, id: crypto.randomUUID() };
    const existingProducts = JSON.parse(
      localStorage.getItem("products") ?? "[]"
    );
    existingProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(existingProducts));
    navigate("/");
  };

  return (
    <Stack alignItems="center">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button variant="contained" onClick={() => navigate("/")}>
          View Products
        </Button>
      </Box>
      <Grid2 size={{ xs: 12 }}>
        <Card sx={{ width: { xs: "100%", sm: "500px" } }}>
          <CardContent>
            <Stack spacing={3} alignItems="center">
              <Typography variant="h5" gutterBottom>
                Add Product
              </Typography>
              <Grid2
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                direction="column"
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <AddProductTextField
                  name="image"
                  label="Image URL"
                  type="text"
                  control={control}
                  errors={errors}
                />
                <AddProductTextField
                  name="title"
                  label="Title"
                  type="text"
                  control={control}
                  errors={errors}
                />
                <AddProductTextField
                  name="description"
                  label="Description"
                  type="text"
                  multiline={true}
                  rows={3}
                  control={control}
                  errors={errors}
                />
                <AddProductTextField
                  name="mrp"
                  label="MRP"
                  type="number"
                  control={control}
                  errors={errors}
                />
                <AddProductTextField
                  name="ourprice"
                  label="Our Price"
                  type="number"
                  control={control}
                  errors={errors}
                />
                <SelectControl
                  control={control}
                  name="selectfield"
                  label="Category"
                  options={[
                    { value: "furniture", label: "Furniture" },
                    { value: "fashion", label: "Fashion" },
                    { value: "electronics", label: "Electronics" },
                  ]}
                  errors={errors}
                />
                <AddProductTextField
                  name="rating"
                  label="Rating"
                  type="number"
                  control={control}
                  errors={errors}
                />
                <AddProductTextField
                  name="review"
                  label="Review"
                  type="text"
                  multiline={true}
                  rows={3}
                  control={control}
                  errors={errors}
                />
                <Grid2 container justifyContent="flex-start">
                  <FormControl
                    component="fieldset"
                    error={Boolean(errors.status)}
                  >
                    <FormLabel>Status</FormLabel>
                    <Controller
                      name="status"
                      control={control}
                      defaultValue="active"
                      render={({ field }) => (
                        <RadioGroup row {...field}>
                          <FormControlLabel
                            value="active"
                            control={<Radio />}
                            label="Active"
                          />
                          <FormControlLabel
                            value="inactive"
                            control={<Radio />}
                            label="Inactive"
                          />
                        </RadioGroup>
                      )}
                    />
                    {errors.status && (
                      <Box color="error.main" mt={1}>
                        {errors.status.message}
                      </Box>
                    )}
                  </FormControl>
                </Grid2>
                <Grid2>
                  <Button type="submit" variant="contained">
                    Add
                  </Button>
                </Grid2>
              </Grid2>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>
    </Stack>
  );
};

export default AddProductPage;
