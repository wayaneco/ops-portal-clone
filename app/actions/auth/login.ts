"use server";

import {
  ROLE_NETWORK_ADMIN,
  ROLE_COMPANY_ADMIN,
  ROLE_AGENT,
  MESSAGE_STATUS_FAILED,
} from "@/app/constant";
import { createClient } from "@supabase/supabase-js";
import { sendLinkViaEmail } from "../email/login";
import { sendLinkViaSMS } from "../sms/login";

type LoginUserPayloadType = {
  email: string;
  preferred_contact: string;
};

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;

export const loginUser = async ({ email }: LoginUserPayloadType) => {
  const supabaseAdmin = createClient(supabaseUrl, supabaseRoleKey);

  try {
    const { data: user } = await supabaseAdmin
      .from("users_data_view")
      .select("user_id, clients, primary_phone") // TODO: Add Preferred Contact
      .eq("email", email)
      .single();

    if (!user) {
      return {
        data: null,
        error: "Email is not exist.",
      };
    }

    const { data: preferred_contact_data } = await supabaseAdmin
      .from("preferred_contact")
      .select("status")
      .eq("user_id", user?.user_id)
      .single();

    if (preferred_contact_data?.status === MESSAGE_STATUS_FAILED) {
      return {
        data: null,
        error: "PREFERRED_CONTACT_ERROR",
      };
    }

    const currentPrivilege = user?.clients?.reduce(
      (accumulator: Array<string>, current: any) => {
        return accumulator.concat(current.privileges);
      },
      []
    );

    let redirect_url = "";

    switch (true) {
      case user && currentPrivilege?.includes(ROLE_NETWORK_ADMIN):
      case user && currentPrivilege?.includes(ROLE_COMPANY_ADMIN):
        redirect_url = "/user";
        break;
      case user && currentPrivilege?.includes(ROLE_AGENT):
        redirect_url = "/kiosk";
        break;
      case user && !currentPrivilege?.length:
        redirect_url = `/user/${user?.user_id}`;
        break;
      default:
        redirect_url = "/login";
        break;
    }

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email,
    });

    if (error) throw error?.message;

    let preferred_contact = "SMS"; // TODO: Adto ni kuhaon sa users_data_view nga table, uWu

    if (preferred_contact === "EMAIL") {
      const response = await sendLinkViaEmail({
        user_id: user?.user_id,
        email,
        token_hash: data?.properties?.hashed_token,
        redirect_url,
      });

      return response;
    } else if (preferred_contact === "SMS") {
      const response = await sendLinkViaSMS({
        phone_number: user?.primary_phone,
        user_id: user?.user_id,
        email,
        token_hash: data?.properties?.hashed_token,
        redirect_url,
      });

      return response;
    } else {
      return {
        data: null,
        error: null,
      };
    }
  } catch (_error) {
    return {
      data: null,
      error:
        typeof _error !== "string"
          ? "Something went wrong, Please contact your administrator."
          : _error,
    };
  }
};
