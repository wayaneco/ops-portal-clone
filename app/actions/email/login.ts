"use server";

import { createClient } from "@supabase/supabase-js";
import {
  ROLE_NETWORK_ADMIN,
  ROLE_COMPANY_ADMIN,
  ROLE_AGENT,
} from "@/app/constant";

const baseUrl = process.env["NEXT_PUBLIC_APP_BASE_URL"] as string;

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;

type LoginEmailType = {
  email: string;
};

export async function loginWithLink({ email }: LoginEmailType) {
  const supabaseAdmin = createClient(supabaseUrl, supabaseRoleKey);

  try {
    const { data: user } = await supabaseAdmin
      .from("users_data_view")
      .select("user_id, clients")
      .eq("email", email)
      .single();

    if (!user) {
      return {
        data: null,
        error: "Email is not exist.",
      };
    }

    const currentPrivilege = user?.clients?.reduce(
      (accumulator: Array<string>, current: any) => {
        return accumulator.concat(current.privileges);
      },
      []
    );

    let emailRedirectTo = "";

    switch (true) {
      case user && currentPrivilege?.includes(ROLE_NETWORK_ADMIN):
      case user && currentPrivilege?.includes(ROLE_COMPANY_ADMIN):
        emailRedirectTo = "/user";
        break;
      case user && currentPrivilege?.includes(ROLE_AGENT):
        emailRedirectTo = "/kiosk";
        break;
      case user && !currentPrivilege?.length:
        emailRedirectTo = `/user/${user?.user_id}`;
        break;
      default:
        emailRedirectTo = "/login";
        break;
    }

    const { data, error } = await supabaseAdmin.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo,
      },
    });

    if (error) throw error?.message;

    return {
      data,
      error: null,
    };
  } catch (_error) {
    return {
      data: null,
      error: _error,
    };
  }
}
