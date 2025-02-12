import {
  Box,
  Button,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { IBrand, UpdateBrandSchema } from '../../pages/BrandEditPage';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  brand: IBrand | undefined;
  onSubmit: (data: IBrand) => void;
};

const BrandEditForm = (props: Props) => {
  const { brand, onSubmit } = props;

  const {
    handleSubmit,
    // setValue,
    control,
    formState: { errors },
  } = useForm<IBrand>({
    resolver: zodResolver(UpdateBrandSchema),
    defaultValues: {
      id: brand?.id ?? '',
      title: brand?.title ?? '',
      active: brand?.active ?? false,
    },
  });

  return (
    <>
      <Box
        component={Button}
        variant='text'
        sx={{
          border: '2px dashed black',
          borderRadius: '10px',
          marginTop: 3,
          p: 20,
          textAlign: 'center',
          color: 'black',
        }}
      >
        <AddIcon />
        Add Image
      </Box>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='id'
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth margin='normal' disabled />
          )}
        />

        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin='normal'
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />

        <Stack direction='row' justifyContent='flex-start' alignItems='center'>
          <Controller
            name='active'
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <Typography>Active</Typography>
        </Stack>

        <Button
          sx={{ alignSelf: 'flex-end', width: 120 }}
          variant='contained'
          type='submit'
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default BrandEditForm;
