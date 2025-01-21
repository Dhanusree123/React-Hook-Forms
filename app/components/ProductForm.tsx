"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NewProductSchema, ProductFormData } from "../types/ProductSchema";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      productTitle: "",
      productDescription: "",
      reviews: 0,
      mrp: 0,
      dealPrice: 0,
      rating: 0,
      shoppingSite: "select a shopping site",
    },
  });

  const router = useRouter();

  const productData = localStorage.getItem("products");
  const parsedProducts: ProductFormData[] = productData
    ? JSON.parse(productData ?? "")
    : [];
  const onSubmit = (data: ProductFormData) => {
    if (data.shoppingSite === "select a shopping site") {
      toast.error("Please select a shoppingsite");
      return;
    }
    try {
      toast.success("Data saved successfully");
      const newData = { ...data, productId: crypto.randomUUID() };
      localStorage.setItem(
        "products",
        JSON.stringify([...parsedProducts, newData])
      );
      router.push("/products");
    } catch {
      toast.error("Check the details you entered is correct or not");
      return;
    }
  };

  return (
    <>
      <Card>
        <Typography variant="h3" textAlign="center">
          Product Form
        </Typography>
        <Grid
          sx={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 5 }}
          container
          component="form"
          direction="column"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Product Title"
            {...register("productTitle")}
            error={!!errors.productTitle}
            helperText={errors.productTitle?.message}
            margin="normal"
          />
          <TextField
            label="Product Description"
            {...register("productDescription")}
            error={!!errors.productDescription}
            helperText={errors.productDescription?.message}
            margin="normal"
          />
          <TextField
            label="Reviews"
            type="number"
            {...register("reviews")}
            error={!!errors.reviews}
            helperText={errors.reviews?.message}
            margin="normal"
          />
          <TextField
            label="MRP"
            {...register("mrp")}
            error={!!errors.mrp}
            helperText={errors.mrp?.message}
            margin="normal"
          />
          <TextField
            label="Deal Price"
            type="number"
            {...register("dealPrice")}
            error={!!errors.dealPrice}
            helperText={errors.dealPrice?.message}
            margin="normal"
          />
          <TextField
            label="Rating"
            type="number"
            {...register("rating")}
            error={!!errors.rating}
            helperText={errors.rating?.message}
            margin="normal"
          />
          <FormControl margin="normal" error={!!errors.shoppingSite}>
            <Select
              {...register("shoppingSite")}
              defaultValue="select a shopping site"
            >
              <MenuItem value="select a shopping site">
                select a shopping site
              </MenuItem>
              <MenuItem value="amazon">Amazon</MenuItem>
              <MenuItem value="flipkart">Flipkart</MenuItem>
              <MenuItem value="shopsy">Shopsy</MenuItem>
              <MenuItem value="meesho">Meesho</MenuItem>
              <MenuItem value="instagram">Instagram</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            ADD
          </Button>
        </Grid>
      </Card>
    </>
  );
};

export default ProductForm;
