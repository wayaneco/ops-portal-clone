"use client";

import { PropsWithChildren } from "react";
import { redirect, usePathname } from "next/navigation";

import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { ROLE_NETWORK_ADMIN } from "@/app/constant";

export default function Layout(props: PropsWithChildren) {
  const pathname = usePathname();
  const { currentPrivilege, hasAdminRole } = useUserClientProviderContext();

  const hasPrivilege = currentPrivilege?.some((privilege) =>
    [ROLE_NETWORK_ADMIN]?.includes(privilege)
  );

  if (!hasAdminRole && !hasPrivilege && pathname === "/company")
    return redirect("/");

  return <>{props.children}</>;
}
