import { supabase } from "@/supabase/supabaseClient";

type profilePayload = {
  full_name: string;
  full_name_ka: string;
  avatar_url: string;
  phone_number: string;
  id: string;
};

export const fillProfileInfo = async (payload: profilePayload) => {
  return await supabase.from("profiles").upsert(payload).throwOnError();
};

export const getProfileInfo = async (id: string) => {
  const xx = await supabase.from("profiles").select("*").eq("id", id).single();
  console.log(xx);

  return xx;
};
