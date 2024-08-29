"use server";

import { redirect } from "next/navigation";

import {
  ROLE_NETWORK_ADMIN,
  ROLE_COMPANY_ADMIN,
  ROLE_AGENT,
} from "@/app/constant";
import { createClient } from "@/utils/supabase/server";

export async function loginUser(_: any, formData: FormData) {
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
