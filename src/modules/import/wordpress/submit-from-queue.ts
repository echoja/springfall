import { getServiceClient } from "@modules/supabase/supabase-service";

export default async function submitFromQueue(id: string) {
  const importing = await getServiceClient()
    .from("import_queue")
    .select("*")
    .eq("id", id)
    .single();

  const { data } = importing;
  if (!data) {
    throw new Error("No Data");
  }
}
