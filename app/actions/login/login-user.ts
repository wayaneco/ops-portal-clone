"use server";

import moment from "moment";
import {
  ROLE_NETWORK_ADMIN,
  ROLE_COMPANY_ADMIN,
  ROLE_AGENT,
} from "@/app/constant";
import { createClient } from "@/utils/supabase/server";

import { cookies } from "next/headers";
import { sendOtp } from "../email/otp";

type LoginUserPayloadType = {
  email: string;
  password: string;
};

export const loginUser = async (
  payload: LoginUserPayloadType
): Promise<{ ok: boolean; message: string; data?: any }> => {
  const cookie = cookies();
  const supabase = createClient();
  let redirectPath;

  const loginInfo = {} as any;

  try {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword(payload);

    if (error) throw error?.message;

    loginInfo.id = user?.id;
    loginInfo.email = payload.email;
    loginInfo.access_token = session?.access_token;
    loginInfo.refresh_token = session?.refresh_token;

    const { data: userAuth } = await supabase
      .from("users_data_view")
      .select("clients, primary_phone")
      .eq("user_id", user?.id)
      .single();

    loginInfo.phone_number = userAuth?.primary_phone;

    // if (!userAuth?.primary_phone) {
    //   cookie.getAll().map((coo) => {
    //     cookie.delete(coo.name);
    //   });

    //   throw new Error("Phone number is invalid or missing.");
    // }

    // await supabase.auth.signInWithOtp({
    //   phone: userAuth?.primary_phone,
    //   options: {
    //     channel: "sms",
    //   },
    // });

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

    loginInfo.redirectUrl = redirectPath;

    // DELETE COOKIES AFTER LOGIN BECAUSE WE HAVE OTP
    cookie.getAll().map((ck) => {
      cookie.delete(ck?.name);
    });

    const { data: otp_code } = await supabase.rpc("generate_otp", {
      p_user_id: user?.id,
    });

    await sendOtp({
      email: payload?.email,
      otp: otp_code,
    });

    return {
      ok: true,
      message: redirectPath,
      data: loginInfo,
    };
  } catch (error) {
    return {
      ok: false,
      message: typeof error !== "string" ? "" : error,
    };
  }
};
