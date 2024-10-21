"use server";
import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import { createClient } from "@supabase/supabase-js";
import {
  ROLE_NETWORK_ADMIN,
  ROLE_COMPANY_ADMIN,
  ROLE_AGENT,
} from "@/app/constant";

const baseUrl = process.env["NEXT_PUBLIC_APP_BASE_URL"] as string;

const sendgridApiKey = process.env["NEXT_PUBLIC_SEND_GRID_API_KEY"] as string;
const inviteTemplateId = process.env[
  "NEXT_PUBLIC_SEND_GRID_INVITE_TEMPLATE_ID"
] as string;

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;

type InviteUserTypes = {
  full_name: string;
  client: string;
  role: string;
  email: string;
};

sendgrid.setApiKey(sendgridApiKey);

export async function inviteUser({
  full_name,
  client,
  role,
  email,
}: InviteUserTypes) {
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
      type: "invite",
      email,
    });

    if (error) throw error?.message;

    const msg: MailDataRequired = {
      to: email,
      from: {
        email: "noreply@everesteffect.com",
        name: "Everest Effect",
      },
      templateId: inviteTemplateId,
      dynamicTemplateData: {
        full_name,
        client,
        role,
        confirmation_link: `${baseUrl}/api/verify/invite?token_hash=${data?.properties?.hashed_token}&redirect_url=${redirect_url}`,
      },
    };

    await sendgrid.send(msg);

    return {
      data,
      error: null,
    };
  } catch (_error) {
    return {
      data: null,
      error:
        typeof _error !== "string"
          ? "Something went wrong, Please contact your administrator."
          : _error,
    };
  }
}
