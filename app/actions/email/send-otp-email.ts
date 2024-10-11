"use server";

import { Resend } from "resend";

import { createClient } from "@supabase/supabase-js";
import { OTPEmailTemplate } from "@/app/components/EmailTemplate/otp";
import { Twilio } from "twilio";

const twilioAccountSID = process.env[
  "NEXT_PUBLIC_TWILIO_ACCOUNT_SID"
] as string;
const twilioAuthToken = process.env["NEXT_PUBLIC_TWILIO_AUTH_TOKEN"] as string;
const twilioServiceSID = process.env[
  "NEXT_PUBLIC_TWILIO_SERVICE_SID"
] as string;
const twilioMessageSID = process.env[
  "NEXT_PUBLIC_TWILIO_MESSAGE_SID"
] as string;
const resendApiKey = process.env["NEXT_PUBLIC_RESEND_API_KEY"] as string;

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;

type SendOTPViaEmail = {
  email: string;
  code: string;
};

export async function sendOTPViaEmail({ email, code }: SendOTPViaEmail) {
  const resend = new Resend(resendApiKey);
  const twilio = new Twilio(twilioAccountSID, twilioAuthToken);
  const supabaseAdmin = createClient(supabaseUrl, supabaseRoleKey);

  try {
    const { data, error: generate_link_error } =
      await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email,
      });

    if (generate_link_error) throw generate_link_error?.message;

    // console.log({ data });
    // const response = await twilio.verify.v2
    //   .services(twilioServiceSID)
    //   .verifications.create({
    //     to: email,
    //     channel: "email",
    //   });

    const { error } = await resend.emails.send({
      from: "Everest Effect <noreply@everesteffect.com>",
      to: email,
      subject: "One-Time Password (OTP)",
      react: OTPEmailTemplate({
        email,
        code,
      }),
    });

    if (error) throw error?.message;

    return {
      data: data?.properties,
      error: null,
    };
  } catch (_error) {
    console.log({ _error });
    return {
      data: null,
      error: _error,
    };
  }
}
