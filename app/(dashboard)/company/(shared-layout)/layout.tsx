"use client";

import { PropsWithChildren } from "react";

import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { ROLE_COMPANY_ADMIN, ROLE_NETWORK_ADMIN } from "@/app/constant";

import SidebarProvider from "./context";
import { redirect } from "next/navigation";

export default function Layout(props: PropsWithChildren) {
  const { currentPrivilege } = useUserClientProviderContext();

  const hasPrivilege = currentPrivilege?.some((privilege) =>
    [ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN]?.includes(privilege)
  );

  if (!hasPrivilege) return redirect("/");

  return <SidebarProvider>{props.children}</SidebarProvider>;
}
