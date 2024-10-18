import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  console.log("request", await request);
  console.log("BODY", await request.body);
  console.log("JSON", await request.json());

  return NextResponse.json({
    status: 200,
    data: request.body,
  });
}
