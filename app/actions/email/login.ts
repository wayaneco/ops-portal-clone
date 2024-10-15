"use server";

import sendGrid, { MailDataRequired } from "@sendgrid/mail";

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

const sendGridApiKey = process.env["NEXT_PUBLIC_SEND_GRID_API_KEY"] as string;
const loginTemplateId = process.env[
  "NEXT_PUBLIC_SEND_GRID_LOGIN_TEMPLATE_ID"
] as string;

type LoginEmailType = {
  email: string;
};

sendGrid.setApiKey(sendGridApiKey);

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

    const currentPrivilege = user?.clients?.[0]?.privileges;

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
        redirectPath = `/user/${user?.user_id}`;
        break;
      default:
        redirectPath = "/login";
        break;
    }

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email,
    });

    if (error) throw error?.message;

    const message: MailDataRequired = {
      to: email,
      from: {
        email: "noreply@everesteffect.com",
        name: "Everest Effect",
      },
      templateId: loginTemplateId,
      dynamicTemplateData: {
        email,
        confirmation_link: `${baseUrl}/api/verify?token_hash=${data?.properties?.hashed_token}&redirect_url=${redirectPath}`,
      },
    };

    console.log(
      `${baseUrl}/api/verify?token_hash=${data?.properties?.hashed_token}&redirect_url=${redirectPath}`
    );

    await sendGrid.send(message);

    return {
      data: true,
      error: null,
    };
  } catch (_error) {
    return {
      data: null,
      error: _error,
    };
  }
}
