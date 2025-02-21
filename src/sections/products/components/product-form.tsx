import { Controller, FormProvider, useForm } from "react-hook-form";
import { IProductFormData, productSchema } from "../../../types/Product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Stack, Switch, Typography } from "@mui/material";
import TextFieldArea from "../../../components/TextFieldArea";
import { useEffect, useMemo } from "react";
import { generateSlug } from "./common";
import ProductPreview from "./ProductPreview";

type DefaultProp = {
  productData: IProductFormData | null;
  isEdit: boolean;
  loading?: boolean;
};

const ProductForm = ({ productData, isEdit, loading }: DefaultProp) => {
  const product = productData;

  const defaultValues = useMemo(
    () => ({
      images: product?.images ?? [],
      id: product?.id ?? "",
      title: product?.title ?? "",
      description: product?.description ?? "",
      mrp: product?.mrp ?? 0,
      listPrice: product?.listPrice ?? 0,
      dealPrice: product?.dealPrice ?? 0,
      code: product?.code ?? "",
      slug: product?.slug ?? "",
      rating: product?.rating ?? 0,
      reviews: product?.reviews ?? 0,
      active: true,
    }),
    [product]
  );

  const methods = useForm<IProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
  } = methods;
  console.log("ProductData", product);

  const onSubmit = (data: IProductFormData) => {
    console.log("Submitted", data);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log("value:", value);
    setValue("title", value);
    setValue("slug", generateSlug(value));
  };

  const title = watch("title");
  const mrp = watch("mrp");
  const dealPrice = watch("dealPrice");
  const listPrice = watch("listPrice");
  const images = watch("images");

  useEffect(() => {
    setValue("slug", generateSlug(title));
  }, [title, setValue]);

  useEffect(() => {
    reset({
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  console.log(errors);

  return (
    <>
      <FormProvider {...methods}>
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          direction="row"
          spacing={3}
          marginTop={3}
        >
          <Paper sx={{ marginTop: 3, p: 3, width: 1 / 2 }}>
            <Box>
              <Box>
                <Typography variant="h6">{isEdit ? "Edit" : "Add"}</Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Stack spacing={2}>
                  {isEdit && <TextFieldArea name="id" label="ID" disabled />}
                  <TextFieldArea
                    name="title"
                    label="Title"
                    placeholder="Title"
                    helperText={errors.title && errors.title.message}
                    onChange={handleTitleChange}
                  />

                  <TextFieldArea
                    name="slug"
                    label="Slug"
                    placeholder="slug"
                    helperText={errors.title && errors.title.message}
                    disabled
                  />

                  <TextFieldArea
                    name="description"
                    label="Description"
                    placeholder="Description"
                    multiline
                    rows={4}
                    helperText={
                      errors.description && errors.description.message
                    }
                  />

                  <TextFieldArea
                    name="mrp"
                    label="MRP"
                    placeholder="MRP"
                    helperText={errors.mrp && errors.mrp.message}
                  />

                  <TextFieldArea
                    name="listPrice"
                    label="List Price"
                    placeholder="List Price"
                    helperText={errors.listPrice && errors.listPrice.message}
                  />

                  <TextFieldArea
                    name="dealPrice"
                    placeholder="Deal Price"
                    label="Deal Price"
                  />

                  <TextFieldArea
                    name="code"
                    label="Code"
                    placeholder="Code"
                    helperText={errors.code && errors.code.message}
                  />

                  <TextFieldArea
                    name="rating"
                    label="Rating"
                    placeholder="Rating"
                    helperText={errors.rating && errors.rating.message}
                  />

                  <TextFieldArea
                    name="reviews"
                    label="Reviews"
                    placeholder="Reviews"
                    helperText={errors.reviews && errors.reviews.message}
                  />

                  {isEdit ?? (
                    <Box>
                      <Typography>Active</Typography>
                      <Controller
                        name="active"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            {...field}
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        )}
                      />
                    </Box>
                  )}

                  <Box>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Paper>

          <Box sx={{ width: 1 / 2 }}>
            <ProductPreview
              title={title}
              dealPrice={dealPrice}
              mrp={mrp}
              listPrice={listPrice}
              images={images}
              loading={loading}
            />
          </Box>
        </Stack>
      </FormProvider>
    </>
  );
};

export default ProductForm;
