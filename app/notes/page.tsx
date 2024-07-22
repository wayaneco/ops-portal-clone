import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import { createClient } from '@/utils/supabase/server';

import PasskeyList from "@/utils/corbado/PasskeyList";
import LogoutButton from '@/utils/corbado/LogoutButton';
import getNodeSDK from "@/utils/corbado/nodeSdk";

export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  // const cookieStore = cookies();
  //   const session = cookieStore.get("cbo_short_session");
  //   if (!session) {
  //       return redirect("/");
  //   }
  //   const sdk = getNodeSDK();
  //   let user;
  //   try {
  //       user = await sdk.sessions().getCurrentUser(session.value);
  //       if (!user.isAuthenticated()) {
  //           throw Error;
  //       }
  //   } catch {
  //       return redirect("/");
  //   }

  return (
    <div>
      <br />
      <LogoutButton/>
      <PasskeyList />
      <br />
      <br />
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
)
}