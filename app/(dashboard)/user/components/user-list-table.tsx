"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import {
  TextInput,
  Button,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Modal,
  Toast,
} from "flowbite-react";

import { useIsFirstRender } from "@/app/hooks/isFirstRender";
import { UserDetailType, ClientsType } from "@/app/types";
import { TableSkeleton } from "@/app/components/Skeleton";

import { AddUser } from "./add-user";

type UserListTableProps = {
  data: Array<UserDetailType>;
};

export type ToastStateType = {
  show: boolean;
  message: string | ReactNode;
  isError?: boolean;
};

export const UserListTable = (props: UserListTableProps) => {
  const { data = [] } = props;

  const [search, setSearch] = useState<string>("");
  const [toastState, setToastState] = useState<ToastStateType>({
    show: false,
    message: "",
    isError: false,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userList, setUserList] = useState<Array<UserDetailType>>(data);

  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (toastState.show) {
      timeout = setTimeout(() => {
        handleResetToast();
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [toastState.show]);

  const handleResetToast = () =>
    setToastState({
      show: false,
      message: "",
      isError: false,
    });

  if (isFirstRender) return <TableSkeleton />;

  return (
    <>
      <div className="flex justify-between items-center">
        <TextInput
          placeholder="Search by name"
          color="primary"
          className="w-[450px]"
          value={search}
          onChange={(event) => {
            const filteredClients = data?.filter((user: UserDetailType) =>
              `${user?.first_name || ""} ${user?.middle_name || ""} ${
                user?.last_name || ""
              }`
                ?.toLowerCase()
                .includes(event.target.value.toLowerCase())
            );
            setUserList(filteredClients);
            setSearch(event.target.value);
          }}
        />
        <Button color="primary">Show All Users</Button>
      </div>
      <div className="mt-10 overflow-x-auto overflow-y-auto border border-gray-100">
        <div className="max-h-[calc(100vh-440px)]">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="bg-primary-500 text-white sticky top-0 z-10">
                Name
              </TableHeadCell>
              <TableHeadCell className="bg-primary-500 text-white sticky top-0 z-10">
                Email
              </TableHeadCell>
              <TableHeadCell className="bg-primary-500 text-white sticky top-0 z-10">
                Clients
              </TableHeadCell>
              <TableHeadCell className="w-32 bg-primary-500 text-white sticky top-0 z-10">
                <span className="sr-only">View</span>
              </TableHeadCell>
            </TableHead>
            {!userList?.length ? (
              <div className="h-11 relative table-footer-group">
                <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                  <div>No data found</div>
                </div>
              </div>
            ) : (
              <TableBody className="divide-y">
                {userList?.map((item: UserDetailType) => (
                  <TableRow key={item?.user_id} className="bg-white">
                    <TableCell>{`${item.first_name || ""} ${
                      item.middle_name || ""
                    } ${item.last_name || ""}`}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">
                        {item?.clients?.map(
                          (client: ClientsType, i: number) => {
                            return (
                              <Badge key={i} className="w-fit" color="primary">
                                {client?.name}
                              </Badge>
                            );
                          }
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/user/${item.user_id}`}
                        className="text-yellow-500 underline cursor-pointer"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
      <div className="mt-5">
        <Button
          type="button"
          color="primary"
          onClick={() => setShowModal(true)}
        >
          Add user
        </Button>
      </div>
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <AddUser close={() => setShowModal(false)} setToast={setToastState} />
        </Modal>
      )}
      {toastState.show && (
        <Toast
          className={`fixed right-5 top-5 z-[9999] ${
            toastState?.isError ? "bg-red-500" : "bg-primary-500"
          }`}
        >
          <div className="ml-3 text-sm font-normal text-white">
            {toastState?.message}
          </div>
          <Toast.Toggle
            className={toastState?.isError ? "bg-red-500" : "bg-primary-500"}
            onClick={handleResetToast}
          />
        </Toast>
      )}
    </>
  );
};
