import { Box, Card, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useForm } from "react-hook-form";

const ProfileForm = () => {
  const { register } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  return (
    <>
      <Grid sx={{ xs: 12, md: 8 }}>
        <Card sx={{ p: 3 }}>
          <Box component="form">
            <TextField
              {...register("currentPassword")}
              type="password"
              fullWidth
              label="Email"
              margin="normal"
            />
            <TextField
              {...register("newPassword")}
              type="password"
              disabled
              fullWidth
              label="Password"
              margin="normal"
            />
            <TextField
              {...register("confirmPassword")}
              type="password"
              disabled
              fullWidth
              label="Password"
              margin="normal"
            />
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default ProfileForm;
