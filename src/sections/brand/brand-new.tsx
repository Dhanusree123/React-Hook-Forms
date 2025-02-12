/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { BrandsPageProps } from "./brand-view";
import WbSunny from "@mui/icons-material/WbSunny";
import Bedtime from "@mui/icons-material/Bedtime";
import { Home } from "@mui/icons-material";

type Brand = {
  title: string;
  active: boolean;
};

const TitleSchema = z.object({
  title: z.string().min(1, "Title must be of atleast 1 character"),
});

type Title = z.infer<typeof TitleSchema>;

const BrandNew = ({ mode, toggleTheme }: BrandsPageProps) => {
  const [title, setTitle] = useState("");
  const [, setResponse] = useState<Brand | null>(null);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Title>({ resolver: zodResolver(TitleSchema) });

  const onSubmit: SubmitHandler<Title> = async () => {
    const AUTH_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkxNjQ3ODMsImV4cCI6MTc0MTc1Njc4M30.w3Noq69dqXl3t2sbAfNDueQFr7IT85lXh0ln4LVM6TY";

    try {
      const res = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: `
            mutation createBrand($input:CreateBrandDto!) {
              createBrand(input: $input) {
                title
                active
              }
            }
          `,
          variables: {
            input: {
              title: `${title}`,
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

      setResponse(res.data.data.createBrand);
      toast.success("Brand added successfully");
      navigate("/brands");
    } catch (err: any) {
      toast.error(err.message);
    }
    setTitle(title);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event?.target.value);
  };

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
            <Typography>Add Brand</Typography>
          </Breadcrumbs>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <WbSunny /> : <Bedtime />}
          </IconButton>
        </Box>

        <Card sx={{ p: 5, m: 2 }}>
          <Typography variant="h6">Add Brand</Typography>

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
              <TextField
                label="Title"
                margin="normal"
                fullWidth
                type="string"
                {...register("title")}
                value={title}
                onChange={handleTitleChange}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default BrandNew;
