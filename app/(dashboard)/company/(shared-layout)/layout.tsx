"use client";

import { PropsWithChildren } from "react";

import SidebarProvider from "./context";

export default function Layout(props: PropsWithChildren) {
  return <SidebarProvider>{props.children}</SidebarProvider>;
}
