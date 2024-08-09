"use client";

import { Button, TextInput, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useFormContext } from "react-hook-form";

import { addClient } from "app/actions/user/add-client";

export const AddClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientList, setClientList] = useState<Array<any>>([]);

  const { setValue, watch } = useFormContext();

  const { user } = watch("info");
  const selectedClients = watch("clients");

  useEffect(() => {
    if (!clientList?.length) {
      setIsLoading(true);
      createClient()
        .from("clients")
        .select()
        .then((result) => {
          setClientList(result?.data as Array<any>);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal.Header>Link to New Client</Modal.Header>
      <Modal.Body>
        <TextInput placeholder="Search by client" />
        <div className="flex flex-col mt-5">
          {clientList?.map((client, key) => {
            const isSelectedClient = selectedClients?.includes(client?.id);
            return (
              <div
                key={key}
                className={`px-6 py-4 cursor-pointer ${
                  isSelectedClient ? "bg-primary-500 text-white" : "bg-white"
                }`}
                onClick={() => {
                  const clonedSelectedClients = JSON.parse(
                    JSON.stringify(selectedClients)
                  );

                  if (isSelectedClient) {
                    const filteredClients = clonedSelectedClients.filter(
                      (c: string) => c !== client?.id
                    );
                    setValue("clients", filteredClients);
                  } else {
                    setValue("clients", [...clonedSelectedClients, client?.id]);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{client?.name}</span>
                  {isSelectedClient && (
                    <svg
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 11.917 9.724 16.5 19 7.5"
                      />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {isLoading && (
          <>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[260px] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[560px] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[560px] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[160px] mb-2.5" />
          </>
        )}

        <div className="mt-10 ">
          <Button
            color="primary"
            className="w-[150px] mx-auto"
            onClick={() => {
              addClient({
                user_id: user.user_id,
                client_ids: selectedClients,
              });
            }}
          >
            Add
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};
