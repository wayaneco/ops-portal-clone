import * as React from "react";

import { UserDetailForm } from "./components/user-detail-form";

const Page = async function (props: { params: { id: string } }) {
  const response = await fetch(
    `http://localhost:3000/api/user/${props?.params?.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["user_details"],
        revalidate: 0,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user ${props?.params.id}`);
  }

  const data = await response.json();

  return (
    <div className="py-8 bg-gray-200">
      <UserDetailForm data={data} />
    </div>
  );
};

export default Page;
