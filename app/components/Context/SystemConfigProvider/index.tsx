"use client";

import { createContext, PropsWithChildren, useContext } from "react";

export type SystemConfigType = {
  expiration_time: string;
};

type SystemConfigProviderProps = PropsWithChildren & SystemConfigType;

export const SystemConfigContext = createContext<SystemConfigType | undefined>(
  undefined
);

export function SupabaseSessionProvider(props: SystemConfigProviderProps) {
  return (
    <SystemConfigContext.Provider value={{ expiration_time: "" }}>
      {props?.children}
    </SystemConfigContext.Provider>
  );
}

export const useSystemConfigContext = () => {
  const context = useContext<SystemConfigType | undefined>(
    SystemConfigContext!
  );

  if (!context) {
    throw new Error(
      "useSystemConfigContext should be used within the SystemConfigProvider Context!"
    );
  }

  return context;
};
