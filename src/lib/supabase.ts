// TODO: move to module dir

import { createClient } from "@supabase/supabase-js";

import type { definitions } from "./supabase-types";
import type { ContentType } from "./types";

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

export const anonClient = createClient(getSupabaseUrl(), getSupabaseAnonKey());

export type Post = definitions["posts"] & {
  content: ContentType;
};

export const anonPosts = () => anonClient.from<Post>("posts");
