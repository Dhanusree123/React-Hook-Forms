import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Home } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GraphqlScraper } from "../../graphql/GraphqlScraper";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { IProductFormData, productSchema } from "../../type/Schema";
import { zodResolver } from "@hookform/resolvers/zod";

const AddProduct = () => {
  const [productUrl, setProductUrl] = useState("");
  const [asin, setAsin] = useState("");
  const [productData, setProductData] = useState<IProductFormData>();

  const onSubmit = (data: IProductFormData) => {
    console.log(data);
  };

  const defaultValues = useMemo(
    () => ({
      title: productData?.title ?? "",
      description: productData?.description ?? "",
      mrp: productData?.mrp ?? 0,
      listPrice: productData?.listPrice ?? 0,
      dealPrice: productData?.dealPrice ?? 0,
      code: productData?.code ?? "",
      slug: productData?.title ?? "",
      rating: productData?.rating ?? 0,
      reviews: productData?.reviews ?? 0,
    }),
    [productData]
  );

  console.log(defaultValues);

  const fetchProducts = useCallback(async () => {
    if (!asin) return;
    const products = await GraphqlScraper(asin);
    if (products) {
      setProductData(products);
      setProductUrl(asin);
      console.log("products: ", products);
    }
    /*const url = asin;
    const products = await GraphqlScraper(url);
    setProductData(products);
    setProductUrl(asin);
    console.log("products: ", products);*/
  }, [asin]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFetch = () => {
    const asinMatch = productUrl.match(/\/dp\/([A-Za-z0-9]+)/);
    const asin = asinMatch ? asinMatch[1] : "";
    setAsin(`https://amazon.in/dp/${asin}`);
  };

  //const {title, description, mrp, listPrice, dealPrice, code} = productData;

  const methods = useForm<IProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = methods;

  /*const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[\s-]+/g, "-")
      .replace(/(^-+|-+$)/g, "");
  };*/

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            mb: 3,
          }}
        >
          <Breadcrumbs separator="›">
            <Link
              href="#"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
                textDecoration: "none",
              }}
            >
              <Home size={16} style={{ marginRight: 4 }} />
            </Link>
            <Link
              href="/products"
              sx={{ color: "text.secondary", textDecoration: "none" }}
            >
              Products
            </Link>
            <Typography color="text.primary">Add Product</Typography>
          </Breadcrumbs>
        </Box>

        <Paper sx={{ p: 1 }}>
          <Box sx={{ p: 1 }}>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              Product Url
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                placeholder="Enter product URL"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
              />
              <Button variant="contained" onClick={handleFetch}>
                Fetch
              </Button>
            </Stack>
          </Box>
        </Paper>

        <Paper sx={{ marginTop: 3, p: 3 }}>
          <Box sx={{ p: 3 }}>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue={productData?.title}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        {...register("title")}
                        value={field.value}
                        label="Title"
                        error={Boolean(errors.title)}
                        helperText={errors.title && errors.title?.message}
                        sx={{ width: { xs: 300, sm: 400 } }}
                      />
                    )}
                  />
                  <TextField
                    {...register("slug")}
                    label="Slug"
                    type="text"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                  <TextField
                    {...register("description")}
                    label="Description"
                    type="text"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                  <TextField
                    {...register("mrp")}
                    label="MRP"
                    type="number"
                    fullWidth
                    error={!!errors.mrp}
                    helperText={errors.mrp?.message}
                  />
                  <TextField
                    {...register("listPrice")}
                    label="List Price"
                    type="number"
                    fullWidth
                    error={!!errors.listPrice}
                    helperText={errors.listPrice?.message}
                  />
                  <TextField
                    {...register("dealPrice")}
                    label="Deal Price"
                    type="number"
                    fullWidth
                    error={!!errors.dealPrice}
                    helperText={errors.dealPrice?.message}
                  />
                  <TextField
                    {...register("code")}
                    label="Code"
                    type="text"
                    fullWidth
                    error={!!errors.code}
                    helperText={errors.code?.message}
                  />
                  <TextField
                    {...register("rating")}
                    label="Rating"
                    type="number"
                    fullWidth
                    error={!!errors.rating}
                    helperText={errors.rating?.message}
                  />
                  <TextField
                    {...register("reviews")}
                    label="Reviews"
                    type="number"
                    fullWidth
                    error={!!errors.reviews}
                    helperText={errors.reviews?.message}
                  />
                </Stack>
              </form>
            </FormProvider>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddProduct;
