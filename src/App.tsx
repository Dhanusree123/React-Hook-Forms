import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProductPage from "./Pages/AddProductPage";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/add" element={<AddProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
