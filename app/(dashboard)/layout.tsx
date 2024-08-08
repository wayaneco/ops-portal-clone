import { PropsWithChildren } from "react";
import MainLayout from "../components/MainLayout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout(props: PropsWithChildren) {
  const supabase = await createClient();
  const session = (await supabase.auth.getSession()).data.session;

  const email = (await supabase.auth.getUser()).data.user?.email;

  const { data } = await supabase
    .from("users_data_view")
    .select("privileges")
    .eq("email", email)
    .single();

  if (!session) {
    redirect("/login");
  }

  return (
    <MainLayout privileges={data?.privileges}>{props.children}</MainLayout>
  );
}
