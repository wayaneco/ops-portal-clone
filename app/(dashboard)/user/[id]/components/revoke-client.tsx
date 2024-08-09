"use client";

import { Button, Modal } from "flowbite-react";
import { useFormContext } from "react-hook-form";

import { revokePrivilege } from "app/actions/user/revoke-privilege";

export const RevokeClient = () => {
  const { watch } = useFormContext();

  const { user, client } = watch("info");
  return (
    <>
      <Modal.Header>Revoke Access?</Modal.Header>
      <Modal.Body>
        <div className="flex items-center justify-center">
          <div className="text-center text-lg">
            Do you want to revoke access to <strong>{client?.name}</strong> for{" "}
            <strong>{user?.email}</strong>?
          </div>
        </div>
        <div className="mt-10 ">
          <Button
            color="primary"
            className="w-[150px] mx-auto"
            onClick={() => {
              revokePrivilege({
                user_id: user.user_id,
                client_id: client.id,
              });
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};
