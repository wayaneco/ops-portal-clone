import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { ROLE_NETWORK_ADMIN } from "../constant";

import { SupabaseSessionProvider } from "../components/Context/SupabaseSessionProvider";
import { UserClientContextProvider } from "../components/Context/UserClientContext";

import { getUserById } from "../actions/user/get-user-by-id";

import MainLayout from "../components/MainLayout";
import { getAllCompany } from "../actions/company/get-all-company";

export default async function Layout(props: PropsWithChildren) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const getHasRoleAdmin = async (id: string) => {
    try {
      const { data } = await supabase.rpc("has_admin_role", {
        p_role_name: ROLE_NETWORK_ADMIN,
        p_user_id: id,
      });

      return data;
    } catch (error) {
      return error;
    }
  };

  const userInfo = await getUserById(user?.id);
  const clientLists = await getAllCompany(true);
  const hasAdminRole = await getHasRoleAdmin(user?.id);

  return (
    <SupabaseSessionProvider
      userInfo={JSON.parse(JSON.stringify(userInfo))}
      user={JSON.parse(JSON.stringify(user))}
    >
      <UserClientContextProvider
        clientLists={JSON.parse(JSON.stringify(clientLists))}
        hasAdminRole={JSON.parse(JSON.stringify(hasAdminRole))}
      >
        <MainLayout>{props.children}</MainLayout>
      </UserClientContextProvider>
    </SupabaseSessionProvider>
  );
}
