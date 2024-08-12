import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();

  console.log("++++++++++++++++++++++++++++++++++++++++");
  const { data } = await supabase
    .from("users_data_view")
    .select("*")
    .eq("id", params.id)
    .single();

  return NextResponse.json(data);
}
