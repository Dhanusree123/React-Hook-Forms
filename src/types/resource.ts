import { z } from "zod";

export const ResourceSchema = z.object({
    id:z.coerce.number().min(1,"Id is required"),
    name:z.string().min(1,"Name is required"),
    year:z.coerce.number().min(1,"Year is required"),
    color:z.string().min(1,"Color is required"),
    pantone_value:z.string().min(1,"Pantone Value is required"),
})



export type IResource = z.infer<typeof ResourceSchema>