import { Box, Button, Grid2, Paper, Stack } from "@mui/material";
import RHFTextField from "../../components/hook-form/custom-text-field/rhf-text-field";
import { useForm } from "react-hook-form";
import { changePassword, IChangePassword } from "../../types/Profile";
import { zodResolver } from "@hookform/resolvers/zod";

const ChangePasswordPage = () => {
  const onSubmit = () => {
    console.log("New Password saved succesfully!");
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePassword>({
    resolver: zodResolver(changePassword),
  });

  return (
    <Grid2 size={{ xs: 12, md: 6 }}>
      <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
        <Box component="form" onClick={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField
              name="password"
              label="Currect Password"
              placeholder="Currect Password"
              helperText={
                errors.currentPassword && errors.currentPassword.message
              }
            />

            <RHFTextField
              name="newPassword"
              label="New Password"
              placeholder="New Password"
              helperText={errors.newPassword && errors.newPassword.message}
            />

            <RHFTextField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />

            <Button type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Grid2>
  );
};

export default ChangePasswordPage;
