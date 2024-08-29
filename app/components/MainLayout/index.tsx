"use client";

import { usePathname, useRouter } from "next/navigation";

import { PropsWithChildren, Suspense, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/client";
import { useUserClientProviderContext } from "../Context/UserClientContext";
import { useSupabaseSessionContext } from "../Context/SupabaseSessionProvider";

type MainLayoutProps = PropsWithChildren;

export default function MainLayout(props: MainLayoutProps) {
  const pathname = usePathname();
  const navigate = useRouter();
  const supabase = createClient();

  const { userInfo } = useSupabaseSessionContext();

  const regex = new RegExp(/(\/company\/)(add|\w)/);

  useEffect(() => {
    const subscribe = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate.replace("/login");
      }
    });

    return () => subscribe.data.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {userInfo ? <Navbar /> : <div>Loading...</div>}
      <div
        className={`min-h-screen mx-auto pt-[100px] ${
          !regex.test(pathname) && "container"
        }`}
      >
        {props?.children}
      </div>
    </Suspense>
  );
}
