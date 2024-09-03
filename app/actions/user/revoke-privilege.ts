"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export async function revokePrivilege(params: {
  user_id: string;
  client_id: string;
  staff_id: string;
}): Promise<{ ok: boolean; message: string }> {
  const supabase = createClient();
  try {
    const { error } = await supabase.rpc("revoke_all_user_roles", {
      p_user_id: params.user_id,
      p_client_id: params.client_id,
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
