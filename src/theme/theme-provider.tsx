import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import getTheme from "./create-theme";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { DarkMode, LightMode } from "@mui/icons-material";

type Props = {
  children: React.ReactNode;
};

const Theme = ({ children }: Props) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    document.documentElement.setAttribute(
      "data-theme",
      mode === "light" ? "dark" : "light"
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <Box textAlign="right" marginTop={3} marginRight={3}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
          {location.pathname !== "/login" && (
            <Button
              sx={{ marginLeft: 3 }}
              onClick={handleLogout}
              variant="contained"
            >
              Log out
            </Button>
          )}
        </Box>
        {children}
      </ThemeProvider>
    </>
  );
};

export default Theme;
