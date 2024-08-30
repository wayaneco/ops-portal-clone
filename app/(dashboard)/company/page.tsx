"use client";

import { Card } from "flowbite-react";

import { headers } from "next/headers";

import { CompanyListTable } from "./components/company-list-table";

const getCompany = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/company`,
      {
        method: "GET",
        headers: new Headers(headers()),
        next: {
          tags: ["company_list"],
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return <div>Error fetching data</div>;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const Page = async function () {
  const clients = await getCompany();

  return (
    <div className="py-16">
      <Card>
        <CompanyListTable data={JSON.parse(JSON.stringify(clients))} />
      </Card>
    </div>
  );
};

export default Page;
