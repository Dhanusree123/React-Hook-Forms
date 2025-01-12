import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  Stack,
  Grid2,
} from "@mui/material";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  image: string;
  title: string;
  description: string;
  mrp: number;
  ourprice: number;
  rating: number;
  status: "active" | "inactive";
  reviews?: string[];
};

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const product = products.find(
    (product: Product) => product.id === Number(id)
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      {isLoading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <Grid2 size={{ xs: 12, sm: 8, md: 6 }}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={product.image}
              alt={product.title}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                <span style={{ textDecoration: "line-through", color: "red" }}>
                  ₹{product.mrp}
                </span>
                Our Price: ₹{product.ourprice}
              </Typography>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography
                variant="h6"
                sx={{ color: product.status === "active" ? "green" : "red" }}
              >
                Status:{" "}
                {product.status.charAt(0).toUpperCase() +
                  product.status.slice(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.review}
              </Typography>
            </CardContent>
            <Stack alignItems="center" p={2}>
              <Button variant="contained" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Stack>
          </Card>
        </Grid2>
      )}
    </Grid2>
  );
};

export default ProductDetailsPage;
