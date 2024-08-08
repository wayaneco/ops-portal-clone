import * as React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Button, Card } from "flowbite-react";

import { MainBody } from "./components";
import { createClient } from "@/utils/supabase/client";

const Page = async function (props: { params: { id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users_data_view")
    .select(
      `
        user_id, 
        first_name, 
        middle_name, 
        last_name, 
        email, 
        addr_line_1, 
        addr_line_2, 
        city, 
        state_province_region, 
        clients, 
        privileges
      `
    )
    .eq("user_id", props.params.id)
    .single();

  if (error) {
    console.log(error);
  }

  return (
    !error && (
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
    )
  );
};

export default Page;
