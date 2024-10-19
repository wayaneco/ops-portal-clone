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
  console.log("id", params.id);
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const formData = await request.formData();

  const messageStatus = formData.get("MessageStatus") as string;

  if (["failed", "undelivered", "bounced"].includes(messageStatus)) {
    const { data, error } = await supabase
      .from("preferred_contact")
      .update({
        status: MESSAGE_STATUS_FAILED,
      })
      .eq("user_id", params?.id);

    console.log("Data ===========================", data);
    console.log("Error Message ============================", error?.message);
    console.log("Error Details ============================", error?.details);
    if (error) {
      return NextResponse.json({
        status: 400,
        data: error?.message,
      });
    }
  }

  const dataObject: any = {};

  for (const [key, value] of formData.entries() as any) {
    dataObject[key] = value;
  }

  console.log("data", dataObject);

  return NextResponse.json({
    status: 200,
    data: dataObject,
  });
}
