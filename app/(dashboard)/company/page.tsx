import { Card } from "flowbite-react";

import { CompanyListTable } from "./components/company-list-table";
import { getAllCompany } from "@/app/actions/company/get-all-company";

const Page = async function () {
  const clients = await getAllCompany();

  return (
    <div className="py-16">
      <Card>
        <CompanyListTable data={JSON.parse(JSON.stringify(clients))} />
      </Card>
    </div>
  );
};

export default Page;
