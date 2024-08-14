import { ClientsType } from "@/app/types";
import {
  Avatar,
  Button,
  Card,
  TextInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

import TonisKitchen from "public/tonis.svg";

const Page = async function () {
  const response = await fetch("http://localhost:3000/api/company", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 0,
      tags: ["company_list"],
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    return <div>Error fetching data</div>;
  }

  const clientList = await response.json();

  return (
    <div className="py-16">
      <Card>
        <TextInput
          placeholder="Search by company"
          color="primary"
          className="w-[450px]"
        />
        <div className="mt-5">
          <div className="overflow-auto bg-gray-100">
            <div className="max-h-[calc(100vh-500px)]">
              <Table hoverable>
                <TableHead>
                  <TableHeadCell className="w-32 text-center bg-primary-500 text-white">
                    Logo
                  </TableHeadCell>
                  <TableHeadCell className="bg-primary-500 text-white">
                    Email
                  </TableHeadCell>
                  <TableHeadCell className="w-32 bg-primary-500 text-white">
                    <span className="sr-only">View</span>
                  </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {!clientList?.length ? (
                    <div> No DATA</div>
                  ) : (
                    clientList?.map((client: ClientsType) => (
                      <TableRow key={client?.id} className="bg-white">
                        <TableCell>
                          <div className="relative h-9 ">
                            <img
                              src={client?.logo_url}
                              alt={`${client?.name} logo`}
                            />
                          </div>
                        </TableCell>
                        <TableCell>{client?.name}</TableCell>
                        <TableCell>
                          <Link
                            href={`/company/${client.id}`}
                            className="text-yellow-500 underline cursor-pointer"
                          >
                            View
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Link href="/company/add">
            <Button color="primary">Add new</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Page;
