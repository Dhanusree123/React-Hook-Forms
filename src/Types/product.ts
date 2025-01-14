import { z } from 'zod';

export const ProductSchema = z.object({
  productId: z.string().min(1, { message: 'Product ID is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  review: z.string().min(1, { message: 'Review is required' }),
  mrp: z.coerce.number().min(1, { message: 'MRP should be a positive number' }),
  dealPrize: z.coerce
    .number()
    .min(1, { message: 'Deal Prize should be a positive number' }),
  rating: z.coerce
    .number()
    .min(1)
    .max(5, { message: 'Rating should be between 1 and 5' }),
  category: z.enum(['furniture', 'fashion', 'electricals']),
  availability: z.enum(['available', 'not-available']),
});

export const NewProductSchema = ProductSchema.omit({ productId: true });

export type IProduct = z.infer<typeof ProductSchema>;
