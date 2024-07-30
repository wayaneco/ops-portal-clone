"use client";

import {
  Sidebar,
  SidebarItems,
  SidebarItemGroup,
  SidebarItem,
  Avatar,
  TextInput,
  Button,
} from "flowbite-react";
import test from "node:test";
import { createContext, PropsWithChildren, useState } from "react";

export type SidebarContextType = {
  pathname: string;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

const SIDEBAR_ITEMS = [
  {
    id: 1,
    label: "Web Address",
    routeName: "webAddress",
  },
  {
    id: 2,
    label: "Service Location",
    routeName: "serviceLocation",
  },
  {
    id: 3,
    label: "Service Provided",
    routeName: "serviceProvided",
  },
  {
    id: 4,
    label: "Tags",
    routeName: "tags",
  },
  {
    id: 5,
    label: "Provider Type",
    routeName: "providerType",
  },
];

export default function SidebarContextProvider(props: PropsWithChildren) {
  const [pathname, setPathname] = useState("");

  return (
    <SidebarContext.Provider value={{ pathname }}>
      <div className="h-[calc(100vh-100px)]">
        <div className="flex w-full h-full">
          <Sidebar className="pt-[80px] relative z-10">
            <SidebarItems className="h-full">
              <SidebarItemGroup>
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = item.routeName === pathname;
                  return (
                    <div
                      key={item.id}
                      className={`text-lg p-4 cursor-pointer rounded-md hover:bg-blue-300 transition-colors duration-200 ${
                        isActive && "bg-blue-500 text-white"
                      }`}
                      onClick={() => setPathname(item.routeName)}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
          {props.children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
