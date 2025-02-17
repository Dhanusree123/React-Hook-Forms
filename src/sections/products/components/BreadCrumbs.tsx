import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { Home } from "lucide-react";

type Props = {
  breadcrumbName: string;
};

const BreadCrumbs = ({ breadcrumbName }: Props) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        mb: 3,
      }}
    >
      <Breadcrumbs separator="›">
        <Link
          href="#"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            textDecoration: "none",
          }}
        >
          <Home size={16} style={{ marginRight: 4 }} />
        </Link>
        <Link
          href="/products"
          sx={{ color: "text.secondary", textDecoration: "none" }}
        >
          Products
        </Link>
        <Typography color="text.primary">{breadcrumbName}</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumbs;
