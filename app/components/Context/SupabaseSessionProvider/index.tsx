"use client";

import { UserDetailType } from "@/app/types";
import { User } from "@supabase/supabase-js";
import { createContext, memo, PropsWithChildren, useContext } from "react";

export type AuthContextType = {
  getSession(): User;
  user: User;
  userInfo: UserDetailType;
};

type SupabaseSessionProviderProps = PropsWithChildren & {
  userInfo: UserDetailType;
  user: User;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// eslint-disable-next-line react/display-name
export const SupabaseSessionProvider = (
  props: SupabaseSessionProviderProps
) => {
  const { user, userInfo } = props;

  return (
    <AuthContext.Provider value={{ getSession: () => user, user, userInfo }}>
      {props?.children}
    </AuthContext.Provider>
  );
};

export const useSupabaseSessionContext = () => {
  const context = useContext<AuthContextType | undefined>(AuthContext!);

  if (!context) {
    throw new Error(
      "useSupabaseSessionContext should be used within the SupabaseSessionContext provider!"
    );
  }

  return context;
};
