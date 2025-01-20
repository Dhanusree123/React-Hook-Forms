import ProductsPage from "@/Pages/ProductsPage";
import { Stack } from "@mui/material";
import { Toaster } from "sonner";

export default function Products() {
  return (
    <Stack>
      <Toaster position="top-right" richColors />
      <ProductsPage />
    </Stack>
  );
}
