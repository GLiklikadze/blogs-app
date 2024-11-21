import { supabase } from "@/supabase/supabaseClient";

type httpRegisterProps = {
  email: string;
  password: string;
  // full_name: string;
};

export const register = async ({
  email,
  password,
  // full_name,
}: httpRegisterProps) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(`Sign-up failed: ${error.message}`);
    }
    console.log("Sign-up successful:", data);
    return data;
  } catch (err) {
    console.error("Error during registration:", err);
    throw err;
  }
};

export const login = async ({ email, password }: httpRegisterProps) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(`Sign-in failed: ${error.message}`);
    }
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error during Sign In:", err);
    throw err;
  }
};
export const logOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(`Log out failed: ${error.message}`);
    }
  } catch (err) {
    console.error("Error during Log out:", err);
    throw err;
  }
};
