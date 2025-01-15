import { z } from "zod";

export const ProductSchema = z
  .object({
    id: z.string(),
    image: z.string().nonempty("Image is required.").url("Invalid url."),
    title: z.string().min(16, "Should be at least 16 characters."),
    description: z.string().min(30, "should be at least 30 characters."),
    mrp: z.coerce.number().positive("MRP should be a positive number"),
    ourprice: z.coerce.number().positive("OurPrice should be a positive number"),
    status: z.enum(["active", "inactive"], {
      errorMap: () => ({ message: "Status is required" }),
    }),
    rating: z.coerce.number().min(1).max(5),
    review: z.string().optional(),
    selectfield: z.string().nonempty("This field is required."),
  })

export const NewProductSchema = ProductSchema.omit({id: true}).refine((data) => data.ourprice < data.mrp, {
  message: "OurPrice should be less than MRP",
  path: ["ourprice"],
});

export type IProduct = z.infer<typeof ProductSchema>;
