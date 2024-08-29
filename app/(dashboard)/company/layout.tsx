"use client";

import { PropsWithChildren, Suspense } from "react";

import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { ROLE_NETWORK_ADMIN } from "@/app/constant";
import { redirect, usePathname } from "next/navigation";

export default function Layout(props: PropsWithChildren) {
  const pathname = usePathname();
  const { currentPrivilege } = useUserClientProviderContext();

  const hasPrivilege = currentPrivilege?.some((privilege) =>
    [ROLE_NETWORK_ADMIN]?.includes(privilege)
  );

  if (!hasPrivilege && pathname === "/company") return redirect("/");

  return <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>;
}
