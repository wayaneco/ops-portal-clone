"use client";

import { Card } from "flowbite-react";

import { CompanyListTable } from "./components/company-list-table";
import { useEffect, useState } from "react";
import { ClientsType } from "@/app/types";

const Page = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [clients, setClients] = useState<Array<ClientsType>>([]);

  const getCompany = async () => {
    const response = await fetch(`/api/company`, {
      method: "GET",
      next: {
        tags: ["company_list"],
      },
      cache: "no-cache",
    });

    const data = await response.json();

    setClients(data);
    setIsFetching(false);
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <div className="py-16">
      <Card>
        <CompanyListTable data={clients} isFetching={isFetching} />
      </Card>
    </div>
  );
};

export default Page;
