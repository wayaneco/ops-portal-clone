"use client";

import { PropsWithChildren } from "react";

import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { ROLE_COMPANY_ADMIN, ROLE_NETWORK_ADMIN } from "@/app/constant";
import { usePathname } from "next/navigation";

export default function Layout(props: PropsWithChildren) {
  const pathname = usePathname();
  const { currentPrivilege } = useUserClientProviderContext();

  const hasPrivilege = currentPrivilege?.some((privilege) =>
    [ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN]?.includes(privilege)
  );

  if (!hasPrivilege && pathname === "/user")
    return <div>You are not authorized to view this page!</div>;

  return <>{props.children}</>;
}
