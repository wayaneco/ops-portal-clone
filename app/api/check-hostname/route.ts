import { NextRequest, NextResponse } from "next/server";

const provisionApiEnv = process.env.NEXT_PUBLIC_PROVISION_API;
const xApiKey = process.env.NEXT_PRIVATE_PROVISION_X_API_KEY;

const checkHostname = async (web_address: string) => {
  if (!xApiKey) {
    throw new Error("API key is not defined");
  }

  try {
    const response = await fetch(
      `${provisionApiEnv}/check-hostname?hostname=${web_address}`,
      {
        method: "GET",
        headers: {
          "x-api-key": xApiKey,
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Error in check hostname: ${response.status} ${response.statusText}`
      );
      throw new Error("Failed to check hostname");
    }

    const textdata = await response.text();
    return textdata === "true"; // Returns boolean directly
  } catch (error) {
    console.error("Error in checking hostname:", error);
    return false; // Handle errors by returning false
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const web_address = searchParams.get("web_address");

  if (!web_address) {
    return NextResponse.json(
      { error: "Invalid web_address parameter" },
      { status: 400 }
    );
  }

  const exists = await checkHostname(web_address);
  return NextResponse.json({ exists });
}
