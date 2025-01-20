"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProductFormData } from "../components/ProductSchema";
import Link from "next/link";

const ProductTable = () => {
  const [products, setProducts] = useState<ProductFormData[]>([]);

  useEffect(() => {
    const productData = localStorage.getItem("products");
    const parsedProducts: ProductFormData[] = productData
      ? JSON.parse(productData)
      : [];
    setProducts(parsedProducts);
  }, []);
  return (
    <>
      <header>
        <Link href="/">Home</Link>
      </header>
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Title</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Reviews</TableCell>
              <TableCell>MRP</TableCell>
              <TableCell>Deal Price</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Shopping Site</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.productTitle}</TableCell>
                <TableCell>{product.productDescription}</TableCell>
                <TableCell>{product.reviews}</TableCell>
                <TableCell>{product.mrp}</TableCell>
                <TableCell>{product.dealPrice}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>{product.shoppingSite}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductTable;
