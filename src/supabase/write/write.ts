import { supabase } from "../supabaseClient";

export const getBlogs = async (searchText: string = "") => {
  try {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .like("title_en", `%${searchText}%`)
      .throwOnError();
    return data || [];
  } catch (err) {
    console.error("Error during get profile info:", err);
    throw err;
  }
};
// export const Blogs = async (searchText: string = "") => {
//   try {
//     const { data } = await supabase
//       .from("blogs")
//       .select("*")
//       .like("title_en", `%${searchText}%`)
//       .throwOnError();
//     return data;
//   } catch (err) {
//     console.error("Error during get profile info:", err);
//     throw err;
//   }
// };
export type writeBlogFormValues = {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  image_url: null | File;
};

export const postBlogs = async ({
  formValues,
  id,
}: {
  formValues: writeBlogFormValues;
  id: string;
}) => {
  try {
    const imageRes = await supabase.storage
      .from("blog_images")
      .upload(
        formValues.image_url?.name as string,
        formValues?.image_url as File,
      );

    if (imageRes.error) {
      throw new Error(`Image upload failed: ${imageRes.error.message}`);
    }

    const { data, error } = await supabase.from("blogs").insert({
      title_ka: formValues.title_ka,
      title_en: formValues.title_en,
      description_en: formValues.description_en,
      description_ka: formValues.description_ka,
      image_url: imageRes.data?.fullPath,
      user_id: id,
    });

    if (error) {
      throw new Error(`Blog insertion failed: ${error.message}`);
    }
    console.log("Created blog", data);
  } catch (err) {
    console.error("Error during post blog:", err);
    throw err;
  }
};
