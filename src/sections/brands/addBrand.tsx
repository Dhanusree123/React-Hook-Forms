import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { HomeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrandFormData, BrandsPageProps, Schema } from "../../type/Schema";
import ImageUploader from "../../components/ImageUploader";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GraphqlMutation from "../../graphql/Mutation/GraphqlMutation";

const AddBrand = ({ mode }: BrandsPageProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  const { graphqlMutation } = GraphqlMutation();

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BrandFormData>({
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<BrandFormData> = (data) => {
    graphqlMutation(data.title);
    toast.success("Successfully added");
    navigate("/brands");
  };

  const handleImageSelect = (file: File) => {
    setValue("image", file);
  };

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
              <HomeIcon size={16} style={{ marginRight: 4 }} />
            </Link>
            <Link
              href="/brands"
              sx={{ color: "text.secondary", textDecoration: "none" }}
            >
              Brands
            </Link>
            <Typography color="text.primary">Add Brand</Typography>
          </Breadcrumbs>
        </Box>

        <Paper sx={{ p: 3 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" component="h1" gutterBottom>
              Add Brand
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <ImageUploader onImageSelect={handleImageSelect} mode={mode} />

              <TextField
                {...register("title")}
                placeholder="Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{ mb: 2 }}
              />

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
            </form>
          ) : (
            <Box>metadata</Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default AddBrand;
