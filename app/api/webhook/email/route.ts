import { MESSAGE_STATUS_FAILED } from "@/app/constant";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] as string;
const supabaseServiceRoleKey = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
] as string;

export async function POST(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  // SENDGRID REQUEST BODY
  // request.json()
  // [
  //   {
  //     email: 'wayaneco29@gmail.com',
  //     event: 'delivered',
  //     ip: '149.72.126.143',
  //     response: '250 2.0.0 OK  1729256262 af79cd13be357-7b15700e5b1si178571785a.742 - gsmtp',
  //     sg_event_id: 'ZGVsaXZlcmVkLTAtNDc1MDQzNjgtTWg3LWZhbzVRaGk4RmFpOGhNeGkzQS0w',
  //     sg_message_id: 'Mh7-fao5Qhi8Fai8hMxi3A.recvd-76b48cd7f5-dpk42-1-67125B46-1.0',
  //     sg_template_id: 'd-9548ca682e2247d5aad7c162d0273dd1',
  //     sg_template_name: 'Login V1',
  //     'smtp-id': '<Mh7-fao5Qhi8Fai8hMxi3A@geopod-ismtpd-17>',
  //     timestamp: 1729256262,
  //     tls: 1
  //   }
  // ]

  const emailData = await request.json();

  const { data } = await supabase
    .from("users_data_view")
    .select("user_id")
    .eq("email", emailData?.[0]?.email)
    .single();

  if (emailData?.[0]?.event === "bounce") {
    const { error } = await supabase
      .from("preferred_contact")
      .update({
        status: MESSAGE_STATUS_FAILED,
      })
      .eq("user_id", data?.user_id);

    if (error) {
      return NextResponse.json({
        status: 400,
        data: error?.message,
      });
    }
  }

  console.log("request", await request);
  console.log("BODY", await request.body);
  console.log("JSON", await request.json());

  return NextResponse.json({
    status: 200,
    data: request.body,
  });
}
