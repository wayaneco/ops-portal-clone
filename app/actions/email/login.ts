"use server";

import { Resend } from "resend";

import { createClient } from "@supabase/supabase-js";
import { LoginTemplate } from "@/app/components/EmailTemplate/Login";

const resendApiKey = process.env["NEXT_PUBLIC_RESEND_API_KEY"];
const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;
const baseUrl = process.env["NEXT_PUBLIC_APP_BASE_URL"] as string;

type LoginEmailType = {
  email: string;
};

export async function loginWithLink({ email }: LoginEmailType) {
  const resend = new Resend(resendApiKey);
  const supabaseAdmin = createClient(supabaseUrl, supabaseRoleKey);

  // UPDATE EMAIL TO MAILINATOR FOR TESTING PURPOSES
  // const response = await supabaseAdmin.auth.admin.updateUserById('057713da-84fc-4e93-b4d3-0fb343779785', {
  //   email: 'superuser@mailinator.com',
  //   email_confirm: true
  // })

  try {
    const { data: user_data } = await supabaseAdmin
      .from("users_data_view")
      .select("user_id")
      .eq("email", email)
      .single();

    if (!user_data) {
      return {
        data: null,
        error: "Email is not exist.",
      };
    }

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email,
    });

    if (error) throw error?.message;

    const { error: resend_error } = await resend.emails.send({
      from: "Everest Effect <noreply@everesteffect.com>",
      to: email,
      subject: "Sign-in to Everest Effect",
      react: LoginTemplate({
        email,
        confirmationLink: `${baseUrl}/verify-token?token_hash=${data?.properties?.hashed_token}`,
      }),
    });

    if (resend_error) throw resend_error?.message;

    return {
      data: true,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}
