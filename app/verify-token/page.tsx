"use client";

import { useEffect } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import { verifyLogin } from "@/app/actions/login/verify-login";
import { Card, Spinner } from "flowbite-react";
import { useToastContext } from "@/components/Context/ToastProvider";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToastContext();

  const token_hash = searchParams.get("token_hash");

  if (!token_hash) redirect("/login");

  useEffect(() => {
    if (token_hash) {
      (async () => {
        const response = await verifyLogin(token_hash);

        if (!response?.ok) {
          showToast({
            message: response?.message,
            error: true,
          });
          router.replace("/login");
          return;
        }

        router.replace(response?.message);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token_hash]);

  return (
    <div className="login bg-primary-600 h-screen w-screen">
      <div className="container mx-auto flex items-center h-full justify-center">
        <Card className="p-6 backdrop-blur-md shadow-md w-[450px] text-center">
          <Spinner className="size-16" color="primary" />
          <p>Logging in...</p>
        </Card>
      </div>
    </div>
  );
};
export default Page;
