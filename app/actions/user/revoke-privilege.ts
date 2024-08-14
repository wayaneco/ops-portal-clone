"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function revokePrivilege(params: {
  user_id: string;
  client_id: string;
  staff_id: string;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("revoke_all_user_roles", {
    p_user_id: params.user_id,
    p_client_id: params.client_id,
    staff_id: params.staff_id,
  });

  revalidateTag("user_details");
  revalidatePath("(dashboard)/user/[id]", "layout");

  if (error) {
    throw new Error("Error revoking roles.");
  }

  return data;
}
