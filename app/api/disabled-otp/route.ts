import { createClient } from "@/utils/supabase/server";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  response: NextApiResponse
): Promise<any> {
  const supabase = createClient();
  try {
    const { error } = await supabase.rpc("disable_expired_otps");

    console.log("DELETEING USING CRON JOB");
    if (error) {
      return response.status(500).json({ error: error.message });
    }

    return response
      .status(200)
      .json({ message: "Expired OTPs disabled successfully" });
  } catch (error) {
    return error;
  }
}
