import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase.types";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// supabase.from("profiles");
// npx supabase gen types --lang=typescript --project-id pevzgtuhzcfkwemahcqa --schema public > src/supabase/supabase.types.ts
