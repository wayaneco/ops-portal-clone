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
      edit_user: {
        first_name: user?.first_name ?? "",
        last_name: user?.last_name ?? "",
        middle_name: user?.middle_name ?? "",
        preferred_name: user?.preferred_name ?? "",
        email: user?.email ?? "",
        primary_phone: user?.primary_phone ?? "",
        addr_line_1: user?.addr_line_1 ?? "",
        addr_line_2: user?.addr_line_2 ?? "",
        zip_code: user?.zip_code ?? "",
        city: user?.city ?? "",
        country: user?.country ?? "",
        state_province_region: user?.state_province_region ?? "",
      },
    },
    mode: "onChange",
    resolver: yupResolver(schema(modalContent)),
  });

  return (
    <Modal show={show} onClose={onClose} {...otherProps}>
      <FormProvider {...methods}>
        <UserModalForm contentType={modalContent} />
      </FormProvider>
    </Modal>
  );
}
