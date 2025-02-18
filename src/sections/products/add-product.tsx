import { Box, Container } from "@mui/material";
import ProductForm from "./components/product-form";
import BreadCrumbs from "./components/BreadCrumbs";
import ScraperForm from "./components/ScraperForm";
import { useState } from "react";
import { IProductFormData } from "../../type/Schema";

const AddProduct = () => {
  const [product, setProduct] = useState<IProductFormData | null>(null);

  const handleScraper = (productData: IProductFormData) => {
    setProduct(productData);
    console.log("Add Product:", productData);
  };

  return (
    <Box sx={{ bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="lg">
        <BreadCrumbs breadcrumbName="Add Product" />
        <ScraperForm ProductData={handleScraper} />
        <ProductForm productData={product} isEdit={false} />
      </Container>
    </Box>
  );
};

export default AddProduct;
