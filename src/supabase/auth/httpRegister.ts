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
  // return await supabase.auth.signUp({ email, password });
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(`Sign-up failed: ${error.message}`);
    }
    console.log("Sign-up successful:", data);
    //   // If user exists, store additional information in the database
    //   if (data.user) {
    //     const { id } = data.user;

    //     const { error: profileError } = await supabase
    //       .from("profiles") // Replace 'profiles' with your table name
    //       .insert({
    //         id, // Reference the user ID
    //         full_name,
    //       });

    //     if (profileError) {
    //       throw new Error(
    //         `Failed to save profile full name: ${profileError.message}`,
    //       );
    //     }
    //     console.log("Profile saved successfully");
    //   }

    return data; // Return the entire data object if needed
  } catch (err) {
    console.error("Error during registration:", err);
    throw err; // Optionally rethrow for higher-level error handling
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
    console.error("Error during registration:", err);
    throw err;
  }
};
