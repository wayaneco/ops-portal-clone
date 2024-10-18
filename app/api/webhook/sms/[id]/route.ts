import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("id", params.id);
  const supabase = createClient();

  const formData = await request.formData();

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
