import { z } from 'zod';

export const Schema = z.object({
  image: z.any().optional(),
  title: z.string().min(2, 'Title must be at least 2 characters'),
});

export type BrandFormData = z.infer<typeof Schema>;

export type Brand = {
  id: string;
  title: string;
  active: boolean;
};

export type BrandsPageProps = {
  mode: "light" | "dark";
};

export const EditSchema = z.object({
  image: z.any().optional(),
  id: z.string(),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  active: z.boolean(),
})

export type Edit = z.infer<typeof EditSchema>;

export type DeleteBrandProps = {
  id: string;
  onDeleteSuccess: () => void;
};

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;

export const productSchema = z.object({
  id: z.string().min(1).optional(),
  //images: z.array(z.string().url()).min(1),
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  slug: z.string().min(16, 'URL Slug must be longer than 16 characters.').optional(),
  description: z.string().min(32, 'Description is required'),
  mrp: z.coerce.number().gt(0, 'MRP must be greater than 0.'),
  listPrice: z.coerce.number().gt(0, 'List price must be greater than 0.'),
  dealPrice: z.coerce.number().gt(0, 'Deal price must be greater than 0.'),
  code: z.string().min(1, 'CODE is required.'),
  //brand: z.string().min(1, 'Brand is required').optional(),
  //category: z.string().min(1, 'Category is required').optional(),
  //store: z.string().min(1, 'Store is required').optional(),
  rating: z.coerce.number().optional(),
  reviews: z.coerce.number().optional(),
  active: z.boolean().optional(),
});

export type IProductFormData = z.infer<typeof productSchema>;

export type Product = {
  id: string;
  title: string;
  brand: string;
  dealPrice: number;
  listPrice: number;
  mrp: number;
}