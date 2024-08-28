import * as React from "react";
import { headers } from "next/headers";

import { UserDetailForm } from "./components/user-detail-form";

const Page = async function (props: { params: { id: string } }) {
  console.log('🚀 ~ props:', props);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/user/${props?.params?.id}`,
    {
      method: "GET",
      headers: headers(),
      next: {
        tags: ["user_details"],
      },
      cache: "no-cache",
    }
  );

  console.log('🚀 ~ response:', response);
  if (!response.ok) {
    throw new Error(`Failed to fetch user ${props?.params.id}`);
  }

  const data = await response.json();
  console.log('🚀 ~ data:', data);

  return (
    <div className="py-8 bg-gray-200">
      <UserDetailForm data={data} />
    </div>
  );
};

export default Page;
