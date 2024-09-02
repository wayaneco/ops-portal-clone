"use server";

import {
  ROLE_NETWORK_ADMIN,
  ROLE_COMPANY_ADMIN,
  ROLE_AGENT,
} from "@/app/constant";
import { createClient } from "@/utils/supabase/server";

type LoginUserPayloadType = {
  email: string;
  password: string;
};

export const loginUser = async (
  payload: LoginUserPayloadType
): Promise<{ ok: boolean; message: string }> => {
  const supabase = createClient();
  let redirectPath;

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword(payload);

    if (error) throw error?.message;

    const { data: userAuth } = await supabase
      .from("users_data_view")
      .select("clients")
      .eq("user_id", user?.id)
      .single();

    const currentPrivilege = userAuth?.clients?.[0]?.privileges;

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
      message: typeof error !== "string" ? "" : error,
    };
  }
};
