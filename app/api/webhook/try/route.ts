import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  return NextResponse.json({
    status: 200,
    data: "Congrats, It works!",
  });
}
