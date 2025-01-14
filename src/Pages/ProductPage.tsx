import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Container,
  Button,
  Rating,
  Card,
  CardContent,
} from '@mui/material';
import { IProduct } from '../Types/product';

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const productData: IProduct[] = JSON.parse(
    localStorage.getItem('Products') ?? ''
  );

  const product = productData.find((item: IProduct) => item.productId === id);

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  const {
    productId,
    description,
    review,
    mrp,
    dealPrize,
    rating,
    category,
    availability,
  } = product;

  return (
    <Container sx={{ padding: 4, marginTop: 4 }}>
      <Button
        onClick={() => {
          navigate('/products');
        }}
      >
        Go Back
      </Button>
      <Card>
        <CardContent>
          <Typography variant='h4'>{productId}</Typography>
          <Typography variant='h4'>{description}</Typography>
          <Typography variant='subtitle1'>Review:{review}</Typography>
          <Typography variant='body1'>MRP: {mrp}</Typography>
          <Typography variant='body1'>Deal Price: {dealPrize}</Typography>
          <Typography variant='body1'>
            Rating:
            <Rating value={rating} />
          </Typography>
          <Typography variant='body1'>Category: {category}</Typography>
          <Typography variant='body1'>Availability: {availability}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductPage;
