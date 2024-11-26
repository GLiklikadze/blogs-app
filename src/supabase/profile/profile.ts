import { supabase } from "@/supabase/supabaseClient";
import { profilePayload } from "./profile.types";

export const fillProfileInfo = async (payload: profilePayload) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert(payload)
      .throwOnError();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (err) {
    console.error("Error during updating profile info:", err);
    throw err;
  }
};

export const getProfileInfo = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (err) {
    console.error("Error during get profile info:", err);
    throw err;
  }
};
