import { createClient } from "@/utils/supabase/client";
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
  // const response = await fetch("http://localhost:3000/api/user", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const supabase = createClient();

  const { data: usersList } = await supabase
    .from("users_data_view")
    .select("user_id, name, email");
  console.log(usersList, "userList here");

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
              {usersList?.map(
                (item: {
                  user_id: string;
                  name: string;
                  email: string;
                  privilege: Array<string>;
                }) => (
                  <TableRow key={item?.user_id} className="bg-white">
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {item?.privilege?.map((p: string, i: number) => (
                          <Badge key={i} className="w-fit" color="primary">
                            {p}
                          </Badge>
                        ))}
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
                )
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
