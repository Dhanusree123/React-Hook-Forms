import { Bedtime, WbSunny } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ThemeProps = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

const Header = ({ mode, toggleTheme }: ThemeProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<HTMLElement | null>(null);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          backgroundColor: "inherit",
          py: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <WbSunny /> : <Bedtime />}
          </IconButton>
          <IconButton onClick={handleOpenPopOver}>
            <Avatar alt="Dhanu Sree">D</Avatar>
          </IconButton>
        </Box>

        <Popover
          open={Boolean(open)}
          onClose={handleClosePopOver}
          // anchorEl={open}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box sx={{ p: 2, minWidth: 200 }}>
            <Typography variant="subtitle2" noWrap>
              {email}
            </Typography>
            <Typography variant="body2">{password}</Typography>
          </Box>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Box sx={{ p: 1 }}>
            <MenuItem onClick={() => handleClickItem("/users")}>Users</MenuItem>
            <MenuItem onClick={() => handleClickItem("/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Box>
        </Popover>
      </Box>
    </>
  );
};

export default Header;
