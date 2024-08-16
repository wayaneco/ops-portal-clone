"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("clients")
    .select("id, name, logo_url");

  if (error) {
    throw new Error(error.message);
  }

  return NextResponse.json(data);
}
