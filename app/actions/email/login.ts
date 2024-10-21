"use server";

import moment from "moment";
import sendgrid, { MailDataRequired } from "@sendgrid/mail";

import { createClient } from "@/utils/supabase/server";

const baseUrl = process.env["NEXT_PUBLIC_APP_BASE_URL"] as string;
const sendgridApiKey = process.env["NEXT_PRIVATE_SEND_GRID_API_KEY"] as string;
const loginTemplateId = process.env[
  "NEXT_PRIVATE_SEND_GRID_LOGIN_TEMPLATE_ID"
] as string;

sendgrid.setApiKey(sendgridApiKey);

type SendLinkViaEmailType = {
  user_id: string;
  email: string;
  redirect_url: string;
  token_hash: string;
};

export async function sendLinkViaEmail({
  user_id,
  email,
  token_hash,
  redirect_url,
}: SendLinkViaEmailType) {
  const supabaseAdmin = createClient();

  try {
    const { data, error } = await supabaseAdmin
      .from("login_events")
      .insert({
        user_id,
        status: "pending",
        expires_at: moment().add(30, "minutes").toISOString(),
      })
      .select()
      .single();

    if (error) throw error?.message;

    const msg: MailDataRequired = {
      to: email,
      from: {
        email: "noreply@everesteffect.com",
        name: "Everest Effect",
      },
      templateId: loginTemplateId,
      dynamicTemplateData: {
        email,
        confirmation_link: `${baseUrl}/api/verify/login?verification_id=${data?.id}&token_hash=${token_hash}&redirect_url=${redirect_url}`,
      },
    };

    await sendgrid.send(msg);

    return {
      data: {
        ...data,
        confirmation_link: `${baseUrl}/api/verify/login?verification_id=${data?.id}&token_hash=${token_hash}&redirect_url=${redirect_url}`,
      },
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
