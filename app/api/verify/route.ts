import { createClient } from "@/utils/supabase/server";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);

  const verification_id = searchParams.get("verification_id") as string;
  const token_hash = searchParams.get("token_hash") as string;
  const redirect_url = searchParams.get("redirect_url") as string;

  if (!token_hash) return NextResponse.redirect(new URL("/login", request.url));

  const { data: get_event_data, error: get_event_error } = await supabase
    .from("login_events")
    .select("expires_at")
    .eq("id", verification_id)
    .single();

  if (moment().isAfter(moment(get_event_data?.expires_at)) || get_event_error) {
    // EXPIRED VERIFICATION_ID
    return NextResponse.redirect(new URL(`/verify/failed`, request.url));
  }

  await supabase
    .from("login_events")
    .update({
      status: "verified",
      data: {
        token_hash,
        redirect_url,
      },
    })
    .eq("id", verification_id);

  return NextResponse.redirect(new URL(`/verify/success`, request.url));
}
