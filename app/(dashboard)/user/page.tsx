import { createClient } from "@/utils/supabase/server";
import {
  Button,
  Avatar,
  Table,
  Badge,
  TextInput,
  TableHeadCell,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Card,
} from "flowbite-react";
import Link from "next/link";

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userData = await response.json();

  return (
    <div className="py-16">
      <Card>
        <div className="flex justify-between items-center">
          <TextInput
            placeholder="Search by name"
            color="primary"
            className="w-[450px]"
          />
          <Button color="primary">Show All Users</Button>
        </div>
        <div className="mt-10 overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Privileges</TableHeadCell>
              <TableHeadCell className="w-32">
                <span className="sr-only">View</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {userData?.map(
                (item: {
                  id: number;
                  name: string;
                  email: string;
                  privilege: Array<string>;
                }) => (
                  <TableRow key={item?.id} className="bg-white">
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {item?.privilege.map((p: string, i: number) => (
                          <Badge key={i} className="w-fit" color="primary">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/user/${item.id}`}
                        className="text-yellow-500 underline cursor-pointer"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
