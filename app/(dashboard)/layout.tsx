import { PropsWithChildren } from "react";
import MainLayout from "../components/MainLayout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout(props: PropsWithChildren) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("users_data_view")
    .select("privileges")
    .eq("email", user?.email)
    .single();

  if (!user) {
    redirect("/login");
  }

  return (
    <MainLayout privileges={data?.privileges}>{props.children}</MainLayout>
  );
}
