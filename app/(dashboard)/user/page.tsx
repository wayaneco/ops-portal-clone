import { Card } from "flowbite-react";
import { headers } from "next/headers";

import { UserListTable } from "./components/user-list-table";

import api from "utils/api";

const getUsers = async () => {
  const response = await api.get(`/api/user`, {
    headers: headers(),
    next: {
      tags: ["user_list"],
    },
    cache: "no-store",
  });

  return response;
};
export default async function Page() {
  const response = await getUsers();

  if (!response.ok) {
    throw new Error("Error fetching user list!");
  }

  const usersList = await response.json();

  return (
    <div className="pt-16 pb-12">
      <Card>
        <UserListTable data={usersList} />
      </Card>
    </div>
  );
}
