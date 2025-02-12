import { Box, Card, Typography } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import BrandEditForm from '../sections/brand/BrandEditForm';
import { FIND_BRAND_BY_ID, UPDATE_BRAND } from '../graphql/brand';

const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkxNjQ3ODMsImV4cCI6MTc0MTc1Njc4M30.w3Noq69dqXl3t2sbAfNDueQFr7IT85lXh0ln4LVM6TY';

export const BrandSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title must be of atleast 1 character'),
  active: z.boolean(),
});
export const UpdateBrandSchema = BrandSchema.omit({ id: true });

export type IBrand = z.infer<typeof BrandSchema>;

const BrandEditPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [brand, setBrand] = useState<IBrand | null>(null);

  const fetchBrand = useCallback(async () => {
    try {
      const res = await axios.post(
        'https://test-api.nine.deals/graphql',
        {
          query: FIND_BRAND_BY_ID,
          variables: {
            id,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );
      setBrand(res.data.data.findBrandById);
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [id, FIND_BRAND_BY_ID]);

  const onSubmit = async (data: IBrand) => {
    const res = await axios.post(
      'https://test-api.nine.deals/graphql',
      {
        query: UPDATE_BRAND,
        variables: {
          id,
          input: {
            title: data.title,
            active: data.active,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );
    console.log(res);
    if (!res.data.data) {
      toast.error(res.data.errors[0].message);
    } else {
      toast.success('Brand updated successfully');
      navigate('/brands');
    }
  };

  useEffect(() => {
    fetchBrand();
  }, [fetchBrand]);

  return (
    <Box sx={{ width: 700 }}>
      <Card sx={{ p: 2, m: 2 }}>
        <Typography variant='h6'>Edit Brand</Typography>
        {brand && <BrandEditForm brand={brand} onSubmit={onSubmit} />}
      </Card>
    </Box>
  );
};

export default BrandEditPage;
