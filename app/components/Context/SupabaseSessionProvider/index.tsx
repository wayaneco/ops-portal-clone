"use client";

import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren } from "react";

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
