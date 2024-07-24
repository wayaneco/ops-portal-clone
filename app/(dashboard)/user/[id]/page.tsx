"use client";
import * as React from "react";
import Image from "next/image";
import { Button, Card, Avatar, TextInput, Table, Badge } from "flowbite-react";
import { NextPage } from "next";
import Link from "next/link";

import { UpsertModal } from "./modal";

import { Privileges, UserDetailType } from "@/app/types/UserDetail";

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

export default function Page(props: NextPage & { params: { id: string } }) {
  const [modalOptions, setModalOptions] = React.useState<ModalOptionType>({
    data: null,
    show: false,
    modalContent: null,
  });

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
    <div className="py-8">
      <Link href="/user">
        <Button color="primary">BACK</Button>
      </Link>
      <div className="mt-5">
        <Card>
          <div className="flex">
            <Avatar
              img={(avatarProps) => (
                <div className="h-56 w-52">
                  <Image
                    {...avatarProps}
                    src="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                    alt={`User ${props?.params?.id} Profile`}
                    fill
                  />
                </div>
              )}
            />
            <div className="flex-1 mx-10">
              <form>
                <div className="flex flex-col gap-y-2">
                  <TextInput value="Mary Smith" disabled />
                  <TextInput value="msmith88@gmail.com" disabled />
                  <TextInput value="123-4567-890" disabled />
                  <TextInput value="Makati City, Southern Leyte" disabled />
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
                Reissue Policy
              </Button>
            </div>
          </div>
          <div className="mt-10">
            <div className="overflow-x-auto">
              <Table border={1}>
                <Table.Head>
                  <Table.HeadCell>Client</Table.HeadCell>
                  <Table.HeadCell>Privileges</Table.HeadCell>
                  <Table.HeadCell className="w-40 text-center">
                    Action
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  <Table.Row>
                    <Table.Cell>Toni&apos;s Kitchen</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Badge className="w-fit">Company Admin</Badge>
                        <Badge className="w-fit">Agent</Badge>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-x-2">
                        <Button
                          color="primary"
                          type="button"
                          onClick={() => {
                            handleOpenModal({
                              data: {
                                client: "Toni's Kitchen",
                                privileges: [
                                  Privileges.CompanyAdmin,
                                  Privileges.Agent,
                                ],
                              },
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
        </Card>
      </div>
      <UpsertModal
        modalContent={modalOptions.modalContent as ModalContentType}
        show={modalOptions.show}
        onClose={handleResetModal}
        data={modalOptions.data as UserDetailType["clients"][0]}
      />
    </div>
  );
}
