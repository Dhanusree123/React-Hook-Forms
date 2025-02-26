import { Box, Button, Card, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import RHFTextField from "../../components/hook-form/custom-text-field/rhf-text-field";
import { IResource, resourcesSchema } from "../../types/resources";
import { GetById, Update } from "../../components/api/api";
import { toast } from "sonner";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  Id?: string | null;
  onSuccess: () => void;
};

const ResourceForm = (props: Props) => {
  const { Id, onSuccess } = props;
  const methods = useForm<IResource>({
    resolver: zodResolver(resourcesSchema),
    defaultValues: {
      id: 0,
      name: "",
      pantone_value: "",
      year: 0,
      color: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = methods;

  const onSubmit = async (data: IResource) => {
    try {
      const response = await Update("resource", Id!, data);
      toast.success(`updatedAt ${response.data.updatedAt}`);
      console.log("data", data);
    } catch (err) {
      toast.error("Not updated");
      console.log(err);
    }
    console.log("submitted", data);
    onSuccess();
  };

  useEffect(() => {
    if (Id) {
      GetById("resource", Id)
        .then((response) => {
          const { id, name, pantone_value, year, color } = response.data.data;
          setValue("id", id, { shouldValidate: true });
          setValue("name", name, { shouldValidate: true });
          setValue("pantone_value", pantone_value, { shouldValidate: true });
          setValue("year", year, { shouldValidate: true });
          setValue("color", color, { shouldValidate: true });
        })
        .catch((err) => console.log(err));
    } else {
      reset();
    }
  }, [Id, setValue, reset]);

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 3, marginTop: 3 }}>
          <Stack spacing={2}>
            <RHFTextField
              name="id"
              label="Id"
              placeholder="Id"
              type="number"
              helperText={errors.id && errors.id.message}
              disabled={!!Id}
            />

            <RHFTextField
              name="name"
              label="Name"
              placeholder="Name"
              helperText={errors.name && errors.name.message}
            />

            <RHFTextField
              name="pantone_value"
              label="Pantone Value"
              placeholder="16-1995"
              helperText={errors.pantone_value && errors.pantone_value.message}
            />

            <RHFTextField
              name="year"
              label="Year"
              placeholder="Year"
              helperText={errors.year && errors.year.message}
            />

            <RHFTextField
              name="color"
              label="Color"
              placeholder="#5A5B9F"
              helperText={errors.color && errors.color.message}
            />

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Card>
      </Box>
    </FormProvider>
  );
};

export default ResourceForm;
