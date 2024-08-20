"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

type UserClientContextType = {
  selectedClient: any; // FOR NOW ANY
  changeClient: Dispatch<SetStateAction<any>>; // FOR NOW ANY
};

const UserClientContext = createContext<UserClientContextType | undefined>(
  undefined
);

export const UserClientContextProvider = (
  props: Omit<UserClientContextType, "selectedClient" | "changeClient"> &
    PropsWithChildren
) => {
  const { children } = props;
  const [client, setClient] = useState();

  return (
    <UserClientContext.Provider
      value={{
        selectedClient: client,
        changeClient: setClient,
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
