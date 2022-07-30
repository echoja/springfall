// TODO: move to module dir

import { createClient } from "@supabase/supabase-js";

// TODO: move to config file
export function getSupabaseKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "default-github-secret";
}

// TODO: move to config file
export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || "";
}

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseKey();

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
