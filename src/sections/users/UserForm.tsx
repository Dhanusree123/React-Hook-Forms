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
import {
  IUser,

  //   NewUserSchema,
  //   UpdateUserSchema,
  UserSchema,
} from "../../types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

type Props = {
  onSubmit: (data: IUser) => void;
  isEdit?: boolean;
  user: IUser | null;
  loading?: boolean;
};
const UserForm = (props: Props) => {
  const { onSubmit, isEdit = false, user } = props;
  // const userSchema = isEdit ? UpdateUserSchema : NewUserSchema;
  const defaultValues = useMemo(
    () => ({
      id: user?.id ?? "",
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
      avatar: user?.avatar ?? "",
    }),
    [user]
  );
  const methods = useForm<IUser>({
    resolver: zodResolver(UserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    reset({
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  if (errors) {
    Object.values(errors).forEach((err) => {
      toast.error(err.message);
    });
  }
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
                  {isEdit ? "Edit" : "Add"} User
                </Typography>

                <Grid container spacing={2}>
                  {isEdit && <RHFTextField name="id" label="ID" disabled />}
                  <RHFTextField
                    name="first_name"
                    label="First Name"
                    placeholder="First Name"
                    helperText={errors.first_name && errors.first_name.message}
                  />
                  <RHFTextField
                    name="last_name"
                    label="Last Name"
                    placeholder="Last Name"
                    helperText={errors.last_name && errors.last_name.message}
                  />
                  <RHFTextField
                    name="email"
                    label="Email"
                    placeholder="Email"
                    helperText={errors.email && errors.email.message}
                    disabled={isEdit}
                  />
                  <RHFTextField
                    name="avatar"
                    label="Avatar Url"
                    placeholder="Avatar Url"
                    helperText={errors.avatar && errors.avatar.message}
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
