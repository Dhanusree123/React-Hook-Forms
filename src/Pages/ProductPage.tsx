import { useNavigate, useParams } from "react-router-dom";
import { Paper, Typography, Container, Button, Rating } from "@mui/material";

type Product = {
  productId: string;
  description: string;
  review: string;
  mrp: number;
  dealPrize: number;
  rating: number;
  category: "furniture" | "fashion" | "electricals";
  availability: "available" | "not-available";
};

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ productId: string }>();

  const productData: Product[] = JSON.parse(
    localStorage.getItem("Products") ?? "[]"
  );

  const sorted = productData.find((sorted: Product) => sorted.productId === id);

  if (!sorted) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <>
      <Container component={Paper} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4">{sorted.description}</Typography>
        <Typography variant="subtitle1">Review:{sorted.review}</Typography>
        <Typography variant="body1">MRP: {sorted.mrp}</Typography>
        <Typography variant="body1">Deal Price: {sorted.dealPrize}</Typography>
        <Typography variant="body1">
          Rating:
          <Rating value={sorted.rating} />
        </Typography>
        <Typography variant="body1">Category: {sorted.category}</Typography>
        <Typography variant="body1">
          Availability: {sorted.availability}
        </Typography>
      </Container>
      <Button
        onClick={() => {
          navigate("/products");
        }}
      >
        Go Back
      </Button>
    </>
  );
};

export default ProductPage;
