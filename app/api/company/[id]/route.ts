import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("clients_data_view")
    .select()
    .eq("client_id", params.id)
    .single();

  if (error) {
    console.log(error);
  }

  return NextResponse.json(data);
}
