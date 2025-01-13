import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Product = {
  productId: string;
  description: string;
  review: string;
  mrp: number;
  dealPrize: number;
  rating: number;
  category: "furniture" | "fashion" | "electricals";
  availability: "available" | "not-available";
};

const ProductsPage = () => {
  const productData = localStorage.getItem("Products") ?? "";
  const [products, setProducts] = useState<Product[] | []>([]);
  const navigate = useNavigate();

  const handleProduct = (productId: Product) => {
    navigate(`/product=${productId}`);
  };

  useEffect(() => {
    if (productData) {
      setProducts([JSON.parse(productData)]);
    }
  }, [productData]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ProductId</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">DealPrice</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Availability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              onClick={() => handleProduct}
              key={row.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.productId}
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.dealPrize}</TableCell>
              <TableCell align="right">{row.rating}</TableCell>
              <TableCell align="right">{row.availability}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProductsPage;
