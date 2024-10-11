import { Metadata } from "next";

import { sendOTP } from "@/app/actions/login/send-otp";

import { LoginForm } from "./components/form";

export const metadata: Metadata = {
  title: "Everest Effect Portal - Login",
};

export default async function Page() {
  return <LoginForm sendOTP={sendOTP} />;
}
