"use client";

import { usePathname, useRouter } from "next/navigation";

import { PropsWithChildren, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/client";

type MainLayoutProps = PropsWithChildren & {
  privileges: string;
};

export default function MainLayout(props: MainLayoutProps) {
  const pathname = usePathname();
  const navigate = useRouter();
  const supabase = createClient();

  const regex = new RegExp(/(\/company\/)(add|\w)/);

  useEffect(() => {
    let subscribe;

    subscribe = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate.replace("/login");
      }
    });

    return () => subscribe.data.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar privileges={props?.privileges} />
      <div
        className={`min-h-screen mx-auto pt-[100px] ${
          !regex.test(pathname) && "container"
        }`}
      >
        {props?.children}
      </div>
    </>
  );
}
