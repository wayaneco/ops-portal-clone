import { EmailTemplate } from "@/components/EmailTemplate";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;

export async function POST(request: NextRequest) {
  const supabaseAdmin = createClient(supabaseUrl, supabaseRoleKey);
  try {
    const { data: magiclink } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: "wayaneco29@gmail.com",
    });

    const { error } = await resend.emails.send({
      from: "Everest Effect <onboarding@resend.dev>",
      to: ["wayaneco29@gmail.com"],
      subject: "You have been invited",
      react: EmailTemplate({
        fullName: "Test",
        client: "Test",
        role: "",
        password: "",
        confirmationLink: `http://localhost:3000/login?token_hash=${magiclink?.properties?.hashed_token}`,
      }),
    });
    return Response.json(
      {
        data: `http://localhost:3000/login?token_hash=${magiclink?.properties?.hashed_token}`,
      },
      { status: 500 }
    );

    // const { data, error } = await resend.emails.send({
    //   from: "Everest Effect <onboarding@resend.dev>",
    //   to: ["wayaneco29@gmail.com"],
    //   subject: "You have been invited.",
    //   react: EmailTemplate({
    //     fullName: "Bob Smith",
    //     clientName: "Everest Effect",
    //     confirmationLink: "",
    //   }),
    // });

    // if (error) {
    //   return Response.json({ error }, { status: 500 });
    // }

    // return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
