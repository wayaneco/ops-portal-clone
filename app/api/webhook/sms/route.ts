import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  console.log("BODY", request.body);
  console.log("JSON", request.json());

  return NextResponse.json({
    status: 200,
    data: request.body,
  });
}
