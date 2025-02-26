import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid2,
  Paper,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import ChangePasswordPage from "./ChangePasswordPage";
import RHFTextField from "../../components/hook-form/custom-text-field/rhf-text-field";
import CustomBreadCrumbs from "../../components/custom-bread-crumbs/CustomBreadCrumbs";

const ProfilePage = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("User");
  const [tab, setTab] = useState("general");

  const getAvatarLetter = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length > 1) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const methods = useForm({
    defaultValues: {
      name: name,
      email: email,
    },
  });

  const { control, handleSubmit, setValue } = methods;

  const watchedName = useWatch({ control, name: "name" });

  const onSubmit = () => {
    console.log("submitted");
  };

  const handleTabChange = (_: unknown, newValue: string) => {
    setTab(newValue);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email") || "user@example.com";
    setEmail(storedEmail);
    setName(storedEmail.split("@")[0]);
  }, []);

  useEffect(() => {
    setValue("name", name);
    setValue("email", email);
  }, [name, email, setValue]);
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <CustomBreadCrumbs path="/profile" pathName="User Profile" />
        <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="General" value="general" />
          <Tab label="Change Password" value="change-password" />
        </Tabs>
        <FormProvider {...methods}>
          <Grid2 container spacing={2} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    py: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      height: 200,
                      width: 200,
                      bgcolor: "#4f46e5",
                      color: "white",
                      fontSize: 40,
                    }}
                  >
                    {getAvatarLetter(watchedName)}
                  </Avatar>
                </Box>
              </Card>
            </Grid2>
            {tab === "general" && (
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
                  <Box component="form" onSubmit={handleSubmit(onSubmit)} p={2}>
                    <Stack spacing={3}>
                      <RHFTextField
                        name="name"
                        label="Name"
                        placeholder="Name"
                      />
                      <RHFTextField
                        name="email"
                        label="Email"
                        placeholder="user@example.com"
                      />
                    </Stack>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                      }}
                    >
                      <Button type="submit" variant="contained">
                        Save
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid2>
            )}
            {tab === "change-password" && <ChangePasswordPage />}
          </Grid2>
        </FormProvider>
      </Container>
    </Box>
  );
};

export default ProfilePage;
