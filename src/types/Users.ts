import { z } from "zod";

export const userSchema = z.object({
  id: z.coerce.number(),
  email: z.string().email(),
  first_name: z.string().min(3, {message: 'Title must be at least 3 characters long.'}),
  last_name: z.string().min(3, {message: 'Title must be at least 3 characters long.'}),
  avatar: z.string(),
});

export type IUser = z.infer<typeof userSchema>;
  
  export type UserResponse = {
    data: IUser[];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };

export const NewUserSchema = userSchema.omit({
  id:true,
});

export const UpdateUserSchema = userSchema.omit({
  id: true,
  email: true,
  avatar: true,
});

export const EditUserSchema = userSchema.omit({
  id: true,
  email: true,
  last_name: true,
  avatar: true,
});

export type IEditUserSchema = z.infer<typeof EditUserSchema>;