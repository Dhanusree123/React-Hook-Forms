import {
  Box,
  IconButton,
  Pagination,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
} from "@mui/material";
import { Pencil } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FindProducts } from "../../../graphql/Find/FindProducts";
import { Product } from "../../../type/Schema";

type Props = {
  search: string;
  page: number;
  setPage: (page: number) => void;
};

const ProductsTable = ({ search: searchQuery, page, setPage }: Props) => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const [products, setProducts] = useState<Product[]>([]);
  const rowsPerPage = 10;
  const [count, setCount] = useState<number>(0);
  const [tab, setTab] = useState(params.get("tab") || "all");

  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    const limit = rowsPerPage;
    const skip = (page - 1) * rowsPerPage;
    const search = { title: searchQuery };
    const filter = {
      active: tab === "active" ? true : tab === "inactive" ? false : undefined,
      expired: tab === "expired" ? true : undefined,
      handPicked: tab === "handPicked" ? true : undefined,
    };
    const products = await FindProducts(skip, limit, search, undefined, filter);
    setProducts(products.products);
    setCount(products.count);
  }, [page, searchQuery, rowsPerPage, tab]);

  const handleTabChange = (_: unknown, newValue: string) => {
    if (newValue) {
      params.delete("page");
      params.set("tab", newValue);
    }
    if (newValue === "all") {
      params.delete("tab");
    }
    setTab(newValue);
    setPage(1);
    navigate(`?${params.toString()}`);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }
    setPage(newPage);
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Stack>
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{ bgcolor: "inherit" }}
        >
          <Tab label={`All${tab === "all" ? `(${count})` : ""}`} value="all" />
          <Tab
            label={`Active${tab === "active" ? `(${count})` : ""}`}
            value="active"
          />
          <Tab
            label={`Inactive${tab === "inactive" ? `(${count})` : ""}`}
            value="inactive"
          />
          <Tab
            label={`Expired${tab === "expired" ? `(${count})` : ""}`}
            value="expired"
          />
          <Tab
            label={`HandPicked${tab === "handPicked" ? `(${count})` : ""}`}
            value="handPicked"
          />
        </Tabs>
      </Box>

      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: "grey" }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Deal Price</TableCell>
              <TableCell>List Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Tooltip title={product.title}>
                    <Box
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "250px",
                      }}
                    >
                      {product.title}
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.dealPrice}</TableCell>
                <TableCell>{product.listPrice}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/product/${product.id}/edit`)}
                    size="small"
                  >
                    <Pencil size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <Stack justifyContent="center" alignItems="center" marginTop={3}>
          <Pagination
            count={Math.ceil(count / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            siblingCount={0}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default ProductsTable;
