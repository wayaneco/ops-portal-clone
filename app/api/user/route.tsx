import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const { data } = await supabase
    .from("users_data_view")
    .select("user_id, name, email");

  return NextResponse.json(data);
}
