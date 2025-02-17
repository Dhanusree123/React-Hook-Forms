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
