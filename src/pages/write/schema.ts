import { z } from "zod";

export const blogCreateSchema = z.object({
  title_ka: z.string().min(3, "Title Geo is required"),
  title_en: z.string().min(3, "Title Eng is required"),
  description_ka: z.string().min(5, " Blog content Geo is required"),
  description_en: z.string().min(5, " Blog content Eng is required"),
  image_url: z.custom<File>((file) => {
    if (!file) return false;
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const isValidType = validTypes.includes(file.type);
    return isValidType;
  }, "Invalid File. Must be an image (JPEG, PNG, GIF)"),
});
