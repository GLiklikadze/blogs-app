import { supabase } from "../supabaseClient";

export const getBlogs = async () => {
  try {
    const { data } = await supabase.from("blogs").select("*").throwOnError();
    return data;
  } catch (err) {
    console.error("Error during get profile info:", err);
    throw err;
  }
};
