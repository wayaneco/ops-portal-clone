"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "utils/supabase/server";

export async function updateUserRoles(params: {
  user_id: string;
  client_id: string;
  staff_id: string;
  role_ids: Array<string>;
  is_primary_contact: boolean;
}): Promise<{ ok: boolean; message: string }> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.rpc("update_user_roles", {
      p_user_id: params.user_id,
      p_client_id: params.client_id,
      p_roles_id: params.role_ids,
      p_is_primary_contact: params?.is_primary_contact,
      staff_id: params.staff_id,
    });

    if (error) throw error?.message;

    revalidatePath("(dashboard)/user/[id]", "page");

    return {
      ok: true,
      message: "Success.",
    };
  } catch (error) {
    return {
      ok: false,
      message: error as string,
    };
  }
}
