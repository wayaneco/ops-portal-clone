import * as React from "react";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Everest Effect Portal - Kiosk",
};

const Layout = async ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default Layout;
