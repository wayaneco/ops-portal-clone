"use client";

import {
  createContext,
  Dispatch,
  memo,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ClientsType } from "@/app/types";

import { useSupabaseSessionContext } from "../SupabaseSessionProvider";
import { ROLE_NETWORK_ADMIN } from "@/app/constant";

type UserClientContextType = {
  selectRef: any;
  selectedClient: string;
  changeClient: Dispatch<SetStateAction<any>>;
  currentPrivilege: Array<string>;
  clientLists: Array<ClientsType>;
  hasAdminRole: boolean;
};

const UserClientContext = createContext<UserClientContextType | undefined>(
  undefined
);

// eslint-disable-next-line react/display-name
export const UserClientContextProvider = memo(
  (
    props: Omit<
      UserClientContextType,
      "selectedClient" | "changeClient" | "currentPrivilege" | "selectRef"
    > &
      PropsWithChildren
  ) => {
    const { children, clientLists, hasAdminRole } = props;

    const selectRef = useRef<HTMLSelectElement>();
    const { userInfo } = useSupabaseSessionContext();

    const clientsData = hasAdminRole ? clientLists : userInfo?.clients;

    const [selectedClient, setSelectedClient] = useState<string>(
      useMemo(() => {
        return clientsData?.length ? (clientsData?.[0]?.id as string) : "";
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [hasAdminRole, clientsData])
    );

    const [currentPrivilege, setCurrentPrivilege] = useState<Array<string>>(
      useMemo(() => {
        if (hasAdminRole) {
          return [ROLE_NETWORK_ADMIN];
        }

        const defaultId = clientsData?.length
          ? (clientsData?.[0]?.id as string)
          : "";

        const findClient = clientsData?.find(
          (client) => client?.id === defaultId
        );

        if (findClient) {
          return findClient?.privileges as Array<string>;
        }

        return [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [hasAdminRole, userInfo])
    );

    useEffect(() => {
      if (!hasAdminRole && selectedClient) {
        const findClient = userInfo?.clients?.find(
          (client) => client?.id === selectedClient
        );

        if (findClient) {
          return setCurrentPrivilege(findClient?.privileges as Array<string>);
        }

        // setCurrentPrivilege([]); // TODO: After clarification
      }
    }, [hasAdminRole, selectedClient, userInfo]);

    return (
      <UserClientContext.Provider
        value={{
          selectRef,
          selectedClient,
          currentPrivilege,
          changeClient: (value: string) => {
            setSelectedClient(value as string);
          },
          clientLists,
          hasAdminRole,
        }}
      >
        {children}
      </UserClientContext.Provider>
    );
  }
);

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
