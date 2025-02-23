import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import { toast } from "sonner";
import useAxios from "../../components/custom-axios/useAxios";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../types/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFTextField from "../../components/hook-form/custom-text-field/rhf-text-field";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { response, error, loading, fetchData } = useAxios();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async () => {
    try {
      await fetchData({
        url: "/login",
        method: "POST",
        data: {
          email,
          password,
        },
      });
      if (response) {
        const token = (response as { token: string }).token;
        console.log("Access Token:", token);
        localStorage.setItem("token", token);
        toast.success("Login successful");
        navigate("/users");
      }
    } catch (err) {
      console.log(err);
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
                {error && <Typography>Error: {error}</Typography>}
                <RHFTextField
                  name="email"
                  label="Email"
                  placeholder="xyz@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={errors.email && errors.email.message}
                />

                <RHFTextField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  helperText={errors.password && errors.password.message}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
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
