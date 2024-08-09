import * as React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Button, Card } from "flowbite-react";

import { UserDetailForm } from "./components/user-detail-form";

import { createClient } from "@/utils/supabase/server";

const Page = async function (props: { params: { id: string } }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users_data_view")
    .select()
    .eq("user_id", props.params.id)
    .single();

  if (error) {
    console.log(error);
  }

  return (
    !error && (
      <div className="py-8 bg-gray-200">
        <Link href="/user">
          <Button color="primary">BACK</Button>
        </Link>
        <div className="mt-5">
          <Card>
            <UserDetailForm data={data} />
          </Card>
        </div>
      </div>
    )
  );
};

export default Page;
