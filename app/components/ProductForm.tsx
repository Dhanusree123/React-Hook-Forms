"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NewProductSchema, ProductFormData } from "../types/ProductSchema";
import TextFieldController from "./TextFieldController";

const ProductForm = () => {
  const methods = useForm<ProductFormData>({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
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
        <FormProvider {...methods}>
          <Grid
            sx={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 5 }}
            container
            component="form"
            direction="column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextFieldController
              label="Product Title"
              name="productTitle"
              helperText={errors.productTitle?.message}
            />
            <TextFieldController
              label="Product Description"
              name="productDescription"
              helperText={errors.productDescription?.message}
            />

            <TextFieldController
              label="Reviews"
              name="reviews"
              type="number"
              helperText={errors.reviews?.message}
            />

            <TextFieldController
              label="MRP"
              name="mrp"
              type="number"
              helperText={errors.mrp?.message}
            />

            <TextFieldController
              label="Deal price"
              name="dealPrice"
              type="number"
              helperText={errors.dealPrice?.message}
            />

            <TextFieldController
              label="Rating"
              name="rating"
              type="number"
              helperText={errors.rating?.message}
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
        </FormProvider>
      </Card>
    </>
  );
};

export default ProductForm;
