import { BrowserRouter, Routes, Route } from "react-router-dom";
import TablePage from "./Pages/TablePage";
import MinimalSigninPage from "./Pages/MinimalSigninPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MinimalSigninPage />} />
        <Route path="/table" element={<TablePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
