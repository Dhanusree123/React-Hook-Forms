import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { IFormData } from "../Types/Product";

const ProductsPage = () => {
  const [products, setProducts] = useState<IFormData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const locationSearch = useCallback(() => {
    const parsed = queryString.parse(location.search);
    if (parsed.search) {
      setSearchQuery(parsed.search as string);
    }
  }, [location.search]);

  useEffect(() => {
    const storedProductData = localStorage.getItem("products");
    if (storedProductData) {
      setProducts(JSON.parse(storedProductData));
    }
  }, []);

  useEffect(() => {
    locationSearch();
  }, [locationSearch]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    navigate(`?search=${e.target.value}`);
  };

  return (
    <Stack>
      <Box>
        <Button variant="contained" onClick={() => navigate("/product/add")}>
          Add Product
        </Button>
      </Box>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h5" gutterBottom>
          Products
        </Typography>
        <Box>
          <TextField
            label="Search Products"
            variant="outlined"
            margin="normal"
            sx={{ width: { xs: 300, sm: 400 } }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        {filteredProducts.map((product) => (
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
  );
};

export default ProductsPage;
