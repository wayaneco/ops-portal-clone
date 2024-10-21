import { MESSAGE_STATUS_FAILED } from "@/app/constant";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseServiceRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const formData = await request.formData();

  const messageStatus = formData.get("MessageStatus") as string;

  if (["failed", "undelivered", "bounced"].includes(messageStatus)) {
    const { error } = await supabase
      .from("preferred_contact")
      .update({
        status: MESSAGE_STATUS_FAILED,
      })
      .eq("user_id", params?.id);

    if (error) {
      return NextResponse.json({
        status: 400,
        data: error?.message,
      });
    }
  }

  return NextResponse.json({
    status: 200,
    data: "Success!",
  });
}
