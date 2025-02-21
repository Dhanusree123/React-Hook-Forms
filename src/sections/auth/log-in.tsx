import { useForm } from "react-hook-form";
import { LoginFormSchema, loginSchema } from "../../types/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { login } from "../../graphql/GraphqlLogin";
import { Box, Button, Container, Paper, TextField } from "@mui/material";

const LoginView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: { email: string; password: string }) => {
    const response = await login(data);
    if (response?.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      toast.success("Logged in successfully");
      navigate("/brands");
    } else {
      toast.error("Login failed");
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                margin="normal"
              />
              <Box sx={{ textAlign: "center" }}>
                <Button type="submit" variant="contained">
                  Login
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginView;
