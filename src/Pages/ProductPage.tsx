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
import { useProductStore } from "../Types/productStore";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams<{ id: string }>();

  const products = useProductStore((state) => state.products);

  // const productData = useProductStore((state) => state.products);

  // console.log(productData);

  const product = products.find(
    (product: IProduct) => product.productId === productId
  );

  if (!product) {
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
          <Typography variant="h4">{product.description}</Typography>
          <Typography variant="h4">{product.shoppingsite}</Typography>
          <Typography variant="subtitle1">Review:{product.review}</Typography>
          <Typography variant="body1">MRP: {product.mrp}</Typography>
          <Typography variant="body1">
            Deal Price: {product.dealPrice}
          </Typography>
          <Typography variant="body1">
            Rating:
            <Rating value={product.rating} />
          </Typography>
          <Typography variant="body1">Category: {product.category}</Typography>
          <Typography variant="body1">
            Availability: {product.availability}
          </Typography>
        </Container>
      </Card>
    </>
  );
};

export default ProductPage;
