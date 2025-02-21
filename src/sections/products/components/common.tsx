export const generateSlug = (input: string): string => {
  if (!input) return "";
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/-+/g, "-")
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+/g, "-")
    .replace(/^-|-$/g, "");
};

export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export const transformImageUrl = (url: string, size = 300) => {
  if (!url) return "";
  console.log("Imageurl", url);
  console.log("transformImageUrl", url.split("._S")[0] + `._SY${size}_.jpg`);
  return url.split("._S")[0] + `._SY${size}_.jpg`;
};

export { nanoid as randomId } from "nanoid";
