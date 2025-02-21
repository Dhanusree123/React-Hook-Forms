import { useEffect, useState } from "react";
import { IProductFormData } from "../../../types/Schema";
import { GraphqlScraper } from "../../../graphql/GraphqlScraper";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type Props = {
  code?: string;
  ProductData: (data: IProductFormData) => void;
};

const ScraperForm = ({ code, ProductData }: Props) => {
  const [productUrl, setProductUrl] = useState("");

  const handleFetch = async () => {
    const asinMatch = productUrl.match(/\/dp\/([A-Za-z0-9]+)/);
    const asin = asinMatch ? asinMatch[1] : "";
    const formattedUrl = `https://amazon.in/dp/${asin}`;
    console.log("asinMatch", asinMatch);
    const products = await GraphqlScraper(formattedUrl);
    ProductData(products);
    setProductUrl(formattedUrl);
  };

  useEffect(() => {
    if (code) {
      setProductUrl(`https://amazon.in/dp/${code}`);
    }
  }, [code]);
  return (
    <Paper sx={{ p: 1 }}>
      <Box sx={{ p: 1 }}>
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: "bold" }}
          gutterBottom
        >
          Product Url
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            placeholder="Enter product URL"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
          />
          <Button variant="contained" onClick={handleFetch}>
            Fetch
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ScraperForm;
