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
        cache: "no-cache",
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

const Page = async () => {
  const users = await getUsers();

  return (
    <div className="pt-16 pb-12">
      <Card>
        <UserListTable data={JSON.parse(JSON.stringify(users))} />
      </Card>
    </div>
  );
};

export default Page;
