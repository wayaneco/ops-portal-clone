import { createClient } from "@/utils/supabase/server";

export const getAllCompany = async () => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("clients")
      .select(
        "id, name, logo_url, provisioning_status, created_at, web_address"
      )
      .eq("is_enabled", true)
      .order("created_at", { ascending: false });

    if (error) throw error?.message;

    return data;
  } catch (error) {
    return error;
  }
};
