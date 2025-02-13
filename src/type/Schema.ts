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
  toggleTheme: () => void;
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