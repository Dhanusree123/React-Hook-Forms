import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GraphqlScraper } from "../../graphql/GraphqlScraper";
import { IProductFormData } from "../../type/Schema";
import ProductForm from "./components/product-form";
import BreadCrumbs from "./components/BreadCrumbs";

const AddProduct = () => {
  const [productUrl, setProductUrl] = useState("");
  const [productData, setProductData] = useState<IProductFormData | null>(null);

  const handleFetch = async () => {
    const asinMatch = productUrl.match(/\/dp\/([A-Za-z0-9]+)/);
    const asin = asinMatch ? asinMatch[1] : "";
    const formattedUrl = `https://amazon.in/dp/${asin}`;
    if (!formattedUrl) return;
    const products = await GraphqlScraper(formattedUrl);
    if (products) {
      setProductData(products);
      setProductUrl(formattedUrl);
      console.log("products: ", products);
    }
  };

  console.log("product1:", productData);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="md">
        <BreadCrumbs />

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

        <ProductForm productD={productData} />
      </Container>
    </Box>
  );
};

export default AddProduct;
