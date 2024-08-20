import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("users_data_view")
    .select(`user_id, first_name, middle_name, last_name, email, clients`)
    .order("created_at", { ascending: false });

  return NextResponse.json(data);
}
