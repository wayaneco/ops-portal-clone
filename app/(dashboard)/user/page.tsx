"use client";

import { useState, useEffect } from "react";
import { Card } from "flowbite-react";

import { UserListTable } from "./components/user-list-table";

import { UserDetailType } from "@/app/types";

const Page = () => {
  const [users, setUsers] = useState<Array<UserDetailType>>([]);

  const getUsers = async () => {
    const response = await fetch(`/api/user`, {
      method: "GET",
      next: {
        tags: ["user_list"],
      },
      cache: "no-cache",
    });

    const data = await response.json();

    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="pt-16 pb-12">
      <Card>
        <UserListTable data={users} />
      </Card>
    </div>
  );
};

export default Page;
