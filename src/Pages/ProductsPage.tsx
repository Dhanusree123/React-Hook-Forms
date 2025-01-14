import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { IProduct } from '../Types/product';

const ProductsPage = () => {
  const productData = localStorage.getItem('Products') ?? '';
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const navigate = useNavigate();

  const handleProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter(
      (product) => product.productId !== productId
    );
    setProducts(updatedProducts);
    localStorage.setItem('Products', JSON.stringify(updatedProducts));
  };

  useEffect(() => {
    if (productData) {
      setProducts(JSON.parse(productData));
    }
  }, [productData]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>ProductId</TableCell>
            <TableCell align='right'>Category</TableCell>
            <TableCell align='right'>Description</TableCell>
            <TableCell align='right'>DealPrice</TableCell>
            <TableCell align='right'>Rating</TableCell>
            <TableCell align='right'>Availability</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((row) => {
            const {
              productId,
              category,
              description,
              dealPrize,
              rating,
              availability,
            } = row;
            return (
              <TableRow
                onClick={() => handleProduct(productId)}
                key={productId}
              >
                <TableCell component='th' scope='row'>
                  {productId}
                </TableCell>
                <TableCell align='right'>{category}</TableCell>
                <TableCell align='right'>{description}</TableCell>
                <TableCell align='right'>{dealPrize}</TableCell>
                <TableCell align='right'>{rating}</TableCell>
                <TableCell align='right'>{availability}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant='outlined'
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
  );
};
export default ProductsPage;
