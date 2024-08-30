import { Card } from "flowbite-react";
import { redirect } from "next/navigation";

import { LoginForm } from "./components/form";
import { createClient } from "@/utils/supabase/server";

import { loginUser } from "../actions/login/login-user";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("1111111111111111111", user);
  if (user) return redirect("/");

  return (
    <div className="login bg-primary-600 h-screen w-screen">
      <div className="container mx-auto flex items-center h-full justify-center">
        <Card className="p-6 backdrop-blur-md shadow-md w-[430px]">
          <div className="text-xl font-medium text-center uppercase text-gray-600">
            Login
          </div>
          <LoginForm loginUser={loginUser} />
        </Card>
      </div>
    </div>
  );
}
