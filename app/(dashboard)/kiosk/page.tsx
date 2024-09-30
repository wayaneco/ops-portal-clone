"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Avatar, Button, Card } from "flowbite-react";

import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import {
  STATUS_COMPLETED,
  STATUS_IN_PROGRESS,
  STATUS_PROVISION,
} from "@/app/constant";
import { useSupabaseSessionContext } from "@/app/components/Context/SupabaseSessionProvider";
import * as ImagePlaceholder from "public/image-placeholder.jpg";
import { createClient } from "@/utils/supabase/client";
import { ClientsType } from "@/app/types";
import { revalidatePath } from "@/app/actions/revalidate";

const provisionApiEnv = process.env["NEXT_PUBLIC_PROVISION_API"];
const xApiKey = process.env["NEXT_PUBLIC_PROVISION_X_API_KEY"];
const bucketName = process.env["NEXT_PUBLIC_PROVISION_BUCKET_NAME"];

const getInitialLogs = async (web_address: string) => {
  try {
    const provisionResponse = await axios.get<any>(
      `${provisionApiEnv}/provision-logs?provider_name=${web_address}&bucket_name=${bucketName}`,
      {
        headers: {
          "x-api-key": xApiKey,
        },
      }
    );

    return provisionResponse?.data?.log_content;
  } catch (_) {
    return [];
  }
};

const Page = () => {
  const supabase = createClient();

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [clientInfo, setClientInfo] = useState<Pick<
    ClientsType,
    "name" | "web_address" | "logo_url" | "provisioning_status"
  > | null>(null);

  const { selectRef, hasAdminRole, clientLists, selectedClient } =
    useUserClientProviderContext();
  const { userInfo } = useSupabaseSessionContext();

  const clientData = hasAdminRole ? clientLists : userInfo?.clients;

  useEffect(() => {
    if (selectedClient) {
      (async () => {
        setIsFetching(true);

        const initialData = clientData?.find(
          (det) => det.id === selectedClient
        );

        const response = await getInitialLogs(
          initialData?.web_address as string
        );

        const isCompleted =
          response?.filter(
            (res: { status: STATUS_PROVISION }) => res?.status === "completed"
          )?.length === 7;

        if (
          isCompleted &&
          initialData?.provisioning_status === STATUS_IN_PROGRESS
        ) {
          await supabase
            .from("clients_data_view")
            .update({
              provisioning_status: STATUS_COMPLETED,
            })
            .eq("id", selectedClient);

          revalidatePath("/(dashboard)/company");
        }

        const { data } = await supabase
          .from("clients_data_view")
          .select("id, name, web_address, provisioning_status, logo_url")
          .eq("id", selectedClient)
          .single();

        setClientInfo(data);
        setIsFetching(false);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientData, selectedClient]);

  if (isFetching) {
    return (
      <div className="py-16">
        <Card>
          <div className="flex gap-x-10 items-center">
            <div className="flex items-center justify-center w-52 h-56 bg-gray-300 rounded">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="flex flex-col align-middle">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-72 mb-4" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mb-4" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

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
                      clientInfo?.logo_url
                        ? `${clientInfo?.logo_url}?${new Date().getTime()}`
                        : (ImagePlaceholder.default.src as string)
                    }
                    alt={`User Profile`}
                    fill
                    {...avatarProps}
                    className={
                      !clientInfo?.logo_url ? "bg-[#C4C4C4] object-contain" : ""
                    }
                  />
                </div>
              )}
            />
            {clientData?.length > 1 ? (
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
          {clientInfo?.provisioning_status === STATUS_COMPLETED ? (
            <div
              className="flex items-center mb-[40px]"
              onClick={() =>
                window.open(
                  `https://${clientInfo?.web_address.toLowerCase()}.everesteffect.com`,
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
                    Launch Kiosk for {clientInfo?.name}
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
