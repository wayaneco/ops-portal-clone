import { createClient } from "@/utils/supabase/server";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(_: NextApiRequest) {
  const supabase = createClient();

  const { data } = await supabase
    .from("users_data_view")
    .select("user_id, name, email");

  return NextResponse.json(data);
}
