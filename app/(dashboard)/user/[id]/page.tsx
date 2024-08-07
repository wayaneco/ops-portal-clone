import * as React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Button, Card } from "flowbite-react";

import { MainBody } from "./components";
import { createClient } from "@/utils/supabase/client";

export default async function Page(
  props: NextPage & { params: { id: string } }
) {
  // const response = await fetch(
  //   `http://localhost:3000/api/user/${props?.params?.id}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  // if (!response.ok) {
  //   return <div>Error</div>;
  // }

  const supabase = createClient();
  const { data } = await supabase
    .from("users_data_view")
    .select("user_id, email, name")
    .eq("user_id", props.params.id)
    .single();

  console.log(data, "data here");
  return (
    <div className="py-8">
      <Link href="/user">
        <Button color="primary">BACK</Button>
      </Link>
      <div className="mt-5">
        <Card>{/* <MainBody data={data} /> */}</Card>
      </div>
    </div>
  );
}
