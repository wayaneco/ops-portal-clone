import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("id", params.id);
  const supabase = createClient();

  // {
  //   "SmsMessageSid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  //   "SmsSid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  //   "SmsStatus": "received",
  //   "MessageStatus": "received",
  //   "To": "+1234567890",
  //   "From": "+0987654321",
  //   "Body": "Hello, World!",
  //   "AccountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  //   "ApiVersion": "2010-04-01"
  // }

  console.log("request", await request);
  console.log("BODY", await request.body);
  console.log("JSON", await request.json());

  return NextResponse.json({
    status: 200,
    data: request.body,
  });
}
