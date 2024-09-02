import { createClient } from "@/utils/supabase/server";

export const getUserById = async (id: string) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("users_data_view")
      .select()
      .eq("user_id", id)
      .single();

    if (error) throw error?.message;

    return data;
  } catch (error) {
    return error;
  }
};
