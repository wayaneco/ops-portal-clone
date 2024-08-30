import { NextRequest } from "next/server";

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
