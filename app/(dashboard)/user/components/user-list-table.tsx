"use client";

import { useState } from "react";
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
} from "flowbite-react";

import { useIsFirstRender } from "@/app/hooks/isFirstRender";
import { UserDetailType, ClientsType } from "@/app/types";
import { TableSkeleton } from "@/app/components/Skeleton";

type UserListTableProps = {
  data: Array<UserDetailType>;
};

export const UserListTable = (props: UserListTableProps) => {
  const { data = [] } = props;

  const [search, setSearch] = useState<string>("");
  const [userList, setUserList] = useState<Array<UserDetailType>>(data);

  const isFirstRender = useIsFirstRender();

  if (isFirstRender) {
    return <TableSkeleton />;
  }

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
      <div className="mt-10 overflow-x-auto border border-gray-100">
        <Table hoverable>
          <TableHead>
            <TableHeadCell className="bg-primary-500 text-white">
              Name
            </TableHeadCell>
            <TableHeadCell className="bg-primary-500 text-white">
              Email
            </TableHeadCell>
            <TableHeadCell className="bg-primary-500 text-white">
              Clients
            </TableHeadCell>
            <TableHeadCell className="w-32 bg-primary-500 text-white">
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
                      {item?.clients?.map((client: ClientsType, i: number) => {
                        return (
                          <Badge key={i} className="w-fit" color="primary">
                            {client?.name}
                          </Badge>
                        );
                      })}
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
      <div className="mt-5">
        <Button color="primary">Add user</Button>
      </div>
    </>
  );
};
