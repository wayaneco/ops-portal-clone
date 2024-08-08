"use client";

import Image from "next/image";
import * as React from "react";
import { UserDetailType, ClientsType } from "@/app/types/UserDetail";
import {
  Button,
  type AvatarImageProps,
  Avatar,
  TextInput,
  Table,
  Badge,
} from "flowbite-react";
import { UpsertModal } from "../modal";

enum ModalContentType {
  ADD,
  EDIT,
  REVOKE,
  PASSKEY,
}

type ModalOptionType = {
  data: UserDetailType["clients"][0] | null;
  show: boolean;
  modalContent: ModalContentType | null;
};

type ContentType = {
  data: UserDetailType;
};

export function MainBody(props: ContentType) {
  const [modalOptions, setModalOptions] = React.useState<ModalOptionType>({
    data: null,
    show: false,
    modalContent: null,
  });

  const { data } = props;

  const handleOpenModal = ({
    data,
    modalContent,
  }: {
    data: UserDetailType["clients"][0] | null;
    modalContent: ModalOptionType["modalContent"];
  }) => {
    setModalOptions({
      data,
      show: true,
      modalContent,
    });
  };

  const handleResetModal = () => {
    setModalOptions({
      data: null,
      show: false,
      modalContent: null,
    });
  };

  return (
    <>
      <div className="flex">
        <Avatar
          img={(avatarProps: AvatarImageProps) => (
            <div className="h-56 w-52">
              <Image
                {...avatarProps}
                src="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                alt={`User Profile`}
                fill
              />
            </div>
          )}
        />
        <div className="flex-1 mx-10">
          <form>
            <div className="flex flex-col gap-y-2">
              <TextInput
                value={`${data?.first_name} ${data?.middle_name} ${data?.last_name}`}
                disabled
              />
              <TextInput value={data?.email} disabled />
              <TextInput value={data?.phoneNumber} disabled />
              <TextInput
                value={`${data?.line_1} ${data?.line_2} ${data?.city} ${data?.state_province_region}`}
                disabled
              />
            </div>
          </form>
        </div>
        <div>
          <Button
            color="primary"
            onClick={() =>
              handleOpenModal({
                data: null,
                modalContent: ModalContentType.PASSKEY,
              })
            }
          >
            Reissue Passkey
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <div className="overflow-x-auto">
          <Table border={1}>
            <Table.Head>
              <Table.HeadCell>Clients</Table.HeadCell>
              <Table.HeadCell>Privileges</Table.HeadCell>
              <Table.HeadCell className="w-40 text-center">
                Action
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data?.clients?.map((client: ClientsType, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell>{client.name}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      {client.privileges?.map(
                        (privilege: any, i: React.Key | null | undefined) => (
                          <Badge key={i} className="w-fit" color="primary">
                            {privilege}
                          </Badge>
                        )
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-x-2">
                      <Button
                        color="primary"
                        type="button"
                        onClick={() => {
                          handleOpenModal({
                            data: client,
                            modalContent: ModalContentType.EDIT,
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="primary"
                        type="button"
                        onClick={() => {
                          handleOpenModal({
                            data: null,
                            modalContent: ModalContentType.REVOKE,
                          });
                        }}
                      >
                        Revoke
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="mt-10">
          <Button
            color="primary"
            onClick={() =>
              handleOpenModal({
                data: null,
                modalContent: ModalContentType.ADD,
              })
            }
          >
            Add new
          </Button>
        </div>
      </div>
      <UpsertModal
        modalContent={modalOptions.modalContent as ModalContentType}
        show={modalOptions.show}
        onClose={handleResetModal}
        data={modalOptions.data as UserDetailType["clients"][0]}
      />
    </>
  );
}
