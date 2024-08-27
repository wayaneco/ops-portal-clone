"use client";

import { Button, Modal, Spinner } from "flowbite-react";
import { useFormContext } from "react-hook-form";

import { useSupabaseSessionContext } from "@/app/components/Context/SupabaseSessionProvider";

import { revokePrivilege } from "app/actions/user/revoke-privilege";
import { useState } from "react";
import { useUserDetailFormContext } from "./user-detail-form";

export const RevokeClient = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user: userContext } = useSupabaseSessionContext();
  const { setToast, closeDialog } = useUserDetailFormContext();
  const { watch } = useFormContext();

  const { user, client } = watch("info");

  return (
    <>
      <Modal.Header>Revoke Access?</Modal.Header>
      <Modal.Body>
        <div className="flex items-center justify-center">
          {isSubmitting && (
            <div className="absolute inset-0 z-50">
              <div className="flex justify-center items-center h-full bg-gray-200/40 cursor-not-allowed">
                <Spinner color="primary" />
              </div>
            </div>
          )}
          <div className="text-center text-lg">
            Do you want to revoke access to <strong>{client?.name}</strong> for{" "}
            <strong>{user?.email}</strong>?
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="primary"
          className="w-[150px] mx-auto"
          onClick={async () => {
            try {
              setIsSubmitting(true);
              await revokePrivilege({
                user_id: user?.user_id,
                client_id: client?.id,
                staff_id: userContext?.id,
              });

              setToast(
                <div>
                  <strong>{client?.name}</strong> has been revoke on{" "}
                  <strong>{user?.email}</strong>
                </div>
              );

              closeDialog();
            } catch (error) {
              setToast(<div>Failed to revoke</div>, true);

              setIsSubmitting(false);
            }
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </>
  );
};
