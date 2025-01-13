import ProductFormPage from "./Pages/ProductFormPage";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductFormPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </>
  );
};

export default App;
