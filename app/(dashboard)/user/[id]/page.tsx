import * as React from "react";

import { UserDetailForm } from "./components/user-detail-form";
import { getUserById } from "@/app/actions/user/get-user-by-id";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await getUserById(id);

  console.log("======== USER ID", user);
  return (
    <div className="py-8 bg-gray-200">
      <UserDetailForm data={JSON.parse(JSON.stringify(user))} />
    </div>
  );
};

export default Page;
