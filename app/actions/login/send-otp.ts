"use server";

import {
  ROLE_NETWORK_ADMIN,
  ROLE_COMPANY_ADMIN,
  ROLE_AGENT,
} from "@/app/constant";
import { createClient } from "@/utils/supabase/server";

import { sendOTPViaEmail } from "../email/send-otp-email";
import { sendOTPViaSMS } from "../email/send-otp-sms";
import { ClientsType } from "@/app/types";

type SendOTPType = {
  email: string;
  type: "sms" | "email";
};

export const sendOTP = async ({
  email,
  type = "email",
}: SendOTPType): Promise<{ data: any; error: any }> => {
  const supabase = createClient();

  const loginInformation = {} as any;

  try {
    const { data, error: user_error } = await supabase
      .from("users_data_view")
      .select("user_id, clients, email, primary_phone")
      .eq("email", email)
      .single();

    if (user_error) throw `Email does not exist.`;

    const user = data! as {
      user_id: string;
      primary_phone: string;
      clients: Array<ClientsType>;
    };

    loginInformation.type = type;
    loginInformation.email = email;
    loginInformation.id = user?.user_id;
    loginInformation.phone_number = user?.primary_phone;

    const currentPrivilege = user?.clients?.[0]?.privileges;

    switch (true) {
      case user && currentPrivilege?.includes(ROLE_NETWORK_ADMIN):
      case user && currentPrivilege?.includes(ROLE_COMPANY_ADMIN):
        loginInformation.redirectUrl = "/user";
        break;
      case user && currentPrivilege?.includes(ROLE_AGENT):
        loginInformation.redirectUrl = "/kiosk";
        break;
      case user && !currentPrivilege?.length:
        loginInformation.redirectUrl = `/user/${user?.user_id}`;
        break;
      default:
        loginInformation.redirectUrl = "/login";
        break;
    }

    const { data: otp_code } = await supabase.rpc("generate_otp", {
      p_user_id: user?.user_id,
    });

    if (type === "email") {
      const { data, error: send_otp_error } = await sendOTPViaEmail({
        email: email,
        code: otp_code,
      });

      if (send_otp_error) throw send_otp_error;

      loginInformation.token_hash = data?.hashed_token;
    } else {
      const { data, error: send_sms_error } = await sendOTPViaSMS({
        email,
        phone_number: user?.primary_phone,
        code: otp_code,
      });

      if (send_sms_error) throw send_sms_error?.message;

      loginInformation.token_hash = data?.hashed_token;
    }

    return {
      data: loginInformation,
      error: null,
    };
  } catch (_error) {
    return {
      data: null,
      error: _error,
    };
  }
};
