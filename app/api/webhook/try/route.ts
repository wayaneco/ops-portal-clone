import { MESSAGE_STATUS_FAILED, MESSAGE_STATUS_PENDING } from "@/app/constant";
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
  // console.log("id", params.id);
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data, error } = await supabase
    .from("preferred_contact")
    .update({
      status: MESSAGE_STATUS_PENDING,
    })
    .eq("user_id", "aaa5e5eb-36dc-4a6f-b6b7-3f1b73cb401f");

  console.log({ error });

  return NextResponse.json({
    status: 200,
    data,
  });
}
