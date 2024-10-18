"use server";

import { createClient } from "@/utils/supabase/server";

import {
  ROLE_NETWORK_ADMIN,
  ROLE_COMPANY_ADMIN,
  ROLE_AGENT,
} from "@/app/constant";

export const verifyLogin = async (token_hash: string) => {
  try {
    const supabase = createClient();

    const {
      data: { user, session },
      error,
    } = await supabase.auth.verifyOtp({
      type: "magiclink",
      token_hash,
    });

    if (session) {
      await supabase.auth.setSession(session);
    }

    if (error) throw error?.message;

    const { data: userAuth } = await supabase
      .from("users_data_view")
      .select("clients")
      .eq("user_id", user?.id)
      .single();

    const currentPrivilege = userAuth?.clients?.[0]?.privileges;

    let redirectPath = "";

    switch (true) {
      case user && currentPrivilege?.includes(ROLE_NETWORK_ADMIN):
      case user && currentPrivilege?.includes(ROLE_COMPANY_ADMIN):
        redirectPath = "/user";
        break;
      case user && currentPrivilege?.includes(ROLE_AGENT):
        redirectPath = "/kiosk";
        break;
      case user && !currentPrivilege?.length:
        redirectPath = `/user/${user?.id}`;
        break;
      default:
        redirectPath = "/login";
        break;
    }

    return {
      ok: true,
      message: redirectPath,
    };
  } catch (error) {
    return {
      ok: false,
      message: error as string,
    };
  }
};
