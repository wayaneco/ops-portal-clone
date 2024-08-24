"use client";

import { Avatar, Button, Card } from "flowbite-react";
import Image from "next/image";

import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";

import TonisKitchen from "public/tonis.svg";
import { ROLE_AGENT, ROLE_NETWORK_ADMIN } from "@/app/constant";
import { redirect } from "next/navigation";

export default function Page() {
  const { selectRef, currentPrivilege } = useUserClientProviderContext();

  const hasPrivilege = currentPrivilege?.some((privilege) =>
    [ROLE_NETWORK_ADMIN, ROLE_AGENT]?.includes(privilege)
  );

  if (!hasPrivilege) return redirect("/");

  return (
    <div className="py-16">
      <Card>
        <div className="flex gap-x-10">
          <div className="flex flex-col items-center">
            <Avatar
              img={(avatarProps) => (
                <div className="h-56 w-52">
                  <Image
                    src={TonisKitchen}
                    alt={`User Profile`}
                    fill
                    {...avatarProps}
                  />
                </div>
              )}
            />
            <div className="mt-4">
              <Button
                color="primary"
                onClick={() => selectRef?.current?.showPicker()}
              >
                Change client
              </Button>
            </div>
          </div>
          <div className="flex items-center mb-[40px]">
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
                    fill-rule="evenodd"
                    d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div className="transition-colors group-hover:text-white">
                  Launch Kiosk for Toni&apos;ys Kitchen
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
