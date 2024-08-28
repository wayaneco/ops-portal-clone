"use client";

import * as React from "react";
import { headers } from "next/headers";

import { UserDetailForm } from "./components/user-detail-form";
import { UserDetailType } from "@/app/types";

const Page = function (props: { params: { id: string } }) {
  const [data, setData] = React.useState<UserDetailType | null>(null);
  // const response = await getUserDetails(props?.params?.id);

  // if (!response.ok) {
  //   throw new Error(`Failed to fetch user ${props?.params.id}`);
  // }

  // const data = await response.json();

  const getUserDetails = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/user/${id}`,
      {
        method: "GET",
        next: {
          tags: ["user_details"],
        },
        cache: "no-cache",
      }
    );

    const data = await response.json();
    setData(data);
  };

  React.useEffect(() => {
    if (props?.params?.id) {
      getUserDetails(props?.params?.id);
    }
  }, [props?.params?.id]);

  return (
    <div className="py-8 bg-gray-200">
      <UserDetailForm data={data as UserDetailType} />
    </div>
  );
};

export default Page;
