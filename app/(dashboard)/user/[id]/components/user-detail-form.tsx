"use client";

import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { UserDetailType, ClientsType } from "@/app/types/UserDetail";
import {
  Button,
  type AvatarImageProps,
  Avatar,
  TextInput,
  Table,
  Badge,
  Toast,
  Card,
} from "flowbite-react";

import { UserDetailModal } from "./client-modal";
import { ModalContentType } from "../types";
import { useIsFirstRender } from "@/app/hooks/isFirstRender";
import { SkeletonWithUserImage } from "@/app/components/Skeleton";

type UserDetailFormType = {
  data: UserDetailType;
};

type HandleOpenModalType = {
  data: UserDetailType | null;
  modalContent: ModalContentType;
  client?: ClientsType;
};

type UserDetailFormContextType = {
  setToast: (message: ToastType["message"], isError?: boolean) => void;
  closeDialog: () => void;
};

type ToastType = {
  show: boolean;
  message: string | React.ReactNode;
  error: boolean;
};

const UserDetailFormContext = React.createContext<
  UserDetailFormContextType | undefined
>(undefined);

export const useUserDetailFormContext = () => {
  const context = React.useContext<UserDetailFormContextType | undefined>(
    UserDetailFormContext
  );

  if (!context) {
    throw new Error(
      "useUserDetailFormContext should be used within the UserDetailFormContextProvider!"
    );
  }

  return context;
};

export function UserDetailForm(props: UserDetailFormType) {
  const { data } = props;

  const isFirstRender = useIsFirstRender();

  const [toast, setToast] = React.useState<ToastType>({
    show: false,
    message: "",
    error: false,
  });
  const [modalOptions, setModalOptions] = React.useState<any>({
    show: false,
    modalContent: null,
    data: null,
    client: null,
  });

  const handleOpenModal = ({
    data,
    modalContent,
    client,
  }: HandleOpenModalType) => {
    setModalOptions({
      show: true,
      modalContent,
      data,
      client,
    });
  };

  const handleResetModal = () => {
    setModalOptions({
      show: false,
      data: null,
      modalContent: null,
      client: null,
    });
  };

  const handleSetToast = (
    message: string | React.ReactNode,
    isError?: boolean
  ) => {
    setToast({
      show: true,
      message,
      error: isError ?? false,
    });
  };

  const handleResetToast = () =>
    setToast({ show: false, message: "", error: false });

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (toast.show) {
      timeout = setTimeout(() => {
        handleResetToast();
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [toast.show]);

  if (isFirstRender) return <SkeletonWithUserImage />;

  return (
    <UserDetailFormContext.Provider
      value={{
        setToast: (message: ToastType["message"], isError?: boolean) => {
          handleSetToast(message, isError);
        },
        closeDialog: handleResetModal,
      }}
    >
      <Link href="/user">
        <Button color="primary">BACK</Button>
      </Link>
      <div className="mt-5">
        <Card>
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
                    value={`${data?.first_name || ""} ${
                      data?.middle_name || ""
                    } ${data?.last_name || ""}`}
                    disabled
                  />
                  <TextInput value={data?.email} disabled />
                  <TextInput value={data?.primary_phone} disabled />
                  <TextInput
                    value={`${data?.addr_line_1 || ""} ${
                      data?.addr_line_2 || ""
                    } ${data?.city || ""} ${data?.state_province_region || ""}`}
                    disabled
                  />
                </div>
              </form>
            </div>
            <div className="flex gap-x-2 h-fit">
              <Button
                color="primary"
                className="h-fit"
                onClick={() =>
                  handleOpenModal({
                    data,
                    modalContent: ModalContentType.EDIT_USER,
                  })
                }
              >
                Edit User
              </Button>
              <Button
                color="primary"
                className="h-fit"
                onClick={() =>
                  handleOpenModal({
                    data,
                    modalContent: ModalContentType.PASSKEY,
                  })
                }
              >
                Reissue Passkey
              </Button>
            </div>
          </div>
          <div className="mt-10">
            <div className="overflow-x-auto rounded-md border border-gray-100">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell className="bg-primary-500 text-white">
                    Clients
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-primary-500 text-white">
                    Privileges
                  </Table.HeadCell>
                  <Table.HeadCell className="w-40 text-center bg-primary-500 text-white">
                    Action
                  </Table.HeadCell>
                </Table.Head>
                {!data?.clients?.length ? (
                  <div className="h-11 relative table-footer-group">
                    <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                      <div>No data found</div>
                    </div>
                  </div>
                ) : (
                  <Table.Body className="divide-y">
                    {data?.clients?.map((client: ClientsType, idx) => (
                      <Table.Row key={idx}>
                        <Table.Cell>{client.name}</Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-2">
                            {client.privileges?.map((privilege, i) => (
                              <Badge key={i} className="w-fit" color="primary">
                                {privilege}
                              </Badge>
                            ))}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-x-2">
                            <Button
                              color="primary"
                              type="button"
                              onClick={() => {
                                handleOpenModal({
                                  data: data,
                                  client,
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
                                  data,
                                  client,
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
                )}
              </Table>
            </div>
            <div className="mt-10">
              <Button
                color="primary"
                onClick={() =>
                  handleOpenModal({
                    data,
                    modalContent: ModalContentType.ADD,
                  })
                }
              >
                Add new
              </Button>
            </div>
          </div>
          {toast.show && (
            <Toast
              className={`fixed right-5 top-5 z-[9999] ${
                toast?.error ? "bg-red-600" : "bg-primary-500"
              }`}
            >
              <div className="ml-3 text-sm font-normal text-white">
                {toast?.message}
              </div>
              <Toast.Toggle
                className={toast?.error ? "bg-red-600" : "bg-primary-500"}
                onClick={handleResetToast}
              />
            </Toast>
          )}
          {modalOptions?.show && (
            <UserDetailModal
              modalContent={modalOptions.modalContent}
              show={modalOptions.show}
              onClose={handleResetModal}
              data={modalOptions.data}
              client={modalOptions.client}
            />
          )}
        </Card>
      </div>
    </UserDetailFormContext.Provider>
  );
}
