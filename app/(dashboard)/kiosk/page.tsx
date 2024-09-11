"use client";

import { useMemo } from "react";
import Image from "next/image";

import { Avatar, Button, Card } from "flowbite-react";

import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { ROLE_NETWORK_ADMIN, STATUS_COMPLETED } from "@/app/constant";
import { useSupabaseSessionContext } from "@/app/components/Context/SupabaseSessionProvider";
import * as ImagePlaceholder from "public/image-placeholder.jpg";

const Page = () => {
  const { selectRef, currentPrivilege, clientLists, selectedClient } =
    useUserClientProviderContext();
  const { userInfo } = useSupabaseSessionContext();

  const currentClient = useMemo(() => {
    let data;

    data = currentPrivilege?.some((privilege) =>
      [ROLE_NETWORK_ADMIN]?.includes(privilege)
    )
      ? clientLists
      : userInfo?.clients;

    return {
      length: data?.length,
      data: data?.find((client) => client?.client_id === selectedClient),
    };
  }, [clientLists, userInfo, selectedClient, currentPrivilege]);

  return (
    <div className="py-16">
      <Card>
        <div className="flex gap-x-10">
          <div className="flex flex-col items-center">
            <Avatar
              img={(avatarProps) => (
                <div className="h-56 w-52">
                  <Image
                    src={
                      currentClient?.data?.logo_url
                        ? `${
                            currentClient?.data?.logo_url
                          }?${new Date().getTime()}`
                        : (ImagePlaceholder.default.src as string)
                    }
                    alt={`User Profile`}
                    fill
                    {...avatarProps}
                    className={
                      !currentClient?.data?.logo_url
                        ? "bg-[#C4C4C4] object-contain"
                        : ""
                    }
                  />
                </div>
              )}
            />
            {currentClient?.length > 1 ? (
              <div className="mt-4">
                <Button
                  color="primary"
                  onClick={() => selectRef?.current?.showPicker()}
                >
                  Change client
                </Button>
              </div>
            ) : null}
          </div>
          {currentClient?.data?.provisioning_status === STATUS_COMPLETED ? (
            <div
              className="flex items-center mb-[40px]"
              onClick={() =>
                window.open(
                  `https://${currentClient?.data?.web_address.toLowerCase()}.everesteffect.com`,
                  "_blank"
                )
              }
            >
              <div className="rounded-md p-4 text-white bg-yellow-400 cursor-pointer transition-colors hover:bg-yellow-500 group">
                <div className="flex gap-x-3 items-center">
                  <svg
                    className="w-6 h-6 text-white dark:text-white transition-colors group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <div className="transition-colors  group-hover:text-white">
                    Launch Kiosk for {currentClient?.data?.name}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center mb-[40px]">
              <div className="text-gray-600 text-lg">
                Sorry. Your sub-domain is not yet provisioned. Please contact
                your administrator.
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Page;
