import { z } from "zod";

export const UserSchema = z.object({
    id:z.coerce.string(),
    first_name:z.string().min(3,"Title must be at least 3 characters long"),
    last_name:z.string().min(3,"Last name must be at least 3 characters long"),
    email:z.string().email("Email is required"),
    avatar:z.string().url("Url is required"),
})

export const NewUserSchema = UserSchema.omit({
    id:true
})

export const UpdateUserSchema = UserSchema.omit({
    id:true,
    email:true,
    avatar:true
})

export type IUser = z.infer<typeof UserSchema>