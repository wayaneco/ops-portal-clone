"use client";

import { FloatingLabel, Button, Avatar, Table, Badge } from "flowbite-react";
import Link from "next/link";

const MOCKS = [
  {
    id: 1,
    name: "Mary Smith",
    email: "msmith88@gmail.com",
    privilege: ["Company Admin"],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@tonykitchen.com",
    privilege: ["Company Admin", "Agent"],
  },
  {
    id: 3,
    name: "Peter Miller",
    email: "pete@gmail.com",
    privilege: ["Agent"],
  },
  {
    id: 4,
    name: "Angel Miller",
    email: "angel@toniskitchen.com",
    privilege: ["Agent"],
  },
];

export default function Page() {
  return (
    <div className="py-14">
      <div className="flex justify-between items-center">
        <FloatingLabel
          label=""
          variant="outlined"
          placeholder="Search by name"
          className="w-[450px] border-blue-500 focus:outline-blue-400"
        />
        <Button color="blue">Show All Users</Button>
      </div>
      <div className="mt-10 overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Privileges</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {MOCKS.map((item) => (
              <Table.Row key={item?.id}>
                <Table.Cell>{item?.name}</Table.Cell>
                <Table.Cell>{item?.email}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    {item?.privilege.map((p, i) => (
                      <Badge key={i} className="w-fit">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    href={`/user/${item.id}`}
                    className="text-blue-500 underline cursor-pointer"
                  >
                    View
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
