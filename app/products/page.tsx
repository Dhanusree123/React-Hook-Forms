"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { ProductFormData } from "../types/ProductSchema";
import Button from "@mui/material/Button";
import { FormGroup, IconButton, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, useSearchParams } from "next/navigation";
import CheckBoxController from "../components/CheckBoxController";
import SortIcon from "@mui/icons-material/Sort";
import useDebounce from "../components/useDebounce";

const SITE = [
  {
    label: "Amazon",
    value: "amazon",
  },
  {
    label: "Flipkart",
    value: "flipkart",
  },
  {
    label: "Shopsy",
    value: "shopsy",
  },
  {
    label: "Meesho",
    value: "meesho",
  },
  {
    label: "Instagram",
    value: "instagram",
  },
];

const ProductTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const [products, setProducts] = useState<ProductFormData[]>(
    JSON.parse(localStorage.getItem("products") ?? "") ?? []
  );

  const [searchQuery, setSearchQuery] = useState<string>(
    params.get("search") || ""
  );

  const [selectedSites, setSelectedSites] = useState<string[]>(
    params.get("shoppingSite")?.split(",") || []
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    (params.get("sort") as "asc" | "desc" | null) || null
  );

  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter(
      (product) => product.productId !== productId
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredProducts = products.filter(
    (product) =>
      product.productDescription
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) &&
      (selectedSites.length === 0 ||
        selectedSites.includes(product.shoppingSite))
  );

  const sortedProducts = sortDirection
    ? [...filteredProducts].sort((a, b) => {
        return sortDirection === "asc"
          ? a.dealPrice - b.dealPrice
          : b.dealPrice - a.dealPrice;
      })
    : filteredProducts;

  const handleSort = () => {
    const newDirection = sortDirection
      ? sortDirection === "desc"
        ? "asc"
        : "desc"
      : "asc";
    params.set("sort", newDirection);
    router.push(`?${params.toString()}`);
    setSortDirection(newDirection);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    setSearchQuery(value);
    router.push(`?${params.toString()}`);
  };

  const handleProduct = (productId: string) => {
    router.push(`/products/product/${productId}`);
  };

  const handleFilterChange = (selected: string) => {
    const updatedValues = selectedSites.includes(selected)
      ? selectedSites.filter((item) => item !== selected)
      : [...selectedSites, selected];

    if (updatedValues.length) {
      params.set("shoppingSite", updatedValues.join(","));
    } else {
      params.delete("shoppingSite");
    }
    setSelectedSites(updatedValues);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    console.log("Clicked", debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <>
      <Grid container>
        <Grid>
          <FormGroup>
            {SITE.map((site) => (
              <CheckBoxController
                key={site.value}
                value={site.value}
                onChange={handleFilterChange}
                label={site.label}
                checked={selectedSites.includes(site.value)}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid>
          <Box>
            <Button>
              <Link href="/">Home</Link>
            </Button>
            <Input
              placeholder="Search"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <TableContainer component={Paper} sx={{ marginTop: 5 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Product Title</TableCell>
                  <TableCell>Product Description</TableCell>
                  <TableCell>Reviews</TableCell>
                  <TableCell>MRP</TableCell>
                  <TableCell>
                    Deal Price
                    <IconButton onClick={handleSort}>
                      <SortIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Shopping Site</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedProducts.map((product, productId) => (
                  <TableRow
                    key={productId}
                    onClick={() => handleProduct(product.productId)}
                  >
                    <TableCell>{product.productId}</TableCell>
                    <TableCell>{product.productTitle}</TableCell>
                    <TableCell>{product.productDescription}</TableCell>
                    <TableCell>{product.reviews}</TableCell>
                    <TableCell>{product.mrp}</TableCell>
                    <TableCell>{product.dealPrice}</TableCell>
                    <TableCell>{product.rating}</TableCell>
                    <TableCell>{product.shoppingSite}</TableCell>
                    <TableCell>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(product.productId);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductTable;
