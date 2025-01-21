"use client";
import { Paper, Typography, Container, Rating, Card } from "@mui/material";
import { ProductFormData } from "@/app/types/ProductSchema";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [product, setProduct] = useState<ProductFormData | null>(null);

  useEffect(() => {
    if (router.isReady && productId) {
      const storedProducts = JSON.parse(
        localStorage.getItem("products") ?? "[]"
      );
      const foundProduct = storedProducts.find(
        (product: ProductFormData) => product.productId === productId
      );
      setProduct(foundProduct);
    }
  }, [router.isReady, productId]);

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <>
      <Card>
        <Link href="/products">Products</Link>
        <Container component={Paper} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h4">{product.productTitle}</Typography>
          <Typography variant="h4">{product.productDescription}</Typography>
          <Typography variant="subtitle1">Review: {product.reviews}</Typography>
          <Typography variant="body1">MRP: {product.mrp}</Typography>
          <Typography variant="body1">
            Deal Price: {product.dealPrice}
          </Typography>
          <Typography variant="body1">
            Rating:
            <Rating value={product.rating} />
          </Typography>
        </Container>
      </Card>
    </>
  );
};

export default ProductPage;
