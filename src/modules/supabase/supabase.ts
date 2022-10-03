// TODO: move to module dir

import type { ContentType } from "@modules/content/types";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "./supabase-types";

// TODO: move to config file
export function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
}

// TODO: move to config file
export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
}

// TODO: move to config file
export function getSupabaseServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
}

let anonClient: ReturnType<typeof createClient<Database>> | null = null;

export const getAnonClient = () => {
  if (!anonClient) {
    anonClient = createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey());
  }

  return anonClient;
};

export type Post = Database["public"]["Tables"]["posts"]["Row"] & {
  content: ContentType;
};
