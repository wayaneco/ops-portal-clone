"use server";

import { Twilio } from "twilio";
import { createClient } from "@supabase/supabase-js";
import { error } from "console";

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

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;

type SendOTPViaSMS = {
  phone_number: string;
  email: string;
};

export const sendOTPViaSMS = async ({
  phone_number,
  email,
}: SendOTPViaSMS): Promise<{ data: any; error: any }> => {
  const twilio = new Twilio(twilioAccountSID, twilioAuthToken);
  const supabaseAdmin = createClient(supabaseUrl, supabaseRoleKey);

  try {
    const { data, error: generate_link_error } =
      await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email,
      });

    if (generate_link_error) throw generate_link_error?.message;

    await twilio.verify.v2.services(twilioServiceSID).verifications.create({
      to: phone_number,
      channel: "sms",
    });

    return {
      data: data?.properties,
      error: null,
    };
  } catch (_error) {
    console.log(_error);
    return {
      data: null,
      error: _error,
    };
  }
};

export const verifySMSOTP = async (phone_number: string, code: string) => {
  try {
    const twilio = new Twilio(twilioAccountSID, twilioAuthToken);

    const { status } = await twilio.verify.v2
      .services(twilioServiceSID)
      .verificationChecks.create({
        to: phone_number,
        code,
      });

    console.log(status);
    if (status === "approved") {
      return {
        data: "Approved",
        error: null,
      };
    }

    if (status === "pending") {
      return {
        data: null,
        error: "OTP is invalid or expired.",
      };
    }

    return {
      data: null,
      error: "Invalid OTP, please try again.",
    };
  } catch (_error) {
    return {
      data: null,
      error: _error,
    };
  }
};
