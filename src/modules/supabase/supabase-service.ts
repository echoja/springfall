import { createClient } from "@supabase/supabase-js";

import { getSupabaseServiceRoleKey, getSupabaseUrl } from "./supabase";
import type { Database } from "./supabase-types";

let serviceClient: ReturnType<typeof createClient<Database>> | null = null;

export function getServiceClient() {
  if (!serviceClient) {
    serviceClient = createClient<Database>(
      getSupabaseUrl(),
      getSupabaseServiceRoleKey()
    );
  }

  return serviceClient;
}
