import { z } from "zod";
const ProductSchema = z.object({
  id: z.string().min(1, { message: "Product Id is required" }),
  description: z
    .string()
    .min(10, { message: "Description should be of 10 characters" }),
  availability: z.enum(["available", "not-available"], {
    message: "Please select availability",
  }),
  review: z.string().min(1, { message: "Review is required" }),
  mrp: z.preprocess(
    (val) => Number(val),
    z.number().positive("MRP should be of positive number")
  ),
  dealprize: z.preprocess(
    (val) => Number(val),
    z.number().positive("DealPrize should be of positive number")
  ),
  rating: z.preprocess((val) => Number(val), z.number().min(0).max(5), {
    message: "rating must be specified",
  }),
  features: z.object({
    cheap: z.boolean().optional(),
    portable: z.boolean().optional(),
    easyToUse: z.boolean().optional(),
  }),
  category: z.string().min(1, { message: "select a category" }),
});

export type IProducts = z.infer<typeof ProductSchema>;

export default ProductSchema;
