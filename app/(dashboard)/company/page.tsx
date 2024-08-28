import { Card } from "flowbite-react";
import { headers } from "next/headers";

import { CompanyListTable } from "./components/company-list-table";

const getCompany = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/company`,
    {
      method: "GET",
      headers: headers(),
      next: {
        tags: ["company_list"],
      },
      cache: "no-cache",
    }
  );

  return response;
};

const Page = async function () {
  const response = await getCompany();

  if (!response.ok) {
    return <div>Error fetching data</div>;
  }

  const clientList = await response.json();

  return (
    <div className="py-16">
      <Card>
        <CompanyListTable data={clientList} />
      </Card>
    </div>
  );
};

export default Page;
