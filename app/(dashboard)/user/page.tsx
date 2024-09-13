import { Metadata } from "next";
import { Card } from "flowbite-react";

import { getAllUsers } from "@/app/actions/user/get-all-users";
import { UserListWrapper } from "./components/user-list-wrapper";

export const metadata: Metadata = {
  title: "Everest Effect Portal - Users",
};

const Page = async () => {
  const users = await getAllUsers();

  return (
    <div className="pt-16 pb-12">
      <Card>
        <UserListWrapper data={JSON.parse(JSON.stringify(users))} />
      </Card>
    </div>
  );
};

export default Page;
