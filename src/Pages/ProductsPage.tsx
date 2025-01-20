"use client";

import CheckboxControl from "@/Componenets/CheckboxControl";
import Sorting from "@/Componenets/Sorting";
import useDebounce from "@/Componenets/UseDebounce";
import { IProduct } from "@/Types/Products";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CATGORIES = [
  {
    label: "Furniture",
    value: "furniture",
  },
  { value: "fashion", label: "Fashion" },
  { value: "electronics", label: "Electronics" },
];

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>(
    JSON.parse(localStorage.getItem("products") ?? "[]")
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortPrice, setSortPrice] = useState<string>("");

  const router = useRouter();

  const handleDelete = (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const debouncedSearch = useDebounce(searchQuery, 500);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.selectfield))
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortPrice === "price-asc") {
      return a.ourprice - b.ourprice;
    } else if (sortPrice === "price-desc") {
      return b.ourprice - a.ourprice;
    } else {
      return (
        products.findIndex((p) => p.id === a.id) -
        products.findIndex((p) => p.id === b.id)
      );
    }
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (selectedOptions: string[]) => {
    setSelectedCategories(selectedOptions);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    setSortPrice(e.target.value);
  };

  useEffect(() => {
    console.log("Debounced Value:", debouncedSearch);
  }, [debouncedSearch]);

  return (
    <Stack>
      <Box>
        <Button variant="contained" onClick={() => router.push("/product/add")}>
          Add product
        </Button>
      </Box>
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
        {CATGORIES.map((category) => (
          <CheckboxControl
            key={category.value}
            label={category.label}
            value={category.value}
            onChange={handleCategoryChange}
            checked={selectedCategories.includes(category.value)}
          />
        ))}
      </Box>
      <Sorting sortPrice={sortPrice} handleSortChange={handleSortChange} />
      {sortedProducts.map((product) => (
        <Card
          key={product.id}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            m: 2,
            width: { xs: "100%", sm: "600px", md: "800px" },
            cursor: "pointer",
          }}
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
  );
};

export default ProductsPage;
