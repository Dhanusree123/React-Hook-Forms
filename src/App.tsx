import { useState } from "react";
import AddBrandsPage from "./pages/AddBrandsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BrandsPage from "./pages/BrandsPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "./theme/Theme";
import { Toaster } from "sonner";
import EditBrandPage from "./pages/EditBrandPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    document.documentElement.setAttribute(
      "data-theme",
      mode === "light" ? "dark" : "light"
    );
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <ThemeProvider theme={getTheme(mode)}>
          <CssBaseline />
          <Routes>
            <Route
              path="/login"
              element={<LoginPage mode={mode} toggleTheme={toggleTheme} />}
              index={true}
            />
            <Route
              path="/brands"
              element={<BrandsPage mode={mode} toggleTheme={toggleTheme} />}
            />
            <Route
              path="/brands/new"
              element={<AddBrandsPage mode={mode} toggleTheme={toggleTheme} />}
            />
            <Route
              path="/brand/:id/edit"
              element={<EditBrandPage mode={mode} toggleTheme={toggleTheme} />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
