import { PropsWithChildren } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { ROLE_NETWORK_ADMIN } from "../constant";

import MainLayout from "../components/MainLayout";
import { SupabaseSessionProvider } from "../components/Context/SupabaseSessionProvider";
import { UserClientContextProvider } from "../components/Context/UserClientContext";

const getUserInfo = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/user/${id}`,
      {
        method: "GET",
        headers: new Headers(headers()),
        next: {
          tags: ["user_info"],
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user ${id}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export default async function Layout(props: PropsWithChildren) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const getClients = async () => {
    try {
      const { data } = await supabase
        .from("clients")
        .select(`id, name, logo_url, web_address, provisioning_status`)
        .order("name", { ascending: true });

      return data;
    } catch (error) {
      return error;
    }
  };

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

  const userInfo = await getUserInfo(user?.id);
  const clientList = await getClients();
  const hasAdminRole = await getHasRoleAdmin(user?.id);

  console.log(1111111111111, userInfo);
  console.log(2222222222222, clientList);
  console.log(3333333333333, hasAdminRole);
  console.log(4444444444444, user);
  return (
    <SupabaseSessionProvider
      userInfo={JSON.parse(JSON.stringify(userInfo))}
      user={JSON.parse(JSON.stringify(user))}
    >
      <UserClientContextProvider
        clientLists={JSON.parse(JSON.stringify(clientList))}
        hasAdminRole={JSON.parse(JSON.stringify(hasAdminRole))}
      >
        <MainLayout>{props.children}</MainLayout>
      </UserClientContextProvider>
    </SupabaseSessionProvider>
  );
}
