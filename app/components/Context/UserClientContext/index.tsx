"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSupabaseSessionContext } from "../SupabaseSessionProvider";

type UserClientContextType = {
  selectedClient: string;
  changeClient: Dispatch<SetStateAction<any>>;
  currentPrivilege: Array<string>;
};

const UserClientContext = createContext<UserClientContextType | undefined>(
  undefined
);

export const UserClientContextProvider = (
  props: Omit<
    UserClientContextType,
    "selectedClient" | "changeClient" | "currentPrivilege"
  > &
    PropsWithChildren
) => {
  const { children } = props;
  const { userInfo } = useSupabaseSessionContext();

  const [selectedClient, setSelectedClient] = useState<string>(() =>
    userInfo?.clients?.length ? (userInfo?.clients?.[0]?.id as string) : ""
  ); // DEFAULT VALUE WILL BE THE FIRST IN LIST
  const [currentPrivilege, setCurrentPrivilege] = useState<Array<string>>(
    () => {
      const findClient = userInfo?.clients?.find(
        (client) => client?.id === selectedClient
      );

      if (findClient) {
        return findClient?.privileges;
      }

      return [];
    }
  );

  useEffect(() => {
    if (selectedClient) {
      const findClient = userInfo?.clients?.find(
        (client) => client?.id === selectedClient
      );

      if (findClient) setCurrentPrivilege(findClient?.privileges);
    }
  }, [selectedClient]);

  return (
    <UserClientContext.Provider
      value={{
        selectedClient,
        currentPrivilege,
        changeClient: (value: string) => setSelectedClient(value as string),
      }}
    >
      {children}
    </UserClientContext.Provider>
  );
};

export const useUserClientProviderContext = () => {
  const context = useContext<UserClientContextType | undefined>(
    UserClientContext!
  );

  if (!context)
    throw new Error(
      "useUserClientProviderContext should be used within the UserClientContext provider!"
    );

  return context;
};
