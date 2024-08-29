import { Card } from "flowbite-react";
import { headers } from "next/headers";

import { UserListTable } from "./components/user-list-table";

import api from "utils/api";

export default async function Page() {
  return (
    <div className="pt-16 pb-12">
      <Card></Card>
    </div>
  );
}
