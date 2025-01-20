import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, FormGroup, IconButton, Input } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IProduct } from "../Types/product";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import InputAdornment from "@mui/material/InputAdornment";
import UseDebounce from "../components/UseDebounce";
import CheckBoxController from "../components/CheckBoxController";

const CATEGORIES = [
  {
    label: "Fashion",
    value: "fashion",
  },
  {
    label: "Electricals",
    value: "electricals",
  },
  {
    label: "Furniture",
    value: "furniture",
  },
];

const ProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [products, setProducts] = useState<IProduct[] | []>(
    JSON.parse(localStorage.getItem("products") ?? "") ?? []
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    params.get("search") || ""
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    params.get("category")?.split(",") || []
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

  const debouncedSearchQuery = UseDebounce(searchQuery, 500);

  const filteredProducts = products.filter(
    (product) =>
      product.description
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category))
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
    const params = new URLSearchParams(location.search);
    params.set("sort", newDirection);
    navigate(`?${params.toString()}`);
    setSortDirection(newDirection);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("search", value);
      console.log(params.toString());
    } else {
      params.delete("search");
    }
    setSearchQuery(value);
    navigate(`?${params.toString()}`);
  };

  const handleProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleFilterChange = (selected: string) => {
    const updatedValues = selectedCategories.includes(selected)
      ? selectedCategories.filter((item) => item !== selected)
      : [...selectedCategories, selected];

    const params = new URLSearchParams(location.search);
    if (updatedValues.length) {
      params.set("category", updatedValues.join(","));
    } else {
      params.delete("category");
    }
    setSelectedCategories(updatedValues);
    navigate(`?${params.toString()}`);
  };

  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 2, lg: 1 }} sx={{ mt: 6 }}>
        <FormGroup>
          {CATEGORIES.map((category) => (
            <CheckBoxController
              key={category.value}
              value={category.value}
              onChange={handleFilterChange}
              label={category.label}
              checked={selectedCategories.includes(category.value)}
            />
          ))}
        </FormGroup>
      </Grid>
      <Grid size={{ xs: 12, md: 10, lg: 11 }}>
        <Button onClick={() => navigate("/")}>Add Products</Button>
        <TableContainer>
          <Input
            placeholder="Search by Shopping site"
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
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ProductId</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Shopping Site</TableCell>
                <TableCell align="center">
                  DealPrice
                  <IconButton onClick={handleSort}>
                    <SortIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Availability</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sortedProducts.map((row) => {
                const {
                  productId,
                  category,
                  description,
                  shoppingsite,
                  dealPrice,
                  rating,
                  availability,
                } = row;

                return (
                  <TableRow
                    onClick={() => handleProduct(productId)}
                    key={productId}
                  >
                    <TableCell component="th" scope="row">
                      {productId}
                    </TableCell>
                    <TableCell align="center">{category}</TableCell>
                    <TableCell align="center">{description}</TableCell>
                    <TableCell align="center">{shoppingsite}</TableCell>
                    <TableCell align="center">{dealPrice}</TableCell>
                    <TableCell align="center">{rating}</TableCell>
                    <TableCell align="center">{availability}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(productId);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ProductsPage;
