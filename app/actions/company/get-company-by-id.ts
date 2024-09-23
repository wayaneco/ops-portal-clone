import { createClient } from "@/utils/supabase/server";

export const getCompanyById = async (id: string) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("clients_data_view")
      .select()
      .eq("id", id)
      .single();

    if (error) throw error?.message;

    return data;
  } catch (error) {
    return error;
  }
};
