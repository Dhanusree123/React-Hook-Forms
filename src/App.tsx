import ProductFormPage from "./Pages/ProductFormPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import ProductsPage from "./Pages/ProductsPage";
import ProductPage from "./Pages/ProductPage";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<ProductFormPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
