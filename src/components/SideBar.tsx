import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton onClick={() => navigate("/users")}>
          <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/resources")}>
          <ListItemText primary="Resources" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
