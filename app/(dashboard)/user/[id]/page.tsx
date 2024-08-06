import * as React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Button, Card } from "flowbite-react";

import { MainBody } from "./components";

export default async function Page(
  props: NextPage & { params: { id: string } }
) {
  const response = await fetch(
    `http://localhost:3000/api/user/${props?.params?.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return <div>Error</div>;
  }

  const data = await response.json();
  console.log(data);
  return (
    <div className="py-8">
      <Link href="/user">
        <Button color="primary">BACK</Button>
      </Link>
      <div className="mt-5">
        <Card>
          <MainBody data={data} />
        </Card>
      </div>
    </div>
  );
}
