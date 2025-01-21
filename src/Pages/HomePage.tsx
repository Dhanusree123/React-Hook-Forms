"use client";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  return (
    <Stack spacing={2}>
      <Box>
        <Button variant="contained" onClick={() => router.push("/products")}>
          Products
        </Button>
      </Box>
      <Box>
        <Button variant="contained" onClick={() => router.push("/product/add")}>
          Add Product
        </Button>
      </Box>
    </Stack>
  );
};

export default HomePage;
