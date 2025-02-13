import { useForm } from "react-hook-form";
import { BrandsPageProps, LoginFormSchema, loginSchema } from "../type/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { login } from "../graphql/GraphqlLogin";
import { Moon, Sun } from "lucide-react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";

const AdminPage = ({ mode, toggleTheme }: BrandsPageProps) => {
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
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>
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

export default AdminPage;
