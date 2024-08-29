import { Card } from "flowbite-react";
import { headers } from "next/headers";

import { CompanyListTable } from "./components/company-list-table";

const getClients = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/company`,
      {
        method: "GET",
        headers: headers(),
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
  const clients = await getClients();

  return (
    <div className="py-16">
      <Card>
        <CompanyListTable data={clients} />
      </Card>
    </div>
  );
};

export default Page;
