import { MESSAGE_STATUS_FAILED, MESSAGE_STATUS_VERIFIED } from "@/app/constant";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseServiceRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;

export async function GET(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { searchParams } = new URL(request.url);

  const token_hash = searchParams.get("token_hash") as string;
  const redirect_url = searchParams.get("redirect_url") as string;
  const user_id = searchParams.get("user_id") as string;

  if (!token_hash) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { error } = await supabase.auth.verifyOtp({
    token_hash,
    type: "invite",
  });

  if (!error) {
    await supabase
      .from("preferred_contact")
      .update({
        status: MESSAGE_STATUS_FAILED,
      })
      .eq("user_id", user_id);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  await supabase
    .from("preferred_contact")
    .update({
      status: MESSAGE_STATUS_VERIFIED,
    })
    .eq("user_id", user_id);

  return NextResponse.redirect(new URL(redirect_url, request.url));
}
