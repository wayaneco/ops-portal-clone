"use client";

import { Button, Modal, Spinner } from "flowbite-react";
import { useFormContext } from "react-hook-form";

import { useSupabaseSessionContext } from "@/app/components/Context/SupabaseSessionProvider";
import { useToastContext } from "@/app/components/Context/ToastProvider";

import { revokePrivilege } from "app/actions/user/revoke-privilege";
import { useState } from "react";
import { useUserDetailFormContext } from "./user-detail-form";

export const RevokeClient = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { showToast } = useToastContext();
  const { user: userContext } = useSupabaseSessionContext();
  const { closeDialog } = useUserDetailFormContext();
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
          <div className="text-center text-lg text-gray-600">
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
            setIsSubmitting(true);
            try {
              const response = await revokePrivilege({
                user_id: user?.user_id,
                client_id: client?.id,
                staff_id: userContext?.id,
              });

              if (!response.ok) throw response?.message;

              showToast({
                message: (
                  <>
                    <strong>{client?.name}</strong> has been revoked on{" "}
                    <strong>{user?.email}</strong>
                  </>
                ),
              });
              closeDialog();
            } catch (error) {
              setIsSubmitting(false);
              showToast({
                message: "Failed to revoke.",
                error: true,
              });
            }
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </>
  );
};
