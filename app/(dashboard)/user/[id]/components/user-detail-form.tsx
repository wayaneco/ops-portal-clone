"use client";

import * as React from "react";
import Link from "next/link";
import { UserDetailType, ClientsType } from "@/app/types/UserDetail";
import {
  Button,
  Table,
  Badge,
  Toast,
  Card,
  Spinner,
  FloatingLabel,
} from "flowbite-react";

import { useIsFirstRender } from "@/app/hooks/isFirstRender";
import { SkeletonWithUserImage } from "@/app/components/Skeleton";
import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { useSupabaseSessionContext } from "@/app/components/Context/SupabaseSessionProvider";
import { convertFileToBase64 } from "@/utils/file/convertFileToBase64";
import { uploadFile } from "@/app/actions/user/upload-file";
import {
  ROLE_COMPANY_ADMIN,
  ROLE_NETWORK_ADMIN,
  ROLE_PRIMARY_CONTACT,
} from "@/app/constant";

import { UserDetailModal } from "./client-modal";
import { ModalContentType } from "../types";
import { useToastContext } from "@/app/components/Context/ToastProvider";

type UserDetailFormType = {
  data: UserDetailType;
};

type HandleOpenModalType = {
  data: UserDetailType | null;
  modalContent: ModalContentType;
  client?: ClientsType;
};

type UserDetailFormContextType = {
  closeDialog: () => void;
  user: UserDetailType;
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

// eslint-disable-next-line react/display-name
export const UserDetailForm = React.memo((props: UserDetailFormType) => {
  const { data } = props;

  const inputRef = React.useRef<HTMLInputElement>();
  const isFirstRender = useIsFirstRender();

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [modalOptions, setModalOptions] = React.useState<any>({
    show: false,
    modalContent: null,
    data: null,
    client: null,
  });

  const { showToast } = useToastContext();
  const { selectedClient, hasAdminRole, currentPrivilege } =
    useUserClientProviderContext();
  const { user: currentLoggedInUser } = useSupabaseSessionContext();

  const isSelfService = data?.user_id === currentLoggedInUser?.id;

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

  const isEnable = (expectedPrivilege: Array<any>) => {
    return currentPrivilege?.some((current) =>
      expectedPrivilege?.includes(current)
    );
  };

  const showActionColumn = (client: ClientsType) => {
    return (
      hasAdminRole ||
      (isSelfService &&
        selectedClient === client?.id &&
        client?.privileges?.some((priv) =>
          [ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN].includes(priv)
        )) ||
      (selectedClient === client?.id &&
        currentPrivilege?.some((priv) =>
          [ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN]?.includes(priv)
        ))
    );
  };

  if (isFirstRender || !data) return <SkeletonWithUserImage />;

  return (
    <UserDetailFormContext.Provider
      value={{
        closeDialog: handleResetModal,
        user: data,
      }}
    >
      <Link
        href={
          !isEnable([ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN]) ? `/` : "/user"
        }
      >
        <Button color="primary">BACK</Button>
      </Link>
      <div className="mt-5">
        <Card>
          <div className="flex">
            <div className="w-56 h-64">
              <div className="relative border h-full w-full overflow-hidden rounded-md bg-gray-100 group">
                {data?.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${data?.photo_url}?${new Date().getTime()}`}
                    alt={`${data?.first_name} Profile Photo`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="absolute inset-0 w-full h-full  text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
                <Button
                  type="button"
                  color="primary"
                  className="absolute py-2 px-3 w-4/5 bottom-2 ml-[50%] -translate-x-2/4 opacity-0 -z-10 transition-all group-hover:opacity-100 group-hover:z-10 [&>span]:p-0"
                  onClick={() => inputRef.current?.click()}
                >
                  Change photo
                </Button>
                <input
                  className="hidden"
                  type="file"
                  ref={inputRef as React.LegacyRef<HTMLInputElement>}
                  accept="image/**"
                  onChange={async (
                    event: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    if (!event?.currentTarget?.files![0]) return;
                    try {
                      setIsSubmitting(true);
                      const base64 = await convertFileToBase64(
                        event.currentTarget?.files[0]
                      );

                      const response = await uploadFile({
                        user_id: data?.user_id,
                        base64_file: base64 as string,
                      });

                      if (!response.ok) throw response?.message;

                      showToast({
                        message: "Update photo successfully",
                        error: false,
                      });
                      setIsSubmitting(false);
                    } catch (error) {
                      showToast({
                        message: error as string,
                        error: false,
                      });
                      setIsSubmitting(false);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex-1 mx-10">
              <form>
                <div className="flex flex-col gap-y-2">
                  <FloatingLabel
                    variant="outlined"
                    label="Name"
                    value={`${data?.first_name || ""} ${
                      data?.middle_name || ""
                    } ${data?.last_name || ""}`
                      .replace(/\s+/g, " ")
                      .trim()}
                    disabled
                  />
                  <FloatingLabel
                    variant="outlined"
                    label="Email"
                    value={data?.email}
                    disabled
                  />
                  <FloatingLabel
                    variant="outlined"
                    label="Phone Number"
                    value={data?.primary_phone}
                    disabled
                  />
                  <FloatingLabel
                    variant="outlined"
                    label="Address"
                    value={[
                      data?.addr_line_1 || "",
                      data?.addr_line_2 || "",
                      data?.city || "",
                      data?.state_province_region || "",
                      data?.country || "",
                      data?.zip_code || "",
                    ]
                      .filter(Boolean)
                      .join(", ")}
                    disabled
                  />
                </div>
              </form>
            </div>
            <div className="flex gap-x-2 h-fit">
              {(currentPrivilege?.some((priv) =>
                [ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN]?.includes(priv)
              ) ||
                isSelfService) && (
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
                  {isSelfService ? "Edit Profile" : "Edit User"}
                </Button>
              )}
              {hasAdminRole && (
                <Button
                  color="primary"
                  className="h-fit"
                  onClick={() =>
                    handleOpenModal({
                      data,
                      modalContent: ModalContentType.INVITE,
                    })
                  }
                >
                  Reinvite
                </Button>
              )}
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
                  <Table.HeadCell className="w-56 text-center bg-primary-500 text-white">
                    Primary Contact
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
                            {client.privileges
                              ?.filter((priv) => priv !== ROLE_PRIMARY_CONTACT)
                              ?.map((privilege, i) => (
                                <Badge
                                  key={i}
                                  className="w-fit"
                                  color="primary"
                                >
                                  {privilege}
                                </Badge>
                              ))}
                          </div>
                        </Table.Cell>
                        <Table.Cell className="text-center">
                          {client.privileges?.some(
                            (xPriv) => xPriv === ROLE_PRIMARY_CONTACT
                          ) ? (
                            <div className="flex justify-center">
                              <svg
                                className="w-6 h-6 text-primary-500 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 11.917 9.724 16.5 19 7.5"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <svg
                                className="w-6 h-6 text-red-500 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                            </div>
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          {showActionColumn(client) && (
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
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                )}
              </Table>
            </div>
            {hasAdminRole && (
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
            )}
          </div>
          {isSubmitting && (
            <div className="absolute inset-0 z-50">
              <div className="flex justify-center items-center h-full bg-gray-200/40 cursor-not-allowed">
                <Spinner color="primary" />
              </div>
            </div>
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
});
