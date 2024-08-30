"use client";

import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import SidebarProvider from "./context";

export default function Layout(props: PropsWithChildren) {
  return <SidebarProvider>{props.children}</SidebarProvider>;
}
