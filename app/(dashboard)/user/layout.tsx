"use client";

import { PropsWithChildren } from "react";

import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { ROLE_COMPANY_ADMIN, ROLE_NETWORK_ADMIN, ROLE_AGENT } from "@/app/constant";
import { redirect, usePathname } from "next/navigation";

export default function Layout(props: PropsWithChildren) {
  const pathname = usePathname();
  const { currentPrivilege } = useUserClientProviderContext();

  const hasPrivilege = currentPrivilege?.some((privilege) =>
    [ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN, ROLE_AGENT]?.includes(privilege)
  );

  if (!hasPrivilege && pathname.includes("/user")) {
    return redirect("/");
  }

  return <>{props.children}</>;
}
