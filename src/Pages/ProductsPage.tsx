"use client";

import CheckboxControl from "@/Componenets/CheckboxControl";
import Sorting from "@/Componenets/Sorting";
import useDebounce from "@/Componenets/UseDebounce";
import LocalStorage from "@/store/LocalStorage";
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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams?.toString());

  const [products, setProducts] = useState<IProduct[]>(
    LocalStorage.getState().getProducts() ?? ""
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    params.get("search") || ""
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    params.get("category")?.split(",") || []
  );
  const [sortPrice, setSortPrice] = useState<string>(params.get("sort") || "");

  const router = useRouter();

  const handleDelete = (id: string) => {
    LocalStorage.getState().deleteProduct(id);
    setProducts(LocalStorage.getState().getProducts());
  };

  const debouncedSearch = useDebounce(searchQuery, 500);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (selectedOptions.length === 0 ||
        selectedOptions.includes(product.selectfield))
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
    const value = e.target.value;
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    setSearchQuery(value);
    router.push(`?${params.toString()}`);
  };

  const handleCheckboxChange = (value: string) => {
    const updatedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];
    if (updatedOptions.length) {
      params.set("category", updatedOptions.join(","));
    } else {
      params.delete("category");
    }
    setSelectedOptions(updatedOptions);
    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    setSortPrice(value);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    console.log("Debounced Value:", debouncedSearch);
  }, [debouncedSearch]);

  return (
    <Stack alignItems="center">
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
            onChange={handleCheckboxChange}
            checked={selectedOptions.includes(category.value)}
          />
        ))}
      </Box>
      <Sorting sortPrice={sortPrice} handleSortChange={handleSortChange} />
      {sortedProducts.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
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
                  e.preventDefault();
                  handleDelete(product.id);
                }}
              >
                Delete
              </Button>
            </Stack>
          </Card>
        </Link>
      ))}
    </Stack>
  );
};

export default ProductsPage;
