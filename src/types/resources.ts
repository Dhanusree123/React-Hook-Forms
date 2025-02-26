import { z } from "zod";

export const resourcesSchema = z.object({
    id: z.coerce.number().gt(0, "Number must be greater than zero."),
    name: z.string().min(4 ,"Password must be at least 4 characters long."),
    pantone_value: z.string().min(2 ,"Password must be at least 2 characters long"),
    year: z.coerce.number().gt(0, "Number must be greater than zero."),
    color: z.string().min(3, "Password must be at least 3 characters long"),
})

export type IResource = z.infer<typeof resourcesSchema>;