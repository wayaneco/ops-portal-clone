import { Card } from "flowbite-react";
import { LoginForm } from "./components/form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  ROLE_AGENT,
  ROLE_COMPANY_ADMIN,
  ROLE_NETWORK_ADMIN,
} from "../constant";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return redirect("/");

  async function loginUser(_: any, formData: FormData) {
    "use server";
    const supabase = createClient();

    let errors = { email: "", password: "" };

    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (!payload?.email) errors.email = "This field is required";
    if (!payload?.password) errors.password = "This field is required";

    const hasError = Object.keys(errors).some(
      (k) => !!errors[k as keyof typeof errors]
    );

    if (hasError) return errors;

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword(payload);
    if (error) {
      return error;
    }

    const { data: userAuth } = await supabase
      .from("users_data_view")
      .select("clients")
      .eq("user_id", user?.id)
      .single();

    const currentPrivilege = userAuth?.clients?.[0]?.privileges;

    switch (true) {
      case user && currentPrivilege?.includes(ROLE_NETWORK_ADMIN):
      case user && currentPrivilege?.includes(ROLE_COMPANY_ADMIN):
        redirect("/user");
      case user && currentPrivilege?.includes(ROLE_AGENT):
        redirect("/kiosk");
      case user && !currentPrivilege?.length:
        redirect(`/user/${user?.id}`);
      default:
        redirect("/login");
    }
  }

  return (
    <div className="login bg-primary-600 h-screen w-screen">
      <div className="container mx-auto flex items-center h-full justify-center">
        <Card className="p-6 backdrop-blur-md shadow-md w-[430px]">
          <div className="text-xl font-medium text-center uppercase ">
            Login
          </div>
          <LoginForm loginUser={loginUser} />
        </Card>
      </div>
    </div>
  );
}
