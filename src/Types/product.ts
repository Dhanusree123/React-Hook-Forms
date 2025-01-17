import { z } from 'zod';

export const ProductSchema = z.object({
  productId: z.string().min(1, { message: 'Product ID is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  review: z.string().min(1, { message: 'Review is required' }),
  mrp: z.coerce.number().gt(0,{message:"MRP must be greater than zero"}),
  dealPrice: z.coerce
    .number().gt(0,{ message: 'Deal Prize should be a positive number'}),
  rating: z.coerce
    .number()
    .gt(0,{message:"Rating should be greater than zero"})
    .max(5, { message: 'Rating should be less than 5' }),
  category: z.enum(['furniture', 'fashion', 'electricals']),
  availability: z.enum(['available', 'not-available']),
  shoppingsite: z.string().min(1,{message:"Please fill the shopping site"})
});

export const NewProductSchema = ProductSchema.omit({ productId: true }).refine((data)=>data.dealPrice<data.mrp,{
  message:"Deal prize must be lessthan MRP",
  path:["dealprize"],
});

export type IProduct = z.infer<typeof ProductSchema>;


