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

type UserClientContextType = {
  selectRef: any;
  selectedClient: string;
  changeClient: Dispatch<SetStateAction<any>>;
  currentPrivilege: Array<string>;
  clientLists: Array<ClientsType>;
  hasAdminRole: boolean;
  isDoneFetching: boolean;
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
    const { children, clientLists, hasAdminRole, isDoneFetching } = props;
    const selectRef = useRef<HTMLSelectElement>();
    const { userInfo } = useSupabaseSessionContext();

    const [selectedClient, setSelectedClient] = useState<string>("");
    const [currentPrivilege, setCurrentPrivilege] = useState<Array<string>>([]);

    useEffect(() => {
      if (isDoneFetching) {
        const defaultId = userInfo?.clients?.length
          ? (userInfo?.clients?.[0]?.id as string)
          : "";

        setSelectedClient(defaultId);

        const findClient = userInfo?.clients?.find(
          (client) => client?.id === defaultId
        );

        if (findClient) {
          setCurrentPrivilege(findClient?.privileges as Array<string>);
        } else {
          setCurrentPrivilege([]);
        }
      }
    }, [isDoneFetching]);

    useEffect(() => {
      if (selectedClient) {
        const findClient = userInfo?.clients?.find(
          (client) => client?.id === selectedClient
        );

        if (findClient) {
          return setCurrentPrivilege(findClient?.privileges as Array<string>);
        }

        // setCurrentPrivilege([]); // TODO: After clarification
      }
    }, [selectedClient, userInfo, isDoneFetching]);

    return (
      <UserClientContext.Provider
        value={{
          isDoneFetching,
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
