import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { createClient } from "@/utils/supabase/server";

import { ROLE_NETWORK_ADMIN } from "../constant";

import { SupabaseSessionProvider } from "../components/Context/SupabaseSessionProvider";
import { UserClientContextProvider } from "../components/Context/UserClientContext";

import MainLayout from "../components/MainLayout";

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
        cache: "force-cache",
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
  const supabase = await createClient();

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
  const clientLists = await getClients();
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
