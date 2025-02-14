/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Paper,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Home } from "lucide-react";
import { BrandsPageProps, Edit, EditSchema } from "../../type/Schema";
import { useCallback, useEffect, useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Graphql } from "../../graphql/Graphql";

const EditBrand = ({ mode }: BrandsPageProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Edit>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      id: "",
      title: "",
      active: false,
    },
  });

  const onSubmit = async (data: Edit) => {
    const AUTH_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkyNTAwMjAsImV4cCI6MTc0MTg0MjAyMH0.5FIeB-q3wjBsQYSsfLXslLhj2klKzIRaClEw0CjMts8";

    try {
      await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: `
            mutation updateBrand($id:String!,$input:UpdateBrandDto!) {
              updateBrand(id:$id,input: $input) {
                title
                active
              }
            }
          `,
          variables: {
            id: data.id,
            input: {
              title: data.title,
              active: data.active,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + AUTH_TOKEN,
          },
        }
      );
      toast.success("Brand updated successfully");
      navigate("/brands");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleImageSelect = (file: File) => {
    setValue("image", file);
  };

  const { id } = useParams<{ id: string }>();

  const fetchBrands = useCallback(async () => {
    const brands = await Graphql(0);
    const brand = brands.brands.find((b: any) => b.id === id);
    if (brand) {
      setValue("id", brand.id);
      setValue("title", brand.title);
      setValue("active", brand.active);
    }
  }, [id, setValue]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            mb: 3,
          }}
        >
          <Breadcrumbs separator="›">
            <Link
              href="#"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
                textDecoration: "none",
              }}
            >
              <Home size={16} style={{ marginRight: 4 }} />
            </Link>
            <Link
              href="/brands"
              sx={{ color: "text.secondary", textDecoration: "none" }}
            >
              Brands
            </Link>
            <Typography color="text.primary">Edit Brand</Typography>
          </Breadcrumbs>
          <Box sx={{ display: "flex", gap: 2 }}></Box>
        </Box>

        <Paper sx={{ p: 3 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" component="h1" gutterBottom>
              Edit Brand
            </Typography>
            <Tabs
              value={currentTab}
              onChange={(_, newValue) => setCurrentTab(newValue)}
              sx={{
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                "& .MuiTab-root": {
                  minWidth: "auto",
                  px: 0,
                  mr: 2,
                  textTransform: "none",
                  "&.Mui-selected": {
                    color: "primary.main",
                    borderBottom: 2,
                    borderColor: "primary.main",
                  },
                },
              }}
            >
              <Tab label="General" />
              <Tab label="Metadata" />
            </Tabs>
          </Box>

          {currentTab === 0 ? (
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <ImageUploader onImageSelect={handleImageSelect} mode={mode} />

              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <TextField {...field} margin="normal" fullWidth disabled />
                )}
              />

              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />

              <Box>
                <Typography>Active</Typography>
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>metadata</Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default EditBrand;
