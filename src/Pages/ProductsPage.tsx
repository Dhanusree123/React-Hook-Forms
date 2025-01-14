import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { IProduct } from "../Types/product";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import queryString from "query-string";

const ProductsPage = () => {
  const productData = localStorage.getItem("Products") ?? "";
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(products);

  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter(
      (product) => product.productId !== productId
    );
    setProducts(updatedProducts);
    localStorage.setItem("Products", JSON.stringify(updatedProducts));
  };

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (parsed.search) {
      setSearchQuery(parsed.search as string);
    }
  }, [location.search]);

  const searchedProducts = searchQuery
    ? products.filter((product) =>
        product.shoppingsite.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    navigate(`?search=${event.target.value}`);
  };

  console.log(searchedProducts);
  const handleProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    if (productData) {
      setProducts(JSON.parse(productData));
    }
  }, [productData]);

  return (
    <>
      <Button onClick={() => navigate("/")}>Add Products</Button>
      <TableContainer>
        <TextField
          placeholder="Search"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
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
                dealPrize,
                rating,
                availability,
                shoppingsite,
              } = row;
              console.log(shoppingsite);
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
                  <TableCell align="center">{dealPrize}</TableCell>
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
    </>
  );
};
export default ProductsPage;
