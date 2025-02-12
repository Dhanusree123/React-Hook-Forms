/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  IconButton,
  Link,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
// import { FetchData } from "../../pages/brand";
import { useParams } from "react-router-dom";
import { BrandsPageProps } from "./brand-view";
import WbSunny from "@mui/icons-material/WbSunny";
import Bedtime from "@mui/icons-material/Bedtime";
import { Home } from "@mui/icons-material";

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkxNjQ3ODMsImV4cCI6MTc0MTc1Njc4M30.w3Noq69dqXl3t2sbAfNDueQFr7IT85lXh0ln4LVM6TY";

const TitleSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title must be of atleast 1 character"),
  active: z.boolean(),
});

type Title = z.infer<typeof TitleSchema>;

const BrandEdit = ({ mode, toggleTheme }: BrandsPageProps) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [brand, setBrand] = useState<Title>();

  const FIND_BRAND_BY_ID = `
  query findBrandById($id:String!){
  findBrandById(id:$id){
  id
  active
  title
  }
  }`;

  const defaultValues = useMemo(
    () => ({
      id: brand?.id ?? "",
      title: brand?.title ?? "",
      active: brand?.active ?? false,
    }),
    [brand]
  );
  const {
    handleSubmit,
    // setValue,
    control,
    formState: { errors },
  } = useForm<Title>({
    resolver: zodResolver(TitleSchema),
    defaultValues,
  });

  const fetchBrand = useCallback(async () => {
    try {
      const res = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: FIND_BRAND_BY_ID,
          variables: {
            id,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );
      const brand = res.data.data.findBrandById;
      setBrand(res.data.data.findBrandById);
      console.log("Submitted", res.data.data.findBrandById);
      // toast.success("Brand updated successfully");
      // navigate("/brands");
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [id, FIND_BRAND_BY_ID]);

  const onSubmit = async (data: Title) => {
    try {
      const res = await axios.post(
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
      console.log("Submitted", res.data);
      toast.success("Brand updated successfully");
      navigate("/brands");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // useEffect(() => {
  //   const getBrands = async () => {
  //     try {
  //       const fetchedBrands = await FetchData(40, { title: "" }, 0);
  //       console.log(fetchedBrands);
  //       const selectedBrand = fetchedBrands.brands.find(
  //         (b: any) => b.id === id
  //       );

  //       console.log(selectedBrand);
  //       if (selectedBrand) {
  //         setValue("id", selectedBrand.id);
  //         setValue("title", selectedBrand.title);
  //         setValue("active", selectedBrand.active);
  //       }
  //     } catch (err) {
  //       console.log("Error", err);
  //     }
  //   };

  //   getBrands();
  // }, [id, setValue]);

  useEffect(() => {
    fetchBrand();
  }, [fetchBrand]);

  return (
    <Box sx={{ maxHeight: "100vh", bgcolor: "Background.default", py: 4 }}>
      <Container maxWidth="md">
        <Box
          sx={{
            m: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Breadcrumbs separator="›">
            <Link
              href="/"
              sx={{ color: "text.secondary", textDecoration: "none" }}
            >
              <Home />
            </Link>
            <Link
              href="/brands"
              sx={{ color: "text.secondary", textDecoration: "none" }}
            >
              Brands
            </Link>
            <Typography>Edit Brand</Typography>
          </Breadcrumbs>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <WbSunny /> : <Bedtime />}
          </IconButton>
        </Box>
        <Card
          sx={{
            p: 5,
            m: 2,
          }}
        >
          <Typography variant="h6">Edit Brand</Typography>

          <Box
            sx={{
              border: "2px dashed black",
              borderRadius: "10px",
              marginTop: 3,
            }}
          >
            <Box sx={{ p: 20, textAlign: "center" }}>
              <Button variant="text" disableRipple sx={{ color: "black" }}>
                <AddIcon />
                Add Image
              </Button>
            </Box>
          </Box>
          <Box>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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

              <Box sx={{ textAlign: "right" }}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default BrandEdit;
