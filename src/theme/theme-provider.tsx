import {
  Avatar,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  ThemeProvider,
  Typography,
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
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const email = localStorage.getItem("email") ?? "";
  const splitEmail = email.split("@")[0];

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
    localStorage.removeItem("email");
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  const handleOpenPopOver = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event?.currentTarget);
  };

  const handleClosePopOver = () => {
    setOpen(null);
  };

  const handleClickItem = (path: string) => {
    handleClosePopOver();
    navigate(path);
  };

  return (
    <>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <Box textAlign="right" marginTop={3} marginRight={3}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
          {location.pathname !== "/login" && email && (
            <IconButton onClick={handleOpenPopOver} sx={{ marginLeft: 2 }}>
              <Avatar sx={{ bgcolor: "#4f46e5" }}>
                {email[0].toUpperCase()}
              </Avatar>
            </IconButton>
          )}
          <Popover
            open={Boolean(open)}
            onClose={handleClosePopOver}
            anchorEl={open}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {splitEmail && (
              <Box sx={{ p: 2, minWidth: 200 }}>
                <Typography variant="subtitle2" noWrap>
                  {splitEmail[0].toUpperCase() + splitEmail.slice(1)}
                </Typography>
                <Typography variant="body2">{email}</Typography>
              </Box>
            )}
            <Divider sx={{ borderStyle: "dashed" }} />
            <Box sx={{ p: 1 }}>
              <MenuItem onClick={() => handleClickItem("/users")}>
                Users
              </MenuItem>
              <MenuItem onClick={() => handleClickItem("/resources")}>
                Resources
              </MenuItem>
              <MenuItem onClick={() => handleClickItem("/profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Box>
          </Popover>
        </Box>
        {children}
      </ThemeProvider>
    </>
  );
};

export default Theme;
