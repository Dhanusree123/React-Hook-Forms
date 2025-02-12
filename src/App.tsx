import { BrowserRouter, Route, Routes } from "react-router-dom";
import BrandNew from "./sections/brand/brand-new";
import { Toaster } from "sonner";
import EditBrand from "./sections/brand/brand-edit";
import Brandview from "./sections/brand/brand-view";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import getTheme from "./theme/useTheme";
import { CssBaseline } from "@mui/material";
import Homepage from "./pages/homepage";
// import BrandSearch from "./sections/brand/brand-search";

const App = () => {
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
            <Route path="/" element={<Homepage />} />
            <Route
              path="/brands"
              element={<Brandview mode={mode} toggleTheme={toggleTheme} />}
              // element={<Brandview />}
            />
            <Route
              path="/brands/new"
              element={<BrandNew mode={mode} toggleTheme={toggleTheme} />}
            />
            <Route
              path="/brands/:id/edit"
              element={<EditBrand mode={mode} toggleTheme={toggleTheme} />}
            />
            {/* <Route path="/search" element={<BrandSearch />} /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
