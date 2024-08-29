import { Card } from "flowbite-react";
import { headers } from "next/headers";

import { UserListTable } from "./components/user-list-table";
import { UserDetailType } from "@/app/types";

import api from "utils/api";

const getUsers = async (): Promise<Array<UserDetailType>> => {
  const response = await api.get(`/api/user`, {
    headers: new Headers(headers()),
    next: {
      tags: ["user_list"],
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error fetching user list!");
  }

  const data = await response.json();

  return data;
};
export default async function Page() {
  const users = await getUsers();

  return (
    <div className="pt-16 pb-12">
      <Card>
        <UserListTable data={users} />
      </Card>
    </div>
  );
}

export const dynamic = "force-dynamic";
