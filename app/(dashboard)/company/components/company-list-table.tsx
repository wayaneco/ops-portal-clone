"use client";

import { useState } from "react";
import Link from "next/link";

import {
  TextInput,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "flowbite-react";

import { ClientsType } from "@/app/types";
import ImagePlaceholder from "public/image-placeholder.jpg";

type CompanyListTableProps = {
  data: Array<ClientsType>;
};

export const CompanyListTable = (props: CompanyListTableProps) => {
  const { data = [] } = props;
  const [search, setSearch] = useState<string>("");
  const [clientList, setClientList] = useState<Array<ClientsType>>(data);

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
            <Table hoverable className="shadow-md ">
              <TableHead>
                <TableHeadCell className="w-32 text-center bg-primary-500 text-white sticky top-0 z-10">
                  Logo
                </TableHeadCell>
                <TableHeadCell className="bg-primary-500 text-white sticky top-0 z-10">
                  Email
                </TableHeadCell>
                <TableHeadCell className="w-48 bg-primary-500 text-white sticky top-0 z-10 text-center">
                  Provision Status
                </TableHeadCell>
                <TableHeadCell className="w-32 bg-primary-500 text-white sticky top-0 z-10 text-center">
                  <div className="sr-only">View</div>
                </TableHeadCell>
              </TableHead>
              {!clientList?.length ? (
                <div className="h-11 relative table-footer-group">
                  <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                    <div>No data found</div>
                  </div>
                </div>
              ) : (
                <TableBody className="divide-y">
                  {clientList?.map((client: ClientsType) => (
                    <TableRow key={client?.id} className="bg-white">
                      <TableCell>
                        <div className="relative h-10 w-full">
                          <img
                            src={
                              client?.logo_url
                                ? client?.logo_url
                                : ImagePlaceholder
                            }
                            alt={`${client?.name} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{client?.name}</TableCell>
                      <TableCell className="text-center font-bold">
                        {client?.provisioning_status}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/company/${client.id}`}
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
      </div>
      <div className="mt-5">
        <Link href="/company/add">
          <Button color="primary">Add new</Button>
        </Link>
      </div>
    </>
  );
};
