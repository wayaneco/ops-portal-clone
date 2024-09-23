import { createClient } from "@/utils/supabase/server";

export const getAllCompany = async (sortByName = false) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("clients_data_view")
      .select(
        "id, name, lower_name, logo_url, provisioning_status, created_at, web_address"
      )
      .eq("is_enabled", true)
      .order(sortByName ? "lower_name" : "created_at", {
        ascending: sortByName,
      });

    if (error) throw error?.message;

    return data;
  } catch (error) {
    return error;
  }
};
