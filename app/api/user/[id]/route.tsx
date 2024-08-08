import { createClient } from "@/utils/supabase/client";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const { data } = supabase
    .from("users_data_view")
    .select("*")
    .eq("id", params.id)
    .single();

  console.log({ data });
  return NextResponse.json(data);
}
