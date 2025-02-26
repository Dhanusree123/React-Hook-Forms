import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import FormProvider from "../../components/FormProvider";

import Grid from "@mui/material/Grid2";
import RHFTextField from "../../components/RHFTextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { IResource, ResourceSchema } from "../../types/resource";

type Props = {
  onSubmit: (data: IResource) => void;
  isEdit?: boolean;
  resource: IResource | null;
  loading?: boolean;
};
const UserForm = (props: Props) => {
  const { onSubmit, isEdit = false, resource } = props;

  const defaultValues = useMemo(
    () => ({
      id: resource?.id ?? 0,
      name: resource?.name ?? "",
      year: resource?.year ?? 0,
      color: resource?.color ?? "",
      pantone_value: resource?.pantone_value ?? "",
    }),
    [resource]
  );
  const methods = useForm<IResource>({
    resolver: zodResolver(ResourceSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = methods;

  useEffect(() => {
    reset({
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  //   if (errors) {
  //     Object.values(errors).forEach((err) => {
  //       toast.error(err.message);
  //     });
  //   }

  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      Object.values(errors).forEach((err) => {
        toast.error(err.message);
      });
    }
  }, [errors, isSubmitted]);

  return (
    <Box
      sx={{
        py: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="md">
          <Stack spacing={4}>
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  {isEdit ? "Edit" : "Add"} Resource
                </Typography>

                <Grid container spacing={2}>
                  {isEdit && <RHFTextField name="id" label="ID" disabled />}
                  <RHFTextField
                    name="name"
                    label="Name"
                    placeholder="Name"
                    helperText={errors.name && errors.name.message}
                  />
                  <RHFTextField
                    name="year"
                    label="Year"
                    placeholder="Year"
                    helperText={errors.year && errors.year.message}
                    disabled={isEdit}
                  />
                  <RHFTextField
                    name="color"
                    label="Color"
                    placeholder="Color"
                    helperText={errors.color && errors.color.message}
                    disabled={isEdit}
                  />
                  <RHFTextField
                    name="pantone_value"
                    label="Pantone Value"
                    placeholder="Pantone Value"
                    helperText={
                      errors.pantone_value && errors.pantone_value.message
                    }
                    disabled={isEdit}
                  />
                </Grid>
                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button type="submit" variant="contained">
                    {isEdit ? "Update " : "Add "}User
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </FormProvider>
    </Box>
  );
};

export default UserForm;
