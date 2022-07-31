import { createClient } from "@supabase/supabase-js";

import type { Post } from "./supabase";
import { getSupabaseServiceRoleKey, getSupabaseUrl } from "./supabase";

export const serviceClient = createClient(
  getSupabaseUrl(),
  getSupabaseServiceRoleKey()
);

export const servicePosts = () => serviceClient.from<Post>("posts");
