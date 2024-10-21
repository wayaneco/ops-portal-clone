import { inviteUser } from "@/app/actions/email/invite";
import { useSupabaseSessionContext } from "@/app/components/Context/SupabaseSessionProvider";
import { useToastContext } from "@/app/components/Context/ToastProvider";
import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { Button, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useUserDetailFormContext } from "./user-detail-form";

export const Invite = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { selectedClient } = useUserClientProviderContext();
  const { closeDialog } = useUserDetailFormContext();
  const { showToast } = useToastContext();
  const { watch } = useFormContext();
  const { user } = watch("info");

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const currentClient = user?.clients?.find(
        (client: { id: string }) => client?.id === selectedClient
      );

      const { error } = await inviteUser({
        email: user?.email,
        full_name: `${user?.first_name || ""} ${user?.middle_name || ""} ${
          user?.last_name || ""
        }`,
        client: currentClient?.name,
        role: currentClient?.privileges,
      });

      if (error) throw error;

      showToast({
        message: `Invited successfully.`,
      });
      setIsSubmitting(false);
      closeDialog();
    } catch (_error) {
      showToast({
        message: _error as string,
        error: true,
      });
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Modal.Header>Send Invitation</Modal.Header>
      <Modal.Body>
        {isSubmitting && (
          <div className="absolute inset-0 z-50">
            <div className="flex justify-center items-center h-full bg-gray-200/40 cursor-not-allowed">
              <Spinner color="primary" />
            </div>
          </div>
        )}
        <div className="flex items-center justify-center">
          <div className="text-center text-lg">
            Send email invitation to <strong>{user?.email}</strong>?
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="primary"
          className="w-[150px] mx-auto"
          type="submit"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Modal.Footer>
    </>
  );
};
