"use client";

import ProductTextField from "@/Componenets/ProductTextField";
import SelectControl from "@/Componenets/SelectField";
import { IProduct, NewProductSchema } from "@/Types/Products";
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
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import LocalStorage from "@/store/LocalStorage";

type ProductKeys = keyof IProduct;
const AddProductPage = () => {
  const products: Array<{
    name: ProductKeys;
    label: string;
    type: string;
    multiline?: boolean;
    rows?: number;
  }> = [
    { name: "image", label: "Image URL", type: "text" },
    { name: "title", label: "Title", type: "text" },
    {
      name: "description",
      label: "Description",
      type: "text",
      multiline: true,
      rows: 3,
    },
    { name: "mrp", label: "MRP", type: "number" },
    { name: "ourprice", label: "Our Price", type: "number" },
    { name: "rating", label: "Rating", type: "number" },
    { name: "review", label: "Review", type: "text", multiline: true, rows: 3 },
  ];

  const options = [
    { value: "furniture", label: "Furniture" },
    { value: "fashion", label: "Fashion" },
    { value: "electronics", label: "Electronics" },
  ];

  const addProduct = LocalStorage((state) => state.addProduct);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
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

  const onSubmit = (data: IProduct) => {
    const newProduct = { ...data, id: crypto.randomUUID() };
    addProduct(newProduct);
    toast.success("Product added successfully.");
    router.push("/products");
  };

  return (
    <Grid2 container>
      <Toaster position="top-right" richColors />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button variant="contained" onClick={() => router.push("/products")}>
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
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Stack spacing={2}>
                  {products.map((product, i) => (
                    <ProductTextField
                      key={i}
                      name={product.name}
                      label={product.label}
                      type={product.type}
                      multiline={product.multiline}
                      rows={product.rows}
                      control={control}
                      errors={errors}
                    />
                  ))}
                  <SelectControl
                    control={control}
                    name="selectfield"
                    label="Category"
                    options={options}
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
                  <Stack alignItems="center">
                    <Button type="submit" variant="contained">
                      Add
                    </Button>
                  </Stack>
                </Stack>
              </Grid2>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default AddProductPage;
