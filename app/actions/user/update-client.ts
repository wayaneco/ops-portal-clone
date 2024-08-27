"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from "utils/supabase/server";

export async function updateUserRoles(params: {
  user_id: string;
  client_id: string;
  staff_id: string;
  role_ids: Array<string>;
  is_primary_contact: boolean;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("update_user_roles", {
    p_user_id: params.user_id,
    p_client_id: params.client_id,
    p_roles_id: params.role_ids,
    p_is_primary_contact: params?.is_primary_contact,
    staff_id: params.staff_id,
  });

  if (error) {
    return {
      isError: true,
      message: `Failed to update user roles.`,
    };
  }

  revalidateTag("user_details");
  revalidatePath("(dashboard)/user/[id]", "layout");

  return data;
}
