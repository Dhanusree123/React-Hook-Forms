import { Avatar, Box, Card, Tab, Tabs, TextField } from "@mui/material";
import CustomBreadCrumbs from "../../components/CustomBreadCrumbs";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import ChangePasswordForm from "../../sections/profile/ChangePasswordForm";

const ProfilePage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const { register, watch } = useForm({
    defaultValues: {
      email: localStorage.getItem("email") || "",
    },
  });

  const email = watch("email");
  const password = localStorage.getItem("password");

  const stringAvatar = (name: string) => {
    const words = name.toUpperCase().split(" ");
    const firstLetter = words[0]?.[0] || "";
    const secondLetter = words[1]?.[0] || "";
    return {
      children: `${firstLetter}${secondLetter}`,
    };
  };
  return (
    <Box sx={{ ml: 9, mr: 9 }}>
      <CustomBreadCrumbs pathName="User Profile" />

      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        sx={{ md: 2 }}
      >
        <Tab label="General" />
        <Tab label="Change Password" />
      </Tabs>

      {tabIndex === 0 && (
        <Grid container spacing={4} alignItems="center" sx={{ mt: 10 }}>
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              {...stringAvatar(email)}
              sx={{ width: 156, height: 156, fontSize: 50 }}
            />
          </Grid>

          <Grid sx={{ xs: 12, md: 8 }}>
            <Card sx={{ p: 3 }}>
              <Box component="form">
                <TextField
                  {...register("email")}
                  value={email}
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
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabIndex === 1 && (
        <Grid container spacing={4} alignItems="center" sx={{ mt: 10 }}>
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              {...stringAvatar(email)}
              sx={{ width: 156, height: 156, fontSize: 50 }}
            />
          </Grid>

          <Grid sx={{ xs: 12, md: 8 }}>
            <Card sx={{ p: 3 }}>
              <ChangePasswordForm />
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProfilePage;
