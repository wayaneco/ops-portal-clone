import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

const provisionApiEnv = process.env.NEXT_PUBLIC_PROVISION_API;
const xApiKey = process.env.NEXT_PRIVATE_PROVISION_X_API_KEY;
const bucketName = process.env.NEXT_PUBLIC_PROVISION_BUCKET_NAME;

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
        console.error(`Error fetching hostname: ${response.status} ${response.statusText}`);
        throw new Error("Failed to fetch hostname");
      }
  
      const data = await response.json();
      return data || {};
    } catch (error) {
      console.error("Error in getInitialLogs:", error);
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

  const data = await checkHostname(web_address);
  return NextResponse.json(data);
}