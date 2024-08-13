"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";

export async function updateUserRoles(params: {
  user_id: string;
  client_id: string;
  staff_id: string;
  role_ids: Array<string>;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("update_user_roles", {
    p_user_id: params.user_id,
    p_client_id: params.client_id,
    p_roles_id: params.role_ids,
    p_is_primary_contact: false,
    staff_id: params.staff_id,
  });

  revalidateTag("user_details");
  revalidatePath("(dashboard)/user/[id]", "layout");
  if (error) {
    throw new Error("Error updating user roles.");
  }

  return data;
}
