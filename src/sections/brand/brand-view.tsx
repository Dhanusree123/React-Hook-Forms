import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import { useTable } from "../../hooks/useTable";
import { useLocation, useNavigate } from "react-router-dom";
import BrandDelete from "./brand-delete";
import { Bedtime, Home, WbSunny } from "@mui/icons-material";
import { FetchData } from "../../pages/brand";
import { useCallback, useEffect, useState } from "react";

type Brand = {
  id: string;
  title: string;
  active: string;
};

export type BrandsPageProps = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

const Brandview = ({ mode, toggleTheme }: BrandsPageProps) => {
  const params = new URLSearchParams();
  const location = useLocation();
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [count, setCount] = useState<number>(0);
  const [searchBrand, setSearchBrand] = useState<string>(
    params.get("search") || ""
  );
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchBrand(value);
  };

  const editBrand = (id: string) => {
    navigate(`/brands/${id}/edit`);
  };

  const getBrands = useCallback(async () => {
    const limit = rowsPerPage;
    const skip = page * rowsPerPage;
    const search = { title: searchBrand };
    const fetchedBrands = await FetchData(limit, search, skip);
    setBrands(fetchedBrands.brands);
    console.log(fetchedBrands.brands.length);
    setCount(fetchedBrands.count);
  }, [page, rowsPerPage, searchBrand]);

  useEffect(() => {
    getBrands();
  }, [getBrands]);

  const handleSearchFocus = () => {
    navigate("/brands?page=0");
    onChangePage(null, 0);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchBrand(params.get("search") || "");
  }, [location.search]);

  return (
    <>
      <Box sx={{ ml: "auto", mr: "auto", px: 3, py: 2, width: "80%" }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "dark" ? <WbSunny /> : <Bedtime />}
        </IconButton>
        <TextField
          value={searchBrand}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
        />
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Breadcrumbs>
              <Link
                href="/"
                sx={{ color: "text.secondary", textDecoration: "none" }}
              >
                <Home />
              </Link>
              <Typography>Brands</Typography>
            </Breadcrumbs>
            <Button onClick={() => navigate("/brands/new")}>Add Brand</Button>
          </Box>
        </Box>
        <Grid component="div" sx={{ ml: 0, mr: 0 }}>
          <TableContainer sx={{ maxWidth: "7100%", px: 2, py: 3 }}>
            <Table sx={{ minWidth: 650, padding: "10px" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Id
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                    Title
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Active
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brands.map((b, index) => (
                  <TableRow key={b.id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{b.title}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {b.active ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton>
                        <EditIcon
                          fontSize="small"
                          sx={{ marginRight: 2 }}
                          onClick={() => editBrand(b.id)}
                        />
                      </IconButton>

                      <BrandDelete id={b.id} onDeleteSuccess={getBrands} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <TablePagination
          component="div"
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          rowsPerPageOptions={[5, 10, 15]}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default Brandview;
