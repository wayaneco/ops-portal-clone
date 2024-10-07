import { Metadata } from "next";
import { Card } from "flowbite-react";
import { redirect } from "next/navigation";

import { LoginForm } from "./components/form";
import { createClient } from "@/utils/supabase/server";

import { loginUser } from "../actions/login/login-user";

export const metadata: Metadata = {
  title: "Everest Effect Portal - Login",
};

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return redirect("/");

  return (
    <div className="login bg-primary-600 h-screen w-screen">
      <div className="container mx-auto flex items-center h-full justify-center">
        <Card className="p-6 backdrop-blur-md shadow-md w-[450px]">
          <LoginForm loginUser={loginUser} />
        </Card>
      </div>
    </div>
  );
}
