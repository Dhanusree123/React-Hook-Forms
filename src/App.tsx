import { useState } from "react";
import AddBrandsPage from "./pages/brands/AddBrandsPage";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import BrandsPage from "./pages/brands/BrandsPage";
import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import getTheme from "./theme/Theme";
import { toast, Toaster } from "sonner";
import EditBrandPage from "./pages/brands/EditBrandPage";
import { Moon, Sun } from "lucide-react";
import { logout } from "./graphql/GraphqlLogin";
import AdminPage from "./pages/LoginPage";
import AddProductPage from "./pages/products/AddProductPage";
import EditProductPage from "./pages/products/EditProductPage";
import ProductsPage from "./pages/products/ProductsPage";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    document.documentElement.setAttribute(
      "data-theme",
      mode === "light" ? "dark" : "light"
    );
  };

  const handleLogout = () => {
    navigate("/login");
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <Box textAlign="right" marginTop={3} marginRight={3}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
          {location.pathname !== "/login" && (
            <Button
              sx={{ marginLeft: 3 }}
              onClick={handleLogout}
              variant="contained"
            >
              Log out
            </Button>
          )}
        </Box>
        <Routes>
          <Route path="/login" element={<AdminPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brands/new" element={<AddBrandsPage mode={mode} />} />
          <Route
            path="/brand/:id/edit"
            element={<EditBrandPage mode={mode} />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/new" element={<AddProductPage />} />
          <Route path="/product/:id/edit" element={<EditProductPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
