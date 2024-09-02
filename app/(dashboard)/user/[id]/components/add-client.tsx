"use client";

import { Button, TextInput, Modal, Spinner, ModalProps } from "flowbite-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useFormContext, Controller } from "react-hook-form";
import Select from "react-tailwindcss-select";

import { updateUserRoles } from "app/actions/user/update-client";
import { ClientsType, RoleType } from "@/app/types";
import { useUserDetailFormContext } from "./user-detail-form";

import { useSupabaseSessionContext } from "@/app/components/Context/SupabaseSessionProvider";
import { useToastContext } from "@/app/components/Context/ToastProvider";

export const AddClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [clientList, setClientList] = useState<Array<ClientsType>>([]);

  const { showToast } = useToastContext();
  const { closeDialog } = useUserDetailFormContext();
  const {
    setValue,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useFormContext();
  const { user: userContext } = useSupabaseSessionContext();

  const { user } = watch("info");
  const { client_id, role_ids } = watch("add_client");
  const clientListDropdown = watch("dropdowns.clientList");
  const roleListDropdown = watch("dropdowns.roleList");

  useEffect(() => {
    const getClientList = async () => {
      createClient()
        .from("clients")
        .select()
        .eq("is_enabled", true)
        .then((result) => {
          setValue("dropdowns.clientList", result?.data);
          setClientList(result?.data as Array<any>);
          setIsLoading(false);
        });
    };

    const getRoleList = async () => {
      createClient()
        .from("roles")
        .select()
        .then((result) => {
          setValue("dropdowns.roleList", result?.data);
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
      if (!client_id) {
        setError("add_client.client_id", {
          message: "Please select a client to add.",
          type: "required",
        });

        return;
      }

      if (!role_ids?.length) {
        setError("add_client.role_ids", {
          message: "Please select a role to the user",
          type: "required",
        });

        return;
      }

      setIsSubmitting(true);

      const response = await updateUserRoles({
        client_id,
        user_id: user.user_id,
        staff_id: userContext?.id,
        role_ids: role_ids?.map((role: { value: string }) => role?.value),
        is_primary_contact: false,
      });

      if (!response.ok) throw response?.message;

      const clientName = clientListDropdown?.find(
        (client: ClientsType) => client?.client_id === client_id
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

      showToast({
        message: (
          <>
            <strong>{clientName}</strong> added on{" "}
            <strong>{user?.email}</strong> with role{" "}
            <strong>{roleNameList}</strong>.
          </>
        ),
      });
      closeDialog();
    } catch (error: any) {
      showToast({ message: error, error: true });
      setIsSubmitting(false);
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
            {(errors?.add_client as any)?.client_id?.message && (
              <small className="text-red-500 mb-1">
                {(errors?.add_client as any)?.client_id?.message}
              </small>
            )}
            {!isLoading && !clientList?.length ? (
              <div className="flex items-center justify-center border rounded-md border-gray-200 p-4 text-gray-900">
                No data to display
              </div>
            ) : (
              clientList?.map((client, key) => {
                const isSelectedClient = client_id === client?.id;
                const isAlreadyExisting = user?.clients?.some(
                  (xClient: ClientsType) => xClient?.id === client?.id
                );

                return (
                  <div
                    key={key}
                    className={`px-4 py-3 rounded-md mb-2 border ${
                      isSelectedClient
                        ? "bg-primary-500 text-white"
                        : "bg-white text-black"
                    } ${
                      isAlreadyExisting
                        ? "!bg-gray-200 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (isAlreadyExisting) return;

                      if (isSelectedClient) {
                        setValue("add_client.client_id", null);
                        setValue("add_client.role_ids", null);
                        setClientList(clientListDropdown);
                        setError("add_client.client_id", {
                          message: "Please select a client to add.",
                          type: "required",
                        });
                      } else {
                        setValue("add_client.client_id", client?.id);
                        setClientList([client]);
                        clearErrors("add_client.client_id");
                      }

                      clearErrors("add_client.role_ids");
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
              })
            )}
          </div>
          {client_id && (
            <Controller
              name="add_client.role_ids"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      {...field}
                      value={!field?.value?.length ? null : field?.value}
                      primaryColor="primary-500"
                      classNames={{
                        menu: `relative z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700`,
                        menuButton: () =>
                          "flex py-[2px] text-sm text-gray-900 border border-primary-500 rounded-lg shadow-sm bg-gray-50 focus:ring-1 focus:ring-primary-600",
                        listItem: ({ isSelected }: any) =>
                          `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded hover:bg-primary-500 hover:text-white ${
                            isSelected
                              ? "bg-primary-500 text-white"
                              : "text-gray-600"
                          } `,
                      }}
                      placeholder="Select client role"
                      isMultiple
                      options={roleListDropdown?.map((role: RoleType) => ({
                        label: role?.name,
                        value: role?.id,
                      }))}
                    />
                    {(errors?.add_client as any)?.role_ids?.message && (
                      <small className="text-red-500 mt-1">
                        {(errors?.add_client as any)?.role_ids?.message}
                      </small>
                    )}
                  </>
                );
              }}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          color="primary"
          disabled={!isDirty || !clientList?.length}
          className="w-[150px] mx-auto"
          onClick={handleSubmit}
        >
          {isSubmitting ? "Adding client..." : "Add client"}
        </Button>
      </Modal.Footer>
    </>
  );
};
