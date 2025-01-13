import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../components/AddProductsType";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    const resequencedProducts = updatedProducts.map((product, index) => ({
      ...product,
      id: index + 1,
    }));
    const lastId = resequencedProducts.length;
    localStorage.setItem("lastId", lastId.toString());
    setProducts(resequencedProducts);
    localStorage.setItem("products", JSON.stringify(resequencedProducts));
  };

  useEffect(() => {
    const storedProductData = localStorage.getItem("products");
    if (storedProductData) {
      setProducts(JSON.parse(storedProductData));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Stack>
      {isLoading ? (
        <Typography variant="h6" textAlign="center">
          Loading...
        </Typography>
      ) : (
        <Stack>
          <Box>
            <Button
              variant="contained"
              onClick={() => navigate("/product/add")}
            >
              Add Product
            </Button>
          </Box>
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h5" gutterBottom>
              Products
            </Typography>
            {products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  m: 2,
                  width: { xs: "100%", sm: "600px", md: "800px" },
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", sm: 150 },
                    height: { xs: 150, sm: "auto" },
                    objectFit: "cover",
                  }}
                  image={product.image}
                  alt={product.title}
                />
                <Stack spacing={2} flexGrow={1} justifyContent="center">
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="h6">
                      Our Price: ₹{product.ourprice}
                    </Typography>
                    <Rating value={product.rating} precision={0.5} readOnly />
                  </CardContent>
                </Stack>
                <Stack alignItems="center" justifyContent="center" p={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(product.id);
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default ProductsPage;
