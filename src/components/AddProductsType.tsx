import { z } from "zod";

type ProductField = {
  name: keyof FormData;
  label: string;
  type: "text" | "number" | "radio";
  multiline?: boolean;
  rows?: number;
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

type FormData = z.infer<typeof schema>;

export const products: ProductField[] = [
  { name: "image", label: "Image URL", type: "text" },
  { name: "title", label: "Title", type: "text" },
  {
    name: "description",
    label: "Description",
    type: "text",
    multiline: true,
    rows: 3,
  },
  { name: "mrp", label: "MRP", type: "number" },
  { name: "ourprice", label: "Our Price", type: "number" },
  { name: "rating", label: "Rating", type: "number" },
  { name: "review", label: "Review", type: "text", multiline: true, rows: 3 },
];
