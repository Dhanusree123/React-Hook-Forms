import { z } from "zod";

export type ProductField = {
  name: keyof IFormData;
  label: string;
  type: "text" | "number" | "radio";
  multiline?: boolean;
  rows?: number;
};

export type Product = {
  id: number;
  image: string;
  title: string;
  description: string;
  mrp: number;
  ourprice: number;
  rating: number;
  status: "active" | "inactive";
  reviews?: string[];
};

export const schema = z
  .object({
    image: z.string().nonempty("Image is required.").url("Invalid url."),
    title: z.string().min(16, "Should be at least 16 characters."),
    description: z.string().min(30, "should be at least 30 characters."),
    mrp: z.preprocess(
      (val) => Number(val),
      z.number().positive("MRP should be a positive number")
    ),
    ourprice: z.preprocess(
      (val) => Number(val),
      z.number().positive("OurPrice should be a positive number")
    ),
    status: z.enum(["active", "inactive"], {
      errorMap: () => ({ message: "Status is required" }),
    }),
    rating: z.preprocess((val) => Number(val), z.number().min(1).max(5)),
    review: z.string().optional(),
  })
  .refine((data) => data.ourprice < data.mrp, {
    message: "OurPrice should be less than MRP",
    path: ["ourprice"],
  });

export type IFormData = z.infer<typeof schema>;
