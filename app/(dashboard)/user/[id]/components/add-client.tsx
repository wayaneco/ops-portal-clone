"use client";

import { Button, TextInput, Modal, Spinner, ModalProps } from "flowbite-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useFormContext, Controller } from "react-hook-form";
import Select from "react-tailwindcss-select";

import { addClient } from "app/actions/user/add-client";
import { ClientsType, RoleType } from "@/app/types";
import { useUserDetailFormContext } from "./user-detail-form";

export const AddClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [clientList, setClientList] = useState<Array<ClientsType>>([]);

  const { setToast, closeDialog } = useUserDetailFormContext();
  const { setValue, watch, control } = useFormContext();

  const { user } = watch("info");
  const { client_id, role_ids } = watch("add_client");
  const clientListDropdown = watch("dropdowns.clientList");
  const roleListDropdown = watch("dropdowns.roleList");

  useEffect(() => {
    const getClientList = async () => {
      createClient()
        .from("clients")
        .select()
        .then((result) => {
          setValue("dropdowns.clientList", result?.data);
          setClientList(result?.data as Array<any>);
        });
    };

    const getRoleList = async () => {
      createClient()
        .from("roles")
        .select()
        .then((result) => {
          setValue("dropdowns.roleList", result?.data);
          setIsLoading(false);
        });
    };

    if (!clientList?.length) {
      setIsLoading(true);

      (async () => {
        await getClientList();
        await getRoleList();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      await addClient({
        user_id: user.user_id,
        client_id,
        role_ids: role_ids?.map((role: { value: string }) => role?.value),
      });

      const clientName = clientListDropdown?.find(
        (client: ClientsType) => client?.id === client_id
      )?.name;

      const roleNameList = roleListDropdown
        ?.filter((role: RoleType) =>
          role_ids?.some(
            (xRole: { label: string; value: string }) =>
              xRole?.value === role?.id
          )
        )
        ?.map((zRole: RoleType) => zRole?.name)
        .join(",");

      setToast(
        <div>
          {clientName} added on <strong>{user?.email}</strong> with role{" "}
          <strong>{roleNameList}</strong>.
        </div>
      );
      closeDialog();
    } catch (error: any) {
      setIsSubmitting(false);
      return setToast(<div>{error?.message}</div>);
    }
  };

  return (
    <>
      <Modal.Header>Link to New Client</Modal.Header>
      <Modal.Body>
        <TextInput
          value={search}
          disabled={client_id}
          placeholder="Search by client"
          onChange={(event) => {
            const filteredClients = clientListDropdown?.filter(
              (client: ClientsType) =>
                client?.name
                  ?.toLowerCase()
                  .includes(event.target.value.toLowerCase())
            );
            setClientList(filteredClients);
            setSearch(event.target.value);
          }}
        />
        <div className="mt-5">
          {isSubmitting && (
            <div className="absolute inset-0 z-50">
              <div className="flex justify-center items-center h-full bg-gray-200/40 cursor-not-allowed">
                <Spinner color="primary" />
              </div>
            </div>
          )}
          {isLoading && (
            <>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[260px] mb-2.5" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[560px] mb-2.5" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[560px] mb-2.5" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[160px] mb-2.5" />
            </>
          )}
          <div className="flex flex-col">
            {clientList?.map((client, key) => {
              const isSelectedClient = client_id === client?.id;
              return (
                <div
                  key={key}
                  className={`px-4 py-3 cursor-pointer rounded-md mb-2 border ${
                    isSelectedClient
                      ? "bg-primary-500 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => {
                    if (isSelectedClient) {
                      setValue("add_client.client_id", null);
                      setValue("add_client.role_ids", null);
                      setClientList(clientListDropdown);
                    } else {
                      setValue("add_client.client_id", client?.id);
                      setClientList([client]);
                    }

                    setValue("add_client.role_ids", null);
                    setSearch("");
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
          {client_id && (
            <Controller
              name="add_client.role_ids"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    value={!field?.value?.length ? null : field?.value}
                    primaryColor="primary-500"
                    classNames={{
                      menu: `relative z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700`,
                    }}
                    placeholder="Select client role"
                    isMultiple
                    options={roleListDropdown?.map((role: RoleType) => ({
                      label: role?.name,
                      value: role?.id,
                    }))}
                  />
                );
              }}
            />
          )}
        </div>
        <div className="mt-10">
          <Button
            color="primary"
            className="w-[150px] mx-auto"
            onClick={handleSubmit}
          >
            {isSubmitting ? "Adding client..." : "Add client"}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};
