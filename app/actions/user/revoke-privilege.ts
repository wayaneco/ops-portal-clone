"use server";

import { revalidateTag, revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

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

  if (error) {
    return {
      isError: true,
      message: `Failed to revoke client.`,
    };
  }

  revalidateTag("user_details");
  revalidatePath("(dashboard)/user/[id]", "layout");

  return data;
}
