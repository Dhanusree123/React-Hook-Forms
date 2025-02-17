import { FormProvider, useForm } from "react-hook-form";
import { IProductFormData, productSchema } from "../../../type/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Stack } from "@mui/material";
import TextFieldArea from "../../../components/TextFieldArea";
import { useCallback, useEffect, useMemo } from "react";

type DefaultProp = {
  productD: IProductFormData | null;
};

const ProductForm = ({ productD }: DefaultProp) => {
  const product = productD;

  const defaultValues = useMemo(
    () => ({
      title: product?.title ?? "",
      description: product?.description ?? "",
      mrp: product?.mrp ?? 0,
      listPrice: product?.listPrice ?? 0,
      dealPrice: product?.dealPrice ?? 0,
      code: product?.code ?? "",
      slug: product?.slug ?? "",
      rating: product?.rating ?? 0,
      reviews: product?.reviews ?? 0,
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
    setValue,
  } = methods;
  console.log("ProductForm", product);

  const onSubmit = (data: IProductFormData) => {
    console.log("Submitted", data);
  };

  const generateSlug = (value: string) => {
    if (!value) return "";
    return value
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/-+/g, "-")
      .replace(/[^\w\s-]/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\s+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log("value:", value);
    setFormValue("title", value);
    setFormValue("slug", generateSlug(value));
  };

  const setFormValue = useCallback(
    (field: keyof IProductFormData, value: string) => {
      setValue(field, value, { shouldValidate: true });
    },
    [setValue]
  );

  useEffect(() => {
    reset({
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  return (
    <>
      <Paper sx={{ marginTop: 3, p: 3 }}>
        <Box sx={{ p: 3 }}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
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
                />

                <TextFieldArea
                  name="description"
                  label="Description"
                  placeholder="Description"
                  multiline
                  rows={4}
                  helperText={errors.description && errors.description.message}
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

                <Box>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Paper>
    </>
  );
};

export default ProductForm;
