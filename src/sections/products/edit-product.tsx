/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container } from "@mui/material";
import BreadCrumbs from "./components/BreadCrumbs";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { FindProducts } from "../../graphql/Find/FindProducts";
import ProductForm from "./components/product-form";
import { IProductFormData } from "../../type/Schema";

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState<IProductFormData | null>();

  const fetchProducts = useCallback(async () => {
    const products = await FindProducts(0);
    const product = products.products.find((b: any) => b.id === id);
    if (product) {
      setProductData(product);
    }
  }, [id, setProductData]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="md">
        <BreadCrumbs breadcrumbName="Edit Product" />
        <ProductForm productData={productData} isEdit={true} />
      </Container>
    </Box>
  );
};

export default EditPage;
