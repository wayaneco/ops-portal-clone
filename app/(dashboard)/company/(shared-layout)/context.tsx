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
          <Sidebar className="fixed pt-[80px] z-10">
            <SidebarItems className="h-full flex flex-col">
              <SidebarItemGroup className="flex-1">
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
                      className={`text-lg p-4 cursor-pointer rounded-md text-gray-600  hover:bg-primary-500 hover:text-white transition-colors duration-200 ${
                        isActive ? "bg-primary-600 text-white" : "text-black"
                      }`}
                      onClick={() => setPathname(item.routeName)}
                    >
                      {item.label}
                    </div>
                  );
                }).filter(Boolean)}
              </SidebarItemGroup>
              <div className="my-4 border-t-[1px] border-solid border-gray-200"></div>
              <div
                className={` text-lg p-4 cursor-pointer rounded-md text-gray-600  hover:text-white transition-colors duration-200 hover:bg-primary-600`}
                onClick={() => ""}
              >
                <div className="flex items-center justify-between">
                  <span>Back</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                </div>
              </div>
            </SidebarItems>
          </Sidebar>
          {props.children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
