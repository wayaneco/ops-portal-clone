import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import getNodeSDK from "@/utils/corbado/nodeSdk";
import { UserService } from "@/utils/supabase/services";

import { updateSession } from "utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  await updateSession(request);
}

export const config = {
  matcher: [
    /**
     * add more routes you want to be protected
     */
    "/((?!|auth|login).{1,})",
    "/notes/:path*",
  ],
};
