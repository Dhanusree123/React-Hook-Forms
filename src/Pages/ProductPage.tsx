import { useNavigate, useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Button,
  Rating,
  Card,
} from "@mui/material";
import { IProduct } from "../Types/product";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams<{ id: string }>();

  const productData: IProduct[] = JSON.parse(
    localStorage.getItem("Products") ?? "[]"
  );

  const sorted = productData.find(
    (sorted: IProduct) => sorted.productId === productId
  );

  if (!sorted) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <>
      <Card>
        <Button
          onClick={() => {
            navigate("/products");
          }}
        >
          Go Back
        </Button>
        <Container component={Paper} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h4">{sorted.description}</Typography>
          <Typography variant="h4">{sorted.shoppingsite}</Typography>
          <Typography variant="subtitle1">Review:{sorted.review}</Typography>
          <Typography variant="body1">MRP: {sorted.mrp}</Typography>
          <Typography variant="body1">
            Deal Price: {sorted.dealPrize}
          </Typography>
          <Typography variant="body1">
            Rating:
            <Rating value={sorted.rating} />
          </Typography>
          <Typography variant="body1">Category: {sorted.category}</Typography>
          <Typography variant="body1">
            Availability: {sorted.availability}
          </Typography>
        </Container>
      </Card>
    </>
  );
};

export default ProductPage;
