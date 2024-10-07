import { Metadata } from "next";

import { loginUser } from "@/actions/login/login-user";

import { LoginForm } from "./components/form";

export const metadata: Metadata = {
  title: "Everest Effect Portal - Login",
};

export default async function Page() {
  return <LoginForm loginUser={loginUser} />;
}
