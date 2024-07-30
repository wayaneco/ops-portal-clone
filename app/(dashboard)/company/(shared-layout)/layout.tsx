"use client";

import { PropsWithChildren, useContext } from "react";
import {
  Sidebar,
  SidebarItems,
  SidebarItemGroup,
  SidebarItem,
  Avatar,
  TextInput,
  Button,
} from "flowbite-react";

import SidebarProvider, { SidebarContext, SidebarContextType } from "./context";

export default function Layout(props: PropsWithChildren) {
  const test = useContext<SidebarContextType | undefined>(SidebarContext);
  return (
    <SidebarProvider>
      {/* <div className="h-[calc(100vh-100px)]">
        <div className="flex w-full h-full">
          <Sidebar>
            <SidebarItems className="h-full">
              <SidebarItemGroup>
                <SidebarItem>
                  <Avatar
                    img="https://www.everesteffect.com/img/ee_logo_dark.svg"
                    size="lg"
                  />
                </SidebarItem>
                <SidebarItems>
                  <div
                    className="text-lg p-4 cursor-pointer rounded-md hover:bg-blue-100"
                    onClick={() => test?.setPathname("test")}
                  >
                    Web Address
                  </div>
                </SidebarItems>
                <SidebarItems>
                  <div
                    className="text-lg p-4 cursor-pointer rounded-md hover:bg-blue-100"
                    onClick={() => test?.setPathname("aw")}
                  >
                    Service Location
                  </div>
                </SidebarItems>
                <SidebarItems>
                  <div className="text-lg p-4 cursor-pointer rounded-md hover:bg-blue-100">
                    Service Provided
                  </div>
                </SidebarItems>
                <SidebarItems>
                  <div className="text-lg p-4 cursor-pointer rounded-md hover:bg-blue-100">
                    Tags
                  </div>
                </SidebarItems>
                <SidebarItems>
                  <div className="text-lg p-4 cursor-pointer rounded-md hover:bg-blue-100">
                    Provider Type
                  </div>
                </SidebarItems>
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
          <div className="flex-1">
            <div className="bg-gray-50">
              <div className="py-8 px-4">
                <div className="flex gap-x-4">
                  <TextInput
                    color="primary"
                    placeholder="Add client name"
                    className="w-[450px]"
                  />
                  <Button color="primary">Done</Button>
                </div>
              </div>
            </div>
            <div className="p-4">{props.children}</div>
          </div>
        </div>
      </div> */}
      {props.children}
    </SidebarProvider>
  );
}
