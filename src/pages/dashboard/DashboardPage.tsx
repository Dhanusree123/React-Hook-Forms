import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Box>
        <Typography>Redirecting...</Typography>
      </Box>
    </>
  );
};

export default DashboardPage;
