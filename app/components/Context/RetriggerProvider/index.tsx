"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

type RetriggerContextProviderProps = {
  refreshUserList: Object;
  refreshUserListFunc: () => void;
  refreshCompanyList: Object;
  refreshCompanyListFunc: () => void;
};

const RetriggerContext = createContext<
  RetriggerContextProviderProps | undefined
>(undefined);

export const RetriggerContextProvider = ({ children }: PropsWithChildren) => {
  const [refreshUserList, setRefreshUserList] = useState<Object>({});
  const [refreshCompanyList, setRefreshCompanyList] = useState<Object>({});
  return (
    <RetriggerContext.Provider
      value={{
        refreshUserList,
        refreshCompanyList,
        refreshUserListFunc: () => setRefreshUserList((prev) => ({ ...prev })),
        refreshCompanyListFunc: () =>
          setRefreshCompanyList((prev) => ({ ...prev })),
      }}
    >
      {children}
    </RetriggerContext.Provider>
  );
};

export const useRetriggerContextProvider = () => {
  const context = useContext<RetriggerContextProviderProps | undefined>(
    RetriggerContext
  );

  if (!context) {
    throw new Error(
      "useRetriggerContextProvider should be used within the RetriggerContext provider!"
    );
  }

  return context;
};
