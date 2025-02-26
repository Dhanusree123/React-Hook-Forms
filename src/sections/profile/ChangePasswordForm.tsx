import { Box, Button, Card, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useForm } from "react-hook-form";

const ChangePasswordForm = () => {
  const { register } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <>
      <Grid sx={{ xs: 12, md: 8 }} display="flex">
        <Card
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
            width: "100%",
          }}
        >
          <Box component="form">
            <TextField
              {...register("currentPassword")}
              type="text"
              fullWidth
              label="Email"
              margin="normal"
            />
            <TextField
              {...register("newPassword")}
              type="password"
              fullWidth
              label=" New Password"
              margin="normal"
            />
            <TextField
              {...register("confirmPassword")}
              type="password"
              fullWidth
              label="Confirm Password"
              margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default ChangePasswordForm;
