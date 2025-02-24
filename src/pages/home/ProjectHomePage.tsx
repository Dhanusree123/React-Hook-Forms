import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Auth, Schema } from "../../types/auth";

export const AuthView = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Auth) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email: "eve.holt@reqres.in",
          password: "cityslicka",
        },
      });

      console.log(response.data);
      console.log(data);
      toast.success("Logged in successfully");
      navigate("/users");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Login Form
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                placeholder="Email"
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                placeholder="Password"
                type="password"
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default AuthView;
