import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProductPage from "./Pages/AddProductPage";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/add" element={<AddProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
