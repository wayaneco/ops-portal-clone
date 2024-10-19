import { MESSAGE_STATUS_FAILED } from "@/app/constant";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseServiceRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;

export async function POST(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const emailData = await request.json();

  const { data } = await supabase
    .from("users_data_view")
    .select("user_id")
    .eq("email", emailData?.[0]?.email)
    .single();

  if (emailData?.[0]?.event === "bounce") {
    const { error } = await supabase
      .from("preferred_contact")
      .update({
        status: MESSAGE_STATUS_FAILED,
      })
      .eq("user_id", data?.user_id);

    if (error) {
      return NextResponse.json({
        status: 400,
        data: error?.message,
      });
    }
  }

  console.log("request", await request);
  console.log("BODY", await request.body);
  console.log("JSON", await request.json());

  return NextResponse.json({
    status: 200,
    data: request.body,
  });
}
