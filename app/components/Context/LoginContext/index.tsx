"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

export type LoginContextType = {
  id: string;
  email: string;
  phone_number: string;
  redirectUrl: string;
  token_hash: string;
  type: string;
  updateInfo: (key: keyof LoginContextType, value: string) => void;
};

type LoginContextProviderProps = PropsWithChildren;

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

export function LoginContextProvider(props: LoginContextProviderProps) {
  const [loginInfo, setLoginInfo] = useState<
    Omit<LoginContextType, "updateInfo">
  >({
    id: "",
    email: "",
    phone_number: "",
    redirectUrl: "",
    token_hash: "",
    type: "",
  });

  return (
    <LoginContext.Provider
      value={{
        ...loginInfo,
        updateInfo: (key: keyof LoginContextType, value: string) => {
          setLoginInfo((prev) => ({ ...prev, [key]: value }));
        },
      }}
    >
      {props?.children}
    </LoginContext.Provider>
  );
}

export const useLoginContextProvider = () => {
  const context = useContext<LoginContextType | undefined>(LoginContext!);

  if (!context) {
    throw new Error(
      "useSupabaseSessionContext should be used within the SupabaseSessionContext provider!"
    );
  }

  return context;
};
