/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";

import {
  TextInput,
  Table,
  Button,
  Card,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import { ClientsType } from "@/app/types";
import { useIsFirstRender } from "@/hooks/isFirstRender";
import { TableSkeleton } from "@/app/components/Skeleton";

type CompanyListTableProps = {
  data: Array<ClientsType>;
};

export const CompanyListTable = (props: CompanyListTableProps) => {
  const { data = [] } = props;
  const [search, setSearch] = useState<string>("");
  const [clientList, setClientList] = useState<Array<ClientsType>>(data);

  const isFirstRender = useIsFirstRender();

  if (isFirstRender) {
    return <TableSkeleton />;
  }

  return (
    <>
      <TextInput
        placeholder="Search by company"
        color="primary"
        className="w-[450px]"
        value={search}
        onChange={(event) => {
          const filteredClients = data?.filter((client: ClientsType) =>
            client?.name
              ?.toLowerCase()
              .includes(event.target.value.toLowerCase())
          );
          setClientList(filteredClients);
          setSearch(event.target.value);
        }}
      />
      <div className="mt-5">
        <div className="overflow-auto bg-gray-100 border border-gray-100">
          <div className="max-h-[calc(100vh-440px)] ">
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell className="w-32 text-center bg-primary-500 text-white sticky top-0 z-10">
                  Logo
                </Table.HeadCell>
                <Table.HeadCell className="bg-primary-500 text-white sticky top-0 z-10">
                  Name
                </Table.HeadCell>
                <Table.HeadCell className="w-60 bg-primary-500 text-white sticky top-0 z-10">
                  Created At
                </Table.HeadCell>
                <Table.HeadCell className="w-32 bg-primary-500 text-white sticky top-0 z-10">
                  <span className="sr-only">View</span>
                </Table.HeadCell>
              </Table.Head>
              {!clientList?.length ? (
                <div className="h-11 relative table-footer-group">
                  <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                    <div>No data found</div>
                  </div>
                </div>
              ) : (
                <Table.Body className="divide-y">
                  {clientList?.map((client: ClientsType) => (
                    <Table.Row key={client?.client_id} className="bg-white">
                      <Table.Cell>
                        <div className="relative h-10 w-full">
                          <img
                            src={client?.logo_url}
                            alt={`${client?.name} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell>{client?.name}</Table.Cell>
                      <Table.Cell>
                        {moment(client.created_at).format(
                          "MMMM D, yyyy hh:mm A"
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          href={`/company/${client.client_id}`}
                          className="text-yellow-500 underline cursor-pointer"
                        >
                          View
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              )}
            </Table>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Link href="/company/add">
          <Button color="primary">Add new</Button>
        </Link>
      </div>
    </>
  );
};
