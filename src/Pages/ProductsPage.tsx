import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IProduct } from "../Types/product";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import queryString from "query-string";

const debounce = (func: any, delay: number) => {
  let timeoutId: any;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const productData = localStorage.getItem("Products") ?? "";

  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter(
      (product) => product.productId !== productId
    );
    setProducts(updatedProducts);
    localStorage.setItem("Products", JSON.stringify(updatedProducts));
  };

  const searchedProducts = products.filter(
    (product) =>
      product.shoppingsite.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedValues.length === 0 || selectedValues.includes(product.category))
  );

  const debouncedHandleSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      setSearchQuery(val);
      console.log(val);
      const filters = selectedValues.join(",");
      navigate(`?search=${val}&filters=${filters}`);
    },
    300
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedHandleSearchChange({
      ...event,
      target: { ...event.target, value },
    });
  };

  const handleProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const updatedValues = event.target.checked
      ? [...selectedValues, value]
      : selectedValues.filter((item) => item !== value);
    setSelectedValues(updatedValues);
    const search = searchQuery;
    navigate(`?search=${search}&filters=${updatedValues.join(",")}`);
  };

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (parsed.search) {
      setSearchQuery(parsed.search as string);
    }
    if (parsed.filters) {
      setSelectedValues((parsed.filters as string).split(","));
    }
  }, [location.search]);

  useEffect(() => {
    if (productData) {
      setProducts(JSON.parse(productData));
    }
  }, [productData]);

  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 2, lg: 1 }} sx={{ mt: 6 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox value="furniture" onChange={handleFilterChange} />
            }
            label="Furniture"
          />
          <FormControlLabel
            control={<Checkbox value="fashion" onChange={handleFilterChange} />}
            label="Fashion"
          />
          <FormControlLabel
            control={
              <Checkbox value="electricals" onChange={handleFilterChange} />
            }
            label="Electricals"
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
                <TableCell align="center">DealPrice</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Availability</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {searchedProducts.map((row) => {
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
