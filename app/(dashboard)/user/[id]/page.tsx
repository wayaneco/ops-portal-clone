import * as React from "react";
import { headers } from "next/headers";

import { UserDetailForm } from "./components/user-detail-form";

const getUserDetail = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/user/${id}`,
      {
        method: "GET",
        headers: headers(),
        next: {
          tags: ["user_details"],
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user ${id}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await getUserDetail(id);

  console.log("======== USER ID", user);
  return (
    <div className="py-8 bg-gray-200">
      <UserDetailForm data={JSON.parse(JSON.stringify(user))} />
    </div>
  );
};

export default Page;
