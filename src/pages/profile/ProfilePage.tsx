import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
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

      <Grid
        container
        spacing={4}
        alignItems="stretch"
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Grid size={{ xs: 12, md: 4 }} display="flex">
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              p: 4,
              alignItems: "center",
              textAlign: "center",
              flexGrow: 1,
              width: "100%",
            }}
          >
            <Avatar
              {...stringAvatar(email)}
              sx={{ width: 176, height: 186, fontSize: 55 }}
            />
          </Card>
        </Grid>

        <Grid sx={{ xs: 12, md: 8 }} display="flex">
          <Card
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <CardContent>
              {tabIndex === 0 ? (
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
                  <Button type="submit" variant="contained" fullWidth>
                    Submit
                  </Button>
                </Box>
              ) : (
                <ChangePasswordForm />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
