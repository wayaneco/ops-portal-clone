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

import api from "utils/api/index";

const getUserInfo = async (id: string) => {
  try {
    const response = await api.get(`/api/user/${id}`, {
      headers: headers(),
      next: {
        tags: ["user_info"],
      },
      cache: "no-store",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export default async function Layout(props: PropsWithChildren) {
  const supabase = await createClient();

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

  const getHasAdminRole = async (id: string) => {
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userInfo = await getUserInfo(user?.id);
  const clientLists = await getClients();
  const hasAdminRole = await getHasAdminRole(user?.id);

  return (
    <SupabaseSessionProvider
      userInfo={JSON.parse(JSON.stringify(userInfo))}
      user={JSON.parse(JSON.stringify(user as User))}
    >
      <UserClientContextProvider
        clientLists={JSON.parse(
          JSON.stringify(clientLists as Array<ClientsType>)
        )}
        hasAdminRole={hasAdminRole}
      >
        <MainLayout>{props.children}</MainLayout>
      </UserClientContextProvider>
    </SupabaseSessionProvider>
  );
}

export const dynamic = "force-dynamic";
