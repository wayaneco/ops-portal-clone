"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";

export default function MainLayout(props: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <div
        className={`min-h-screen mx-auto pt-[100px] ${
          pathname !== "/company/add" && "container"
        }`}
      >
        {props?.children}
      </div>
    </>
  );
}
