"use client";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  type ModalProps,
} from "flowbite-react";

import { ClientsType, UserDetailType } from "@/types/UserDetail";
import { FormProvider, useForm } from "react-hook-form";

import { ModalContentType } from "../types";
import { UserModalForm } from "./modal-body";

type UserDetailModal = ModalProps & {
  modalContent: ModalContentType;
  data: UserDetailType;
  client: ClientsType;
};
export function UserDetailModal(props: UserDetailModal) {
  const {
    show,
    onClose,
    modalContent,
    data: user,
    client,
    ...otherProps
  } = props;
  const methods = useForm({
    defaultValues: {
      info: { user, client },
      privilege: client?.privileges?.map((p: string) => p),
      clients: [],
    },
  });

  return (
    <Modal show={show} onClose={onClose} {...otherProps}>
      <FormProvider {...methods}>
        <UserModalForm contentType={modalContent} />
      </FormProvider>
    </Modal>
  );
}

const getModalHeader = (content: ModalContentType, client: string): string => {
  let text: string;

  switch (content) {
    case ModalContentType.ADD:
      text = "Link to New Client";
      break;
    case ModalContentType.EDIT:
      text = client;
      break;

    case ModalContentType.REVOKE:
      text = "Revoke Access";
      break;
    case ModalContentType.PASSKEY:
      text = "Send Invation";
      break;
    default:
      text = "";
      break;
  }

  return text;
};
