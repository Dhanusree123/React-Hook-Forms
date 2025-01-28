import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import { IProduct } from "../Types/Product";
import CheckboxControl from "../components/CheckboxControl";
import UseDebounce from "../components/UseDebounce";
import SortBy from "../components/SortBy";
import LocalStorage from "../store/LocalStorage";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const { search, categories, sort } = useParams();

  const debouncedSearchQuery = UseDebounce(searchQuery, 500);

  const handleDelete = (id: string) => {
    LocalStorage.getState().deleteProduct(id);
    setProducts(LocalStorage.getState().getProducts());
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.ourprice - b.ourprice;
    } else if (sortBy === "price-desc") {
      return b.ourprice - a.ourprice;
    } else {
      return (
        products.findIndex((p) => p.id === a.id) -
        products.findIndex((p) => p.id === b.id)
      );
    }
  });

  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.selectfield))
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    let queryString = "";
    if (e.target.value) {
      queryString += `?search=${e.target.value}`;
    }
    if (selectedCategories.length > 0) {
      queryString += `${
        queryString ? "&" : "?"
      }categories=${selectedCategories.join(",")}`;
    }
    if (sortBy) {
      queryString += `${queryString ? "&" : "?"}sort=${sortBy}`;
    }
    navigate(queryString);
  };

  const handleCategoryChange = (selectedOptions: string[]) => {
    setSelectedCategories(selectedOptions);
    let queryString = "";
    if (searchQuery) {
      queryString += `?search=${searchQuery}`;
    }
    if (selectedOptions.length > 0) {
      queryString += `${
        queryString ? "&" : "?"
      }categories=${selectedOptions.join(",")}`;
    }
    if (sortBy) {
      queryString += `${queryString ? "&" : "?"}sort=${sortBy}`;
    }
    navigate(queryString);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    let queryString = "";
    if (searchQuery) {
      queryString += `?search=${searchQuery}`;
    }
    if (selectedCategories.length > 0) {
      queryString += `${
        queryString ? "&" : "?"
      }categories=${selectedCategories.join(",")}`;
    }
    if (event.target.value) {
      queryString += `${queryString ? "&" : "?"}sort=${event.target.value}`;
    }
    navigate(queryString);
  };

  const locationSearch = useCallback(() => {
    const parsed = queryString.parse(
      location.search ||
        `?search=${search || ""}&categories=${categories || ""}&sort=${
          sort || ""
        }`
    );
    if (parsed.search) {
      setSearchQuery(parsed.search as string);
    }
    if (parsed.categories) {
      setSelectedCategories(
        typeof parsed.categories === "string"
          ? parsed.categories.split(",")
          : []
      );
    }
    if (parsed.sort) {
      setSortBy(parsed.sort as string);
    }
  }, [location.search, search, categories, sort]);

  useEffect(() => {
    setProducts(LocalStorage.getState().getProducts());
  }, []);

  useEffect(() => {
    locationSearch();
  }, [locationSearch]);

  useEffect(() => {
    console.log("debouncedSearchQuery:", debouncedSearchQuery);
  }, [debouncedSearchQuery]);

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
        <SortBy sortBy={sortBy} handleSortChange={handleSortChange} />
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
