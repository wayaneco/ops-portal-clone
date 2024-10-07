"use server";

import { Resend } from "resend";

import { InviteEmailTemplate } from "@/app/components/EmailTemplate/invite";
import { createClient } from "@supabase/supabase-js";

const resendApiKey = process.env["NEXT_PUBLIC_RESEND_API_KEY"];
const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;
const baseUrl = process.env["NEXT_PUBLIC_APP_BASE_URL"] as string;

type InviteUserTypes = {
  fullName: string;
  client: string;
  role: string;
  email: string;
  password: string;
};

export async function inviteUser({
  fullName,
  client,
  role,
  email,
  password,
}: InviteUserTypes) {
  const resend = new Resend(resendApiKey);
  const supabaseAdmin = createClient(supabaseUrl, supabaseRoleKey);
  try {
    const { data, error: generate_link_error } =
      await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email,
      });

    if (generate_link_error) throw generate_link_error?.message;

    const { error } = await resend.emails.send({
      from: "Everest Effect <noreply@everesteffect.com>",
      to: email,
      subject: "You have been invited",
      react: InviteEmailTemplate({
        email,
        fullName,
        client,
        role,
        password,
        confirmationLink: `${baseUrl}/login`,
      }),
    });

    if (error) throw error?.message;

    return {
      ok: true,
      message: "Success",
    };
  } catch (error) {
    return {
      ok: false,
      message: error,
    };
  }
}
