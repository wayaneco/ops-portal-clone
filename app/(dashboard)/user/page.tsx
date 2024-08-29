"use client";

import { useState, useEffect } from "react";
import { Card } from "flowbite-react";

import { UserListTable } from "./components/user-list-table";

import { UserDetailType } from "@/app/types";
import { useRetriggerContextProvider } from "@/app/components/Context/RetriggerProvider";

const Page = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [users, setUsers] = useState<Array<UserDetailType>>([]);

  const { refreshUserList } = useRetriggerContextProvider();

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
    setIsFetching(false);
  };

  useEffect(() => {
    getUsers();
  }, [refreshUserList]);

  return (
    <div className="pt-16 pb-12">
      <Card>
        <UserListTable data={users} isFetching={isFetching} />
      </Card>
    </div>
  );
};

export default Page;
