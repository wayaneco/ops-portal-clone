"use client";

import { createContext, PropsWithChildren, useState } from "react";
import { Sidebar, SidebarItems, SidebarItemGroup } from "flowbite-react";

import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";

import { ROLE_COMPANY_ADMIN, ROLE_NETWORK_ADMIN } from "@/app/constant";

export type SidebarContextType = {
  pathname: string;
  setPathname: (value: any) => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

const SIDEBAR_ITEMS = [
  {
    id: 1,
    label: "Web Address",
    routeName: "webAddress",
    allowedRole: [ROLE_NETWORK_ADMIN],
  },
  {
    id: 2,
    label: "Service Location",
    routeName: "serviceLocation",
    allowedRole: [ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN],
  },
  {
    id: 3,
    label: "Service Provided",
    routeName: "serviceProvided",
    allowedRole: [ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN],
  },
  {
    id: 4,
    label: "Tags",
    routeName: "tags",
    allowedRole: [ROLE_NETWORK_ADMIN],
  },
  {
    id: 5,
    label: "Provider Type",
    routeName: "providerType",
    allowedRole: [ROLE_NETWORK_ADMIN],
  },
];

export default function SidebarContextProvider(props: PropsWithChildren) {
  const { currentPrivilege } = useUserClientProviderContext();

  const [pathname, setPathname] = useState(() => {
    if (currentPrivilege?.includes(ROLE_NETWORK_ADMIN)) {
      return "webAddress";
    }

    return "serviceLocation";
  });

  return (
    <SidebarContext.Provider
      value={{
        pathname,
        setPathname,
      }}
    >
      <div className="h-[calc(100vh-100px)]">
        <div className="flex w-full h-full ">
          <Sidebar className="pt-[80px] relative z-10">
            <SidebarItems className="h-full">
              <SidebarItemGroup>
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = item.routeName === pathname;
                  if (
                    !item?.allowedRole.some((allowed) =>
                      currentPrivilege?.includes(allowed)
                    )
                  ) {
                    return null;
                  }
                  return (
                    <div
                      key={item.id}
                      className={`text-lg p-4 cursor-pointer rounded-md  hover:bg-primary-500 hover:text-white transition-colors duration-200 ${
                        isActive ? "bg-primary-600 text-white" : "text-black"
                      }`}
                      onClick={() => setPathname(item.routeName)}
                    >
                      {item.label}
                    </div>
                  );
                }).filter(Boolean)}
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
          {props.children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
