import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, FormGroup, IconButton, Input } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IProduct } from "../Types/product";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import InputAdornment from "@mui/material/InputAdornment";
import UseDebounce from "../components/UseDebounce";
import CheckBoxController from "../components/CheckBoxController";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const productData = localStorage.getItem("products") ?? "";

  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter(
      (product) => product.productId !== productId
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const debouncedSearchQuery = UseDebounce(searchQuery, 500);

  const handleSort = () => {
    const newDirection = sortDirection === "desc" ? "asc" : "desc";
    setSortDirection(newDirection);
    const sortedProducts = [...products].sort((a, b) => {
      return newDirection === "asc"
        ? a.dealPrice - b.dealPrice
        : b.dealPrice - a.dealPrice;
    });
    setProducts(sortedProducts);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.shoppingsite
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) &&
      (selectedValues.length === 0 || selectedValues.includes(product.category))
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleFilterChange = (selected: string) => {
    const updatedValues = selectedValues.includes(selected)
      ? selectedValues.filter((item) => item !== selected)
      : [...selectedValues, selected];
    setSelectedValues(updatedValues);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("search") || "");
    setSelectedValues(
      (params.get("category") || "").split(",").filter(Boolean)
    );
    setSortDirection((params.get("sort") as "asc" | "desc") || "desc");
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedValues.length > 0)
      params.set("category", selectedValues.join(","));
    if (sortDirection) params.set("sort", sortDirection);
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchQuery, selectedValues, sortDirection, navigate]);

  useEffect(() => {
    if (productData) {
      setProducts(JSON.parse(productData));
    }
  }, [productData]);

  useEffect(() => {
    console.log("debounced", debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 2, lg: 1 }} sx={{ mt: 6 }}>
        <FormGroup>
          <CheckBoxController
            value="furniture"
            onChange={handleFilterChange}
            label="Furniture"
            checked={selectedValues.includes("furniture")}
          />
          <CheckBoxController
            value="fashion"
            onChange={handleFilterChange}
            label="Fashion"
            checked={selectedValues.includes("fashion")}
          />
          <CheckBoxController
            value="electricals"
            onChange={handleFilterChange}
            label="Electricals"
            checked={selectedValues.includes("electricals")}
          />
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
              {filteredProducts.map((row) => {
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
