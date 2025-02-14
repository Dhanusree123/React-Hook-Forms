import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Home, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableContent from "../../components/TableContent";
import useDebounce from "../../components/UseDebounce";

const BrandsList = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const initialPage = Number(params.get("page")) || 1;

  const [searchQuery, setSearchQuery] = useState(params.get("search") || "");
  const [page, setPage] = useState(initialPage);

  const deboundedSearch = useDebounce(searchQuery, 500);

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      params.set("search", value);
      params.delete("page");
    } else {
      params.delete("search");
    }
    setSearchQuery(value);
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage, setPage]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Breadcrumbs separator="›">
            <Link
              href="#"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
                textDecoration: "none",
              }}
            >
              <Home size={16} style={{ marginRight: 4 }} />
            </Link>
            <Typography color="text.primary">Brands</Typography>
          </Breadcrumbs>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={() => navigate("/brands/new")}
              sx={{
                bgcolor: "#6366f1",
                "&:hover": {
                  bgcolor: "#4f46e5",
                },
              }}
            >
              New Brand
            </Button>
          </Box>
        </Box>

        <TextField
          placeholder="Search..."
          size="small"
          fullWidth
          value={searchQuery}
          sx={{ marginBottom: 5 }}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />

        <Paper sx={{ p: 3 }}>
          <TableContent
            search={deboundedSearch}
            page={page}
            setPage={setPage}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default BrandsList;
