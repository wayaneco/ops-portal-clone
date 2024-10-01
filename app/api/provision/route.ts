import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

const provisionApiEnv = process.env.NEXT_PUBLIC_PROVISION_API;
const xApiKey = process.env.NEXT_PRIVATE_PROVISION_X_API_KEY;

const provision = async (web_address: string) => {
  if (!xApiKey) {
    throw new Error("API key is not defined");
  }

  try {
    const response = await fetch(`${provisionApiEnv}/provision`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xApiKey as string,
      },
      body: JSON.stringify({
        name: `${web_address}-execution-${moment()
          .format("MMM-DD-YYYY-HH-mm-SS")
          .toLowerCase()}`,
        input: `{"hostname": "${web_address}", "build_id": "${web_address}_${web_address}_v.1.0.0_dev"}`,
      }),
    });

    if (!response.ok) {
      console.error(
        `Error fetching request: ${response.status} ${response.statusText}`
      );
      throw new Error("Failed to fetch request");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in provisioning:", error);
    return [];
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

  const data = await provision(web_address);
  return NextResponse.json(data);
}
