/* eslint-disable react/display-name */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Modal,
  Checkbox,
  Label,
  FloatingLabel,
} from "flowbite-react";

import { useIsFirstRender } from "@/app/hooks/isFirstRender";
import { UserDetailType, ClientsType } from "@/app/types";
import { TableSkeleton } from "@/app/components/Skeleton";
import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { ROLE_COMPANY_ADMIN, ROLE_NETWORK_ADMIN } from "@/app/constant";

import { AddUser } from "./add-user";

type UserListTableProps = {
  data: Array<UserDetailType>;
  refetch: () => void;
};

export const UserListTable = (props: UserListTableProps) => {
  const { data = [], refetch } = props;
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [isShowAllUsers, setIsShowAllUsers] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { currentPrivilege, selectedClient, hasAdminRole } =
    useUserClientProviderContext();

  const isFirstRender = useIsFirstRender();

  const userList = useMemo(() => {
    if (isShowAllUsers) {
      if (search) {
        const searchByName = data?.filter((user: UserDetailType) =>
          `${user?.first_name || ""} ${user?.middle_name || ""} ${
            user?.last_name || ""
          }`
            .toLowerCase()
            .includes(search)
        );

        const searchByEmail = data?.filter((user: UserDetailType) =>
          user?.email.toLowerCase().includes(search)
        );

        return Array.from(new Set([...searchByName, ...searchByEmail]));
      }

      return data;
    } else {
      const filteredByClient = data?.filter((user) =>
        user?.clients?.some((client) => client?.id === selectedClient)
      );

      if (search) {
        const searchByName = filteredByClient?.filter((user: UserDetailType) =>
          `${user?.first_name || ""} ${user?.middle_name || ""} ${
            user?.last_name || ""
          }`
            ?.toLowerCase()
            .includes(search.toLowerCase())
        );
        const searchByEmail = filteredByClient?.filter((user: UserDetailType) =>
          user?.email?.toLowerCase().includes(search.toLowerCase())
        );

        return Array.from(new Set([...searchByName, ...searchByEmail]));
      }

      return filteredByClient;
    }
  }, [data, search, selectedClient, isShowAllUsers]);

  if (isFirstRender) return <TableSkeleton />;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-[450px]">
          <FloatingLabel
            variant="outlined"
            label="Search"
            className="text-primary-500 border-primary-500 focus:border-primary-500 peer-focus:text-primary-500"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        {hasAdminRole && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="showAllUsers"
              checked={isShowAllUsers}
              color="primary"
              size={24}
              className="cursor-pointer"
              onChange={() => setIsShowAllUsers((prev) => !prev)}
            />
            <Label
              htmlFor="showAllUsers"
              color="primary"
              className="flex cursor-pointer  text-gray-600"
            >
              Show All Users
            </Label>
          </div>
        )}
      </div>
      <div className="mt-5 overflow-x-auto overflow-y-auto border border-gray-100">
        <div className="max-h-[calc(100vh-440px)]">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="bg-primary-500 text-white sticky top-0 z-10">
                Name
              </TableHeadCell>
              <TableHeadCell className="bg-primary-500 text-white sticky top-0 z-10">
                Email
              </TableHeadCell>
              {!isShowAllUsers && (
                <TableHeadCell className="bg-primary-500 text-white sticky top-0 z-10">
                  Clients
                </TableHeadCell>
              )}
            </TableHead>
            {!userList?.length ? (
              <div className="h-11 relative table-footer-group">
                <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                  <div>No data found</div>
                </div>
              </div>
            ) : (
              <TableBody className="divide-y">
                {userList?.map((user: UserDetailType) => (
                  <TableRow
                    key={user?.user_id}
                    className="bg-white cursor-pointer"
                    onClick={() => router.push(`/user/${user?.user_id}`)}
                  >
                    <TableCell>{`${user.first_name || ""} ${
                      user.middle_name || ""
                    } ${user.last_name || ""}`}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    {!isShowAllUsers && (
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          {user?.clients?.map(
                            (client: ClientsType, i: number) => {
                              return (
                                <Badge key={i} className="w-fit" color="gray">
                                  {client?.name}
                                </Badge>
                              );
                            }
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
      {currentPrivilege?.some((priv) =>
        [ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN].includes(priv)
      ) && (
        <div className="mt-5">
          <Button
            type="button"
            color="primary"
            onClick={() => setShowModal(true)}
          >
            Add user
          </Button>
        </div>
      )}

      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <AddUser
            close={() => {
              refetch();
              setShowModal(false);
            }}
          />
        </Modal>
      )}
    </>
  );
};
