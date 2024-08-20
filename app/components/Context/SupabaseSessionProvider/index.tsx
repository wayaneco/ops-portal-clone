"use client";

import { UserDetailType } from "@/app/types";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext } from "react";

export type AuthContextType = {
  getSession(): Session;
  session: Session;
  userInfo: UserDetailType;
};

type SupabaseSessionProviderProps = PropsWithChildren & {
  userInfo: UserDetailType;
  session: Session;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function SupabaseSessionProvider(props: SupabaseSessionProviderProps) {
  const { session, userInfo } = props;

  return (
    <AuthContext.Provider
      value={{ getSession: () => session, session, userInfo }}
    >
      {props?.children}
    </AuthContext.Provider>
  );
}

export const useSupabaseSessionContext = () => {
  const context = useContext<AuthContextType | undefined>(AuthContext!);

  if (!context) {
    throw new Error("uWu");
  }

  return context;
};
