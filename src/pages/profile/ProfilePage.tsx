// import axios from "axios";
// import { useEffect } from "react";
import { Box, Card, TextField } from "@mui/material";
import CustomBreadCrumbs from "../../components/CustomBreadCrumbs";

const ProfilePage = () => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  return (
    <Box sx={{ ml: 9, mr: 9 }}>
      <CustomBreadCrumbs pathName="User Profile" />
      <Card sx={{ p: 3, mt: 7 }}>
        <TextField
          value={email}
          disabled
          fullWidth
          label="Email"
          margin="normal"
        />
        <TextField
          type="password"
          value={password}
          disabled
          fullWidth
          label="Password"
          margin="normal"
        />
      </Card>
    </Box>
  );
};

export default ProfilePage;
