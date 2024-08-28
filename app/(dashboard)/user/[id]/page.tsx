"use client";

import { useState, useEffect } from "react";

import { UserDetailForm } from "./components/user-detail-form";
import { UserDetailType } from "@/app/types";

const Page = (props: { params: { id: string } }) => {
  const [userDetail, setUserDetail] = useState<UserDetailType | null>(null);

  const getUserDetails = async (id: string) => {
    const response = await fetch(`/api/user/${id}`, {
      method: "GET",
      next: {
        tags: ["user_details"],
      },
      cache: "no-cache",
    });

    const data = await response.json();

    setUserDetail(data);
  };

  useEffect(() => {
    if (props?.params?.id) {
      getUserDetails(props?.params?.id);
    }
  }, [props?.params?.id]);

  return (
    <div className="py-8 bg-gray-200">
      <UserDetailForm data={userDetail as UserDetailType} />
    </div>
  );
};

export default Page;
