import { Card } from "flowbite-react";
import { headers } from "next/headers";

import { UserListTable } from "./components/user-list-table";

const getUsers = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/user`,
      {
        method: "GET",
        headers: headers(),
        next: {
          tags: ["user_list"],
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching user list!");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
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
