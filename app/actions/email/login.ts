"use server";

import moment from "moment";
import sendgrid, { MailDataRequired } from "@sendgrid/mail";

import { createClient } from "@/utils/supabase/server";

const baseUrl = process.env["NEXT_PUBLIC_APP_BASE_URL"] as string;
const sendgridApiKey = process.env["NEXT_PUBLIC_SEND_GRID_API_KEY"] as string;
const loginTemplateId = process.env[
  "NEXT_PUBLIC_SEND_GRID_LOGIN_TEMPLATE_ID"
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
    const { data: login_events_data, error: login_events_error } =
      await supabaseAdmin
        .from("login_events")
        .insert({
          user_id,
          status: "pending",
          expires_at: moment().add(30, "minutes").toISOString(),
        })
        .select()
        .single();

    if (login_events_error) throw login_events_error?.message;

    const msg: MailDataRequired = {
      to: email,
      from: {
        email: "noreply@everesteffect.com",
        name: "Everest Effect",
      },
      templateId: loginTemplateId,
      dynamicTemplateData: {
        email,
        confirmation_link: `${baseUrl}/api/verify/login?verification_id=${login_events_data?.id}&token_hash=${token_hash}&redirect_url=${redirect_url}`,
      },
    };

    const [response] = await sendgrid.send(msg);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log("Success!");
    }

    return {
      data: {
        ...login_events_data,
        confirmation_link: `${baseUrl}/api/verify/login?verification_id=${login_events_data?.id}&token_hash=${token_hash}&redirect_url=${redirect_url}`,
      },
      error: null,
    };
  } catch (_error) {
    return {
      data: null,
      error: _error,
    };
  }
}
