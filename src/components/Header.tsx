import { Bedtime, WbSunny } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { useState } from "react";
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
          <Button sx={{ mr: 2 }} size="large">
            Logout
          </Button>
          <IconButton onClick={handleOpenPopOver}>
            <Avatar alt="Dhanu Sree">D</Avatar>
          </IconButton>
        </Box>

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
          <Box sx={{ p: 2, minWidth: 200 }}>
            <Typography variant="subtitle2" noWrap>
              Dhanusree
            </Typography>
            <Typography variant="body2">interns@microfox.co</Typography>
          </Box>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Box sx={{ p: 1 }}>
            <MenuItem onClick={() => handleClickItem("/users")}>Home</MenuItem>
            <MenuItem onClick={() => handleClickItem("/profile")}>
              Profile
            </MenuItem>
            <MenuItem>Logout</MenuItem>
          </Box>
        </Popover>
      </Box>
    </>
  );
};

export default Header;
