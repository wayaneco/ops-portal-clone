import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import getNodeSDK from "@/utils/corbado/nodeSdk";
import { UserService } from "@/utils/supabase/services";

import { updateSession } from "utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  /**
   * @TODO: make this more efficient
   * Local checking of cbo_short_session is faster @ 1MS as this is just a regular JWT token
   */

  // TODO
  // const session = request.cookies.get("cbo_short_session");
  // if (!session) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // const sdk = getNodeSDK();
  // let corbadoUser: any;
  // try {
  //   corbadoUser = await sdk.sessions().getCurrentUser(session.value);
  //   console.log("corbado user", corbadoUser);
  //   if (!corbadoUser.isAuthenticated()) {
  //     throw Error;
  //   }

  //   const supabaseUser = await UserService.findByEmail(corbadoUser.getEmail());
  //   const supabaseUserId = supabaseUser?.id;
  //   console.log("supabaseUser", supabaseUser);
  //   if (!supabaseUserId) {
  //     UserService.create(corbadoUser.getEmail(), corbadoUser.getName()).then(
  //       (u) => {
  //         if (u == null) {
  //           /**
  //            * @TODO: log out
  //            */
  //           return NextResponse.redirect(new URL("/", request.url));
  //         } else {
  //           const user = u.user;
  //           return NextResponse.next();
  //         }
  //       }
  //     );
  //   }
  // } catch {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

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
