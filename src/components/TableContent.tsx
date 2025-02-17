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
} from "@mui/material";
import { Pencil } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Brand } from "../type/Schema";
import { Graphql } from "../graphql/Find/Graphql";
import { useLocation, useNavigate } from "react-router-dom";
import BrandDelete from "./BrandDelete";

type Props = {
  search: string;
  page: number;
  setPage: (page: number) => void;
};

const TableContent = ({ search: searchQuery, page, setPage }: Props) => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const [products, setProducts] = useState<Brand[]>([]);
  const rowsPerPage = 5;
  const [tab, setTab] = useState(params.get("tab") || "all");
  const [count, setCount] = useState<number>(0);

  const navigate = useNavigate();

  /*const filteredBrands = products.filter((brand) => {
    const matchesSearch = brand.title;
    if (tab === "all") return matchesSearch;
    if (tab === "active") return matchesSearch && brand.active;
    if (tab === "inactive") return matchesSearch && !brand.active;
    return matchesSearch;
  });*/

  const handleChangePage = (_: unknown, newPage: number) => {
    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }
    setPage(newPage);
    navigate(`?${params.toString()}`);
  };

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

  /*const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };*/

  /*const fetchBrands = async () => {
    const brands = await Graphql();
    setProducts(brands);
  };*/

  const fetchBrands = useCallback(async () => {
    const limit = rowsPerPage;
    const skip = (page - 1) * rowsPerPage;
    const search = { title: searchQuery };
    const filter = tab !== "all" ? { active: tab === "active" } : undefined;
    const brands = await Graphql(skip, limit, search, undefined, filter);
    setProducts(brands.brands);
    setCount(brands.count);
  }, [page, searchQuery, rowsPerPage, tab]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <Stack>
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: "divider" }}
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
        </Tabs>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((brand, index) => (
              <TableRow key={brand.id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>{brand.title}</TableCell>
                <TableCell>{brand.active ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/brand/${brand.id}/edit`)}
                    size="small"
                  >
                    <Pencil size={16} />
                  </IconButton>
                  <BrandDelete id={brand.id} onDeleteSuccess={fetchBrands} />
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

export default TableContent;
