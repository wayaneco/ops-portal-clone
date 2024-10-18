import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);

  const token_hash = searchParams.get("token_hash") as string;
  const redirect_url = searchParams.get("redirect_url") as string;

  if (!token_hash) return NextResponse.redirect(new URL("/login", request.url));

  const { error } = await supabase.auth.verifyOtp({
    token_hash,
    type: "invite",
  });

  if (!error) return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.redirect(new URL(redirect_url, request.url));
}
