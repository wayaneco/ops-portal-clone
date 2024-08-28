/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/navigation";

import {
  TextInput,
  Table,
  Button,
  TableCell,
  TableHeadCell,
  Badge,
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

  if (isFirstRender || !data?.length) {
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
          setSearch(event.target.value);
        }}
      />
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
                      key={client?.client_id}
                      className="bg-white cursor-pointer"
                      onClick={() => router.push(`/company/${client?.id}`)}
                    >
                      <Table.Cell>
                        <div className="relative h-10 w-full">
                          <img
                            src={
                              !!client?.logo_url
                                ? client?.logo_url
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
      <div className="mt-5">
        <Link href="/company/add">
          <Button color="primary">Add new</Button>
        </Link>
      </div>
    </>
  );
};
