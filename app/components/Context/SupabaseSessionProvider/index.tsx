"use client";

import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext } from "react";

export type AuthContextType = {
  getSession(): Session;
  session: Session;
};

type SupabaseSessionProviderProps = PropsWithChildren & {
  session: Session;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function SupabaseSessionProvider(props: SupabaseSessionProviderProps) {
  return (
    <AuthContext.Provider
      value={{ getSession: () => props?.session, session: props?.session }}
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
