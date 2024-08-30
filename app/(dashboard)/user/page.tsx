import { Card } from "flowbite-react";

import { UserListTable } from "./components/user-list-table";
import { getAllUsers } from "@/app/actions/user/get-all-users";

const Page = async () => {
  const users = await getAllUsers();

  return (
    <div className="pt-16 pb-12">
      <Card>
        <UserListTable data={JSON.parse(JSON.stringify(users))} />
      </Card>
    </div>
  );
};

export default Page;
