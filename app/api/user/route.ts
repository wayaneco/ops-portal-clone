import { ROLE_NETWORK_ADMIN } from "@/app/constant";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: is_role_network_admin } = await supabase.rpc("has_admin_role", {
    p_role_name: ROLE_NETWORK_ADMIN,
    p_user_id: user?.id,
  });

  const { data } = await supabase
    .from(
      is_role_network_admin
        ? "users_data_view"
        : "users_data_view_without_network_admin_role"
    )
    .select(`user_id, first_name, middle_name, last_name, email, clients`);

  return NextResponse.json(data);
}
