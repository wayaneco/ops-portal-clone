import { Metadata } from "next";
import * as React from "react";

import { UserDetailForm } from "./components/user-detail-form";
import { getUserById } from "@/app/actions/user/get-user-by-id";

export const metadata: Metadata = {
  title: "Everest Effect Portal - User Details",
};

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await getUserById(id);

  return (
    <div className="py-8 bg-gray-200">
      <UserDetailForm data={JSON.parse(JSON.stringify(user))} />
    </div>
  );
};

export default Page;
