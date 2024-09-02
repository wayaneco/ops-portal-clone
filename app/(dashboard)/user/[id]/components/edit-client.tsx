import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, Label, Button, Modal, Spinner, HR } from "flowbite-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

import { updateUserRoles } from "app/actions/user/update-client";
import { useSupabaseSessionContext } from "@/app/components/Context/SupabaseSessionProvider";
import { Privileges, RoleType } from "@/app/types";
import { useUserDetailFormContext } from "./user-detail-form";
import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { ROLE_NETWORK_ADMIN } from "@/app/constant";

export const EditClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useFormContext();
  const { user: userContext } = useSupabaseSessionContext();
  const { currentPrivilege } = useUserClientProviderContext();
  const { setToast, closeDialog } = useUserDetailFormContext();

  const { user, client } = watch("info");
  const roleList = watch("dropdowns.roleList");
  const role_ids = watch("edit_client.role_ids");

  useEffect(() => {
    const getRoleList = async () => {
      setIsLoading(true);
      const { data } = await createClient().from("roles").select();
      setValue("dropdowns.roleList", data);
      setIsLoading(false);
    };

    if (!roleList.length) {
      getRoleList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    try {
      if (!role_ids?.length) {
        setError("edit_client.role_ids", {
          message: "Please select a role.",
          type: "required",
        });
        return;
      }
      setIsSubmitting(true);
      const roleIds = roleList
        ?.filter((role: RoleType) => role_ids?.includes(role?.name))
        .map((role: RoleType) => role?.id);

      const isPrimaryContactId = roleList?.find(
        (role: RoleType) => role?.name === "Primary Contact"
      );

      const response = await updateUserRoles({
        user_id: user?.user_id,
        client_id: client?.id,
        role_ids: roleIds,
        staff_id: userContext?.id,
        is_primary_contact: roleIds?.includes(isPrimaryContactId),
      });

      if (!response.ok) throw response?.message;

      setToast(
        <div>
          Editing of privileges for <strong>{client?.name}</strong> was
          successful.
        </div>
      );
      closeDialog();
    } catch (error: any) {
      setToast(<div>{error}</div>, true);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal.Header>{client?.name}</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-y-3">
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
          {(errors?.edit_client as any)?.role_ids?.message && (
            <small className="text-red-500 mb-1">
              {(errors?.edit_client as any)?.role_ids?.message}
            </small>
          )}
          {!isLoading && !roleList?.length ? (
            <div className="flex items-center justify-center border rounded-md border-gray-200 p-4 text-gray-900">
              No data to display
            </div>
          ) : (
            roleList
              ?.filter((role: { name: string }) => {
                if (currentPrivilege?.includes(ROLE_NETWORK_ADMIN)) {
                  return true;
                }

                return role?.name !== ROLE_NETWORK_ADMIN;
              })
              ?.map((role: RoleType) => {
                const isPrimaryContact = role?.name === "Primary Contact";

                return (
                  <>
                    {isPrimaryContact && <HR className="my-1" />}
                    <div key={role?.id} className="flex items-center gap-2">
                      <Controller
                        control={control}
                        name={`edit_client.role_ids`}
                        defaultValue={""}
                        render={() => {
                          const isChecked = role_ids?.includes(role?.name);

                          const isDisabled =
                            isPrimaryContact &&
                            (!user?.primary_phone || !user?.email);

                          return (
                            <>
                              <Checkbox
                                color="primary"
                                id={role?.id}
                                disabled={isDisabled}
                                className="w-5 h-5"
                                checked={isChecked}
                                onChange={() => {
                                  const cloneRoleIds = JSON.parse(
                                    JSON.stringify(role_ids)
                                  );

                                  if (isChecked) {
                                    const filteredRoleIds = cloneRoleIds.filter(
                                      (p: string) => p !== role?.name
                                    );

                                    setValue(
                                      "edit_client.role_ids",
                                      filteredRoleIds,
                                      { shouldDirty: true }
                                    );
                                    if (!filteredRoleIds?.length) {
                                      setError("edit_client.role_ids", {
                                        message: "Please select a role.",
                                        type: "required",
                                      });
                                    }
                                  } else {
                                    setValue(
                                      "edit_client.role_ids",
                                      [...cloneRoleIds, role?.name],
                                      { shouldDirty: true }
                                    );
                                    clearErrors("edit_client.role_ids");
                                  }
                                }}
                              />
                              <Label
                                className={`text-lg ${
                                  isDisabled
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                                htmlFor={role?.id}
                                disabled={isDisabled}
                              >
                                {role?.name}
                              </Label>
                              {isPrimaryContact && isDisabled && (
                                <small className="text-red-500">
                                  You need to update the user{" "}
                                  <strong>Email</strong> and{" "}
                                  <strong>Phone Number</strong>.
                                </small>
                              )}
                            </>
                          );
                        }}
                      />
                    </div>
                  </>
                );
              })
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="primary"
          className="w-[150px] mx-auto"
          disabled={!isDirty}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Modal.Footer>
    </>
  );
};
