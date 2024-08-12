"use server";

import { NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";

export async function addClient(params: {
  user_id: string;
  client_id: string;
  role_ids: Array<string>;
}) {
  "use server";

  const supabase = createClient();

  const { data, error } = await supabase.rpc("update_user_roles", {
    p_client_id: params.client_id,
    p_is_primary_contact: false,
    p_roles_id: params.role_ids,
    p_user_id: params.user_id,
  });

  if (error) {
    throw new Error("Error updating user roles.");
  }

  return data;
}
