import { z } from "zod";

export const changePassword = z.object({
    currentPassword: z.string().min(4, "Password must be at least 4 characters long"),
    newPassword: z.string().min(4, "Password must be at least 4 characters long"),
    confirmPassword: z.string().min(4, "Password must be at least 4 characters long"),
});

export type IChangePassword = z.infer<typeof changePassword>;