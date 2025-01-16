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
import { IProduct } from "../Types/Product";
import CheckboxControl from "../components/CheckboxControl";
import UseDebounce from "../components/UseDebounce";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const navigate = useNavigate();

  const location = useLocation();

  const debouncedSearchQuery = UseDebounce(searchQuery, 500);

  const handleDelete = (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.selectfield))
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    navigate(
      `?search=${e.target.value}&categories=${selectedCategories.join(",")}`
    );
  };

  const handleCategoryChange = (selectedOptions: string[]) => {
    setSelectedCategories(selectedOptions);
    navigate(`?search=${searchQuery}&categories=${selectedOptions.join(",")}`);
  };

  const locationSearch = useCallback(() => {
    const parsed = queryString.parse(location.search);
    if (parsed.search) {
      setSearchQuery(parsed.search as string);
    }
    if (parsed.selectfiels) {
      setSelectedCategories(
        typeof parsed.selectfield === "string"
          ? parsed.selectfield.split(",")
          : []
      );
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
        <Box>
          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>
          <CheckboxControl
            options={[
              { value: "furniture", label: "Furniture" },
              { value: "fashion", label: "Fashion" },
              { value: "electronics", label: "Electronics" },
            ]}
            onChange={handleCategoryChange}
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
