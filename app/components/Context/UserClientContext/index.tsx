"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSupabaseSessionContext } from "../SupabaseSessionProvider";

type UserClientContextType = {
  selectRef: any;
  selectedClient: string;
  changeClient: Dispatch<SetStateAction<any>>;
  currentPrivilege: Array<string>;
  clientLists: Array<{ id: string; name: string }>;
  hasAdminRole: boolean;
};

const UserClientContext = createContext<UserClientContextType | undefined>(
  undefined
);

export const UserClientContextProvider = (
  props: Omit<
    UserClientContextType,
    "selectedClient" | "changeClient" | "currentPrivilege" | "selectRef"
  > &
    PropsWithChildren
) => {
  const { children, clientLists, hasAdminRole } = props;
  const selectRef = useRef<HTMLSelectElement>();
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
        return findClient?.privileges as Array<string>;
      }

      return [];
    }
  );

  useEffect(() => {
    if (selectedClient) {
      const findClient = userInfo?.clients?.find(
        (client) => client?.id === selectedClient
      );

      if (findClient) {
        setCurrentPrivilege(findClient?.privileges as Array<string>);
        return;
      }

      // setCurrentPrivilege([]); // TODO: After clarification
    }
  }, [selectedClient, userInfo?.clients]);

  return (
    <UserClientContext.Provider
      value={{
        selectRef,
        selectedClient,
        currentPrivilege,
        changeClient: (value: string) => setSelectedClient(value as string),
        clientLists,
        hasAdminRole,
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
