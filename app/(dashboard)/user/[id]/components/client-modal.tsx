"use client";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  type ModalProps,
} from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";

import { ClientsType, UserDetailType } from "@/types/UserDetail";
import { FormProvider, useForm } from "react-hook-form";

import { ModalContentType } from "../types";
import { UserModalForm } from "./modal-body";
import { schema } from "./schema";

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
      dropdowns: {
        clientList: [],
        roleList: [],
      },
      add_client: {
        client_id: null,
        role_ids: [],
      },
      edit_client: {
        role_ids: client?.privileges?.map((role: string) => role),
      },
    },
    mode: "onChange",
    resolver: yupResolver(schema(modalContent)),
  });

  console.log(methods.formState.errors);

  return (
    <Modal show={show} onClose={onClose} {...otherProps}>
      <FormProvider {...methods}>
        <UserModalForm contentType={modalContent} />
      </FormProvider>
    </Modal>
  );
}
