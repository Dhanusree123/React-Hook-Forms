import {
  Button,
  Typography,
  Box,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { ILoginSchema, loginSchema } from "../../types/Login";
import RHFTextField from "../../components/hook-form/custom-text-field/rhf-text-field";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const navigate = useNavigate();

  const methods = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ILoginSchema) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: data.email,
        password: data.password,
      });
      const token = response.data.token;
      console.log("Login successful", token);
      localStorage.setItem("token", token);
      localStorage.setItem("email", data.email);
      toast.success("Successfully logged in");
      navigate("/users");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error logging in", error.response?.data);
        toast.error("Failed to login. Please check your credentials.");
      } else {
        console.error("Unexpected error", error);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 3 }}>
          <FormProvider {...methods}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Typography variant="h4" gutterBottom>
                  Login
                </Typography>
                <RHFTextField
                  name="email"
                  label="Email"
                  placeholder="xyz@example.com"
                  helperText={errors.email && errors.email.message}
                />

                <RHFTextField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  helperText={errors.password && errors.password.message}
                />

                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Stack>
            </Box>
          </FormProvider>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
