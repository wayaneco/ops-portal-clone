"use server";

import moment from "moment";
import twilio from "twilio";

import { createClient } from "@/utils/supabase/server";

const baseUrl = process.env["NEXT_PUBLIC_APP_BASE_URL"] as string;
const twilioAccountSid = process.env[
  "NEXT_PUBLIC_TWILIO_ACCOUNT_SID"
] as string;
const twilioAuthTOken = process.env["NEXT_PUBLIC_TWILIO_AUTH_TOKEN"] as string;
const twilioMessageSid = process.env[
  "NEXT_PUBLIC_TWILIO_MESSAGE_SID"
] as string;
const twilioContentSid = process.env[
  "NEXT_PUBLIC_TWILIO_CONTENT_SID"
] as string;

type SendLinkViaSMSType = {
  user_id: string;
  email: string;
  phone_number: string;
  redirect_url: string;
  token_hash: string;
};

const client = twilio(twilioAccountSid, twilioAuthTOken);

export const sendLinkViaSMS = async ({
  user_id,
  email,
  phone_number,
  redirect_url,
  token_hash,
}: SendLinkViaSMSType) => {
  const supabase = createClient();

  try {
    const { data: login_events_data, error: login_events_error } =
      await supabase
        .from("login_events")
        .insert({
          user_id,
          status: "pending",
          expires_at: moment().add(30, "minutes").toISOString(),
        })
        .select()
        .single();

    if (login_events_error) throw login_events_error?.message;

    const response = await client.messages.create({
      to: phone_number,
      messagingServiceSid: twilioMessageSid,
      contentSid: twilioContentSid,
      contentVariables: JSON.stringify({
        email: email as string,
        confirmation_link: `${baseUrl}/api/verify/login?verification_id=${login_events_data?.id}&token_hash=${token_hash}&redirect_url=${redirect_url}`,
        expired_time: "30 minutes",
      }),
      statusCallback: `https://ops-portal-clone.vercel.app/api/webhook/sms/${user_id}`,
    });

    console.log("================================", response);

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
      error:
        typeof _error === "object"
          ? "Something went wrong. Please contact your administrator"
          : _error,
    };
  }
};
