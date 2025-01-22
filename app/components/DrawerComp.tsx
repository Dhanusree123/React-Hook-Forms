"use client";
import { ListItem, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useState } from "react";

const DrawerComp = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box onClick={toggleDrawer(false)}>
      <List>
        {[
          "All Inboxes",
          "Primary",
          "Sent",
          "Draft",
          "Bin",
          "Starred",
          "Spam",
          "Settings",
        ].map((text) => (
          <ListItem key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ margin: 5 }}>
      <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default DrawerComp;
