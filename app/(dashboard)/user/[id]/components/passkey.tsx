import { Button, Modal } from "flowbite-react";
import { useFormContext } from "react-hook-form";

export const Passkey = () => {
  const { watch } = useFormContext();
  const { user } = watch("info");
  return (
    <>
      <Modal.Header>Send Invitation?</Modal.Header>
      <Modal.Body>
        <div className="flex items-center justify-center">
          <div className="text-center text-lg">
            Send passkey email invitation to <strong>{user?.email}</strong>?
          </div>
        </div>
        <div className="mt-10 ">
          <Button color="primary" className="w-[150px] mx-auto">
            Confirm
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};
