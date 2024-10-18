"use server";

import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import {
  ROLE_NETWORK_ADMIN,
  ROLE_COMPANY_ADMIN,
  ROLE_AGENT,
} from "@/app/constant";
import { createClient } from "@supabase/supabase-js";
import moment from "moment";

type LoginUserPayloadType = {
  email: string;
  preferred_contact: string;
};

const baseUrl = process.env["NEXT_PUBLIC_APP_BASE_URL"] as string;
const sendgridApiKey = process.env["NEXT_PUBLIC_SEND_GRID_API_KEY"] as string;
const loginTemplateId = process.env[
  "NEXT_PUBLIC_SEND_GRID_LOGIN_TEMPLATE_ID"
] as string;

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;

sendgrid.setApiKey(sendgridApiKey);

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

    const { data: login_events_data, error: login_events_error } =
      await supabaseAdmin
        .from("login_events")
        .insert({
          user_id: user?.user_id,
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
        confirmation_link: `${baseUrl}/api/verify?verification_id=${login_events_data?.id}&token_hash=${data?.properties?.hashed_token}&redirect_url=${redirect_url}`,
      },
    };

    const [response] = await sendgrid.send(msg);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log("Success!");
    }

    // const { data, error } = await supabaseAdmin.auth.signInWithOtp({
    //   ...((preferred_contact === "email" && {
    //     email,
    //     options: {
    //       emailRedirectTo: `${baseUrl}/${emailRedirectTo}`,
    //       data: {
    //         full_name: "Wayan Danyael Eco",
    //       },
    //     },
    //   }) as any),
    //   ...((preferred_contact === "sms" && {
    //     phone: user?.primary_phone,
    //     options: {
    //       channel: "sms",
    //       emailRedirectTo,
    //     },
    //   }) as any),
    // });

    // if (error) throw error?.message;

    return {
      data: {
        ...login_events_data,
        confirmation_link: `${baseUrl}/api/verify?verification_id=${login_events_data?.id}&token_hash=${data?.properties?.hashed_token}&redirect_url=${redirect_url}`,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: typeof error !== "string" ? "Something went wrong" : error,
    };
  }
};
