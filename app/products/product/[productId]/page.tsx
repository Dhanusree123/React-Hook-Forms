"use client";
import { Paper, Typography, Container, Rating, Card } from "@mui/material";
import { ProductFormData } from "@/app/types/ProductSchema";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProductPage = () => {
  const { productId } = useParams();
  console.log(productId);

  const storedProducts: ProductFormData[] = JSON.parse(
    localStorage.getItem("products") ?? "[]"
  );

  const product = storedProducts.find(
    (p: ProductFormData) => p.productId === productId
  );

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <>
      <Card>
        <Link href="/products">Products</Link>
        <Container component={Paper} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h4">{product.productTitle}</Typography>
          <Typography variant="h4">{product.productId}</Typography>
          <Typography variant="h4">{product.productDescription}</Typography>
          <Typography variant="h4">{product.shoppingSite}</Typography>
          <Typography variant="subtitle1">Review:{product.reviews}</Typography>
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
