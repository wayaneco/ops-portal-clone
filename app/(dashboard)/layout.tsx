import { PropsWithChildren } from "react";
import MainLayout from "../components/MainLayout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ROLE_NETWORK_ADMIN } from "../constant";
import { User } from "@supabase/supabase-js";
import { SupabaseSessionProvider } from "../components/Context/SupabaseSessionProvider";
import { UserClientContextProvider } from "../components/Context/UserClientContext";
import { ClientsType } from "../types";

export default async function Layout(props: PropsWithChildren) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // const { data } = await supabase
  //   .from("users_data_view")
  //   .select("privileges")
  //   .eq("email", user?.email)
  //   .single();

  // console.log(data, "data priviliges");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/user/${user?.id}`,
    {
      method: "GET",
      headers: headers(),
      next: {
        tags: ["user_info"],
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user ${user?.id}`);
  }

  const userInfo = await response.json();

  const { data: clientLists = [] } = await supabase
    .from("clients")
    .select(`id, name, logo_url, web_address, provisioning_status`)
    .order("name", { ascending: true });

  const { data: hasAdminRole = false } = await supabase.rpc("has_admin_role", {
    p_role_name: ROLE_NETWORK_ADMIN,
    p_user_id: user?.id,
  });

  return (
    <SupabaseSessionProvider userInfo={userInfo} user={user as User}>
      <UserClientContextProvider
        clientLists={clientLists! as Array<ClientsType>}
        hasAdminRole={hasAdminRole}
      >
        <MainLayout>{props.children}</MainLayout>
      </UserClientContextProvider>
    </SupabaseSessionProvider>
  );
}
