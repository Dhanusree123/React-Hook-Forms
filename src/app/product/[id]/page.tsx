/*import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ProductId from "./productId";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = ProductId({ id });

  if (!product) {
    return (
      <Typography variant="h6" color="error">
        Product not found
      </Typography>
    );
  }
  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
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
              <Typography
                variant="body1"
                sx={{ textDecoration: "line-through", color: "red" }}
                component="span"
              >
                ₹{product.mrp}
              </Typography>
              Our Price: ₹{product.ourprice}
            </Typography>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography
              variant="h6"
              sx={{ color: product.status === "active" ? "green" : "red" }}
            >
              Status:{" "}
              {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.review}
            </Typography>
          </CardContent>
          <Stack alignItems="center" p={2}>
            <Button variant="contained">Back</Button>
          </Stack>
        </Card>
      </Grid2>
    </Grid2>
  );
}
*/
