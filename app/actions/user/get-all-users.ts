import { createClient } from "@/utils/supabase/server";

import { ROLE_NETWORK_ADMIN } from "@/app/constant";

export const getAllUsers = async () => {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: is_role_network_admin, error: error_is_network_admin } =
      await supabase.rpc("has_admin_role", {
        p_role_name: ROLE_NETWORK_ADMIN,
        p_user_id: user?.id,
      });

    if (error_is_network_admin) throw error_is_network_admin?.message;

    const { data, error } = await supabase
      .from(
        is_role_network_admin
          ? "users_data_view"
          : "users_data_view_without_network_admin_role"
      )
      .select(`user_id, first_name, middle_name, last_name, email, clients`);

    if (error) throw error?.message;

    return data;
  } catch (error) {
    return error;
  }
};
