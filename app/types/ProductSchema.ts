'use client'
import { z } from "zod";

export const ProductSchema = z
  .object({
    productId:z.string().min(1,{message:"Product Id is required"}),
    productTitle: z.string().min(1, "Product title is required"),
    productDescription: z.string().min(1, "Product description is required"),
    reviews: z.coerce.number().gte(0, "Reviews must be 0 or more"),
    mrp: z.coerce.number().gt(0, "MRP must be greater than 0"),
    dealPrice: z.coerce.number().gt(0, "Deal price must greater than 0"),
    rating: z.coerce
      .number()
      .gt(0, "Rating must be greater than 0")
      .max(5, "Rating must be less than 5"),
    shoppingSite: z.enum([
        "select a shopping site",
      "amazon",
      "flipkart",
      "shopsy",
      "meesho",
      "instagram",
    ]),
  });

  export const NewProductSchema = ProductSchema.omit({productId:true})
  .refine((data)=>data.dealPrice<data.mrp,
  {message:"Dealprice must be less than mrp"})
  

export type ProductFormData = z.infer<typeof ProductSchema>;