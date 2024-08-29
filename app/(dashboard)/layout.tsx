"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

import MainLayout from "../components/MainLayout";
import { SupabaseSessionProvider } from "../components/Context/SupabaseSessionProvider";
import { UserClientContextProvider } from "../components/Context/UserClientContext";
import { RetriggerContextProvider } from "../components/Context/RetriggerProvider";

import { ROLE_NETWORK_ADMIN } from "../constant";
import { ClientsType, UserDetailType } from "../types";

const Layout = (props: PropsWithChildren) => {
  const supabase = createClient();

  const [isDoneFetching, setIsDoneFetching] = useState(false);
  const [user, setUser] = useState<User>();
  const [userInfo, setUserInfo] = useState<UserDetailType>();
  const [clients, setClients] = useState<Array<ClientsType>>([]);
  const [hasRoleNetworkAdmin, setHasRoleNetworkAdmin] =
    useState<boolean>(false);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    return user;
  };

  const getUserInfo = async (id: string) => {
    const response = await fetch(`/api/user/${id}`, {
      method: "GET",
      next: {
        tags: ["user_info"],
      },
    });

    const userInfo = await response.json();

    return userInfo;
  };

  const getClients = async () => {
    const { data = [] } = await supabase
      .from("clients")
      .select(`id, name, logo_url, web_address, provisioning_status`)
      .eq("is_enabled", true)
      .order("name", { ascending: true });

    return data;
  };

  const getHasRoleAdmin = async (id: string) => {
    const { data = false } = await supabase.rpc("has_admin_role", {
      p_role_name: ROLE_NETWORK_ADMIN,
      p_user_id: id,
    });
    return data;
  };

  const fetchAllData = async () => {
    try {
      const respUserAuth = await getUser();
      setUser(respUserAuth);

      if (respUserAuth) {
        const [respUserInfo, respClientList, respHasRoleNetworkAdmin] =
          await Promise.all([
            await getUserInfo(respUserAuth?.id),
            await getClients(),
            await getHasRoleAdmin(respUserAuth?.id),
          ]);

        setUserInfo(respUserInfo);
        setClients(respClientList as Array<ClientsType>);
        setHasRoleNetworkAdmin(respHasRoleNetworkAdmin);
        setIsDoneFetching(true);
      }
    } catch (error) {
      setIsDoneFetching(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SupabaseSessionProvider
      userInfo={userInfo as UserDetailType}
      user={user as User}
    >
      <UserClientContextProvider
        isDoneFetching={isDoneFetching}
        clientLists={clients! as Array<ClientsType>}
        hasAdminRole={hasRoleNetworkAdmin}
      >
        <RetriggerContextProvider>
          <MainLayout>{props.children}</MainLayout>
        </RetriggerContextProvider>
      </UserClientContextProvider>
    </SupabaseSessionProvider>
  );
};

export default Layout;
