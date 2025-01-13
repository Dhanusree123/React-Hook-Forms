import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { schema, products } from "../components/AddProductsType";
import { z } from "zod";

type FormData = z.infer<typeof schema>;

const AddProductPage = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: "",
      title: "",
      description: "",
      mrp: 0,
      ourprice: 0,
      status: undefined,
      rating: 0,
      review: "",
    },
  });

  const generateUniqueId = (): number => {
    const lastId = localStorage.getItem("lastId");
    const newId = lastId ? Number(lastId) + 1 : 1;
    localStorage.setItem("lastId", newId.toString());
    return newId;
  };

  const onSubmit = (data: FormData) => {
    const newProduct = { ...data, id: generateUniqueId() };
    const existingProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    existingProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(existingProducts));
    setAlertMessage("Product Added Successfully");
    reset();
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Stack alignItems="center">
      {isLoading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <Stack>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button variant="contained" onClick={() => navigate("/")}>
              View Products
            </Button>
          </Box>
          <Grid2 size={{ xs: 12 }}>
            <Card sx={{ width: { xs: "100%", sm: "500px" } }}>
              <CardContent>
                <Stack spacing={3} alignItems="center">
                  <Typography variant="h5" gutterBottom>
                    Add Product
                  </Typography>
                  {alertMessage && (
                    <Alert severity="success">{alertMessage}</Alert>
                  )}
                  <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Grid2
                      direction="column"
                      container
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      {products.map((product, i) => (
                        <Grid2 key={i}>
                          <Controller
                            name={product.name}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label={product.label}
                                type={product.type}
                                multiline
                                rows={product.rows}
                                error={Boolean(errors[product.name])}
                                helperText={
                                  errors[product.name]
                                    ? errors[product.name]?.message
                                    : ""
                                }
                                sx={{ width: { xs: 300, sm: 400 } }}
                              />
                            )}
                          />
                        </Grid2>
                      ))}
                      <Grid2 container justifyContent="flex-start">
                        <FormControl
                          component="fieldset"
                          error={Boolean(errors.status)}
                        >
                          <FormLabel>Status</FormLabel>
                          <Controller
                            name="status"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <RadioGroup row {...field}>
                                <FormControlLabel
                                  value="active"
                                  control={<Radio />}
                                  label="Active"
                                />
                                <FormControlLabel
                                  value="inactive"
                                  control={<Radio />}
                                  label="Inactive"
                                />
                              </RadioGroup>
                            )}
                          />
                          {errors.status && (
                            <Box color="error.main" mt={1}>
                              {errors.status.message}
                            </Box>
                          )}
                        </FormControl>
                      </Grid2>
                      <Grid2>
                        <Button type="submit" variant="contained">
                          Add
                        </Button>
                      </Grid2>
                    </Grid2>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid2>
        </Stack>
      )}
    </Stack>
  );
};

export default AddProductPage;
