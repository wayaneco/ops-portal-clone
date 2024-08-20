import { Card } from "flowbite-react";
import { headers } from "next/headers";

import { UserListTable } from "./components/user-list-table";

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: headers(),
    next: {
      tags: ["user_list"],
      revalidate: 200,
    },
    cache: "no-cache",
  });

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
