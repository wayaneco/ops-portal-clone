/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/navigation";

import {
  Table,
  Button,
  TableCell,
  TableHeadCell,
  Badge,
  FloatingLabel,
} from "flowbite-react";

import { ClientsType } from "@/app/types";
import { useIsFirstRender } from "@/hooks/isFirstRender";
import { TableSkeleton } from "@/app/components/Skeleton";

import * as ImagePlaceholder from "public/image-placeholder.jpg";

type CompanyListTableProps = {
  data: Array<ClientsType>;
};

export const CompanyListTable = (props: CompanyListTableProps) => {
  const { data = [] } = props;
  const router = useRouter();

  const [search, setSearch] = useState<string>("");

  const isFirstRender = useIsFirstRender();

  const clientList = useMemo(() => {
    if (search) {
      return data?.filter((client: ClientsType) =>
        client?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data;
  }, [data, search]);

  if (isFirstRender) {
    return <TableSkeleton />;
  }

  return (
    <>
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
      <div className="mt-5">
        <div className="overflow-auto bg-gray-100 border border-gray-100">
          <div className="max-h-[calc(100vh-440px)]">
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell className="w-32 text-center bg-primary-500 text-white sticky top-0 z-10">
                  Logo
                </Table.HeadCell>
                <Table.HeadCell className="bg-primary-500 text-white sticky top-0 z-10">
                  Name
                </Table.HeadCell>
                <TableHeadCell className="w-48 bg-primary-500 text-white sticky top-0 z-10 text-center">
                  Provision Status
                </TableHeadCell>
                <Table.HeadCell className="w-60 bg-primary-500 text-white sticky top-0 z-10 text-center">
                  Created At
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
                    <Table.Row
                      key={client?.id}
                      className="bg-white cursor-pointer"
                      onClick={() => router.push(`/company/${client?.id}`)}
                    >
                      <Table.Cell>
                        <div className="relative h-10 w-full">
                          <img
                            src={
                              !!client?.logo_url
                                ? `${client?.logo_url}?${new Date().getTime()}`
                                : ImagePlaceholder.default.src
                            }
                            alt={`${client?.name} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell>{client?.name}</Table.Cell>
                      <TableCell className="text-center font-bold">
                        <Badge
                          className="w-fit mx-auto"
                          color={client?.provisioning_status.toLowerCase()}
                        >
                          {client?.provisioning_status}
                        </Badge>
                      </TableCell>
                      <Table.Cell>
                        {moment(client.created_at).format(
                          "MMMM D, yyyy hh:mm A"
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              )}
            </Table>
          </div>
        </div>
      </div>
      <div className="mt-5 w-fit">
        <Link href="/company/add">
          <Button color="primary">Add new</Button>
        </Link>
      </div>
    </>
  );
};
