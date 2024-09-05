"use client";

import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { InferType } from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useToastContext } from "@/app/components/Context/ToastProvider";
import { CustomTextInput } from "@/app/components/TextInput";
import { loginWithTokenHash } from "@/app/actions/login/login-with-token-hash";

import schema from "./schema";

type LoginFormProps = {
  loginUser: (payload: InferType<typeof schema>) => any;
};

const defaultValues = {
  email: "",
  password: "",
};

export function LoginForm({ loginUser }: LoginFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token_hash = searchParams.get("token_hash");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { showToast } = useToastContext();

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (token_hash) {
      (async () => {
        try {
          setIsSubmitting(true);
          const response = await loginWithTokenHash(token_hash as string);

          if (!response.ok) throw response?.message;

          router?.replace(response?.message);
        } catch (error) {
          setIsSubmitting(false);
          console.log(error);
          router?.replace("/login");
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token_hash]);

  return (
    <form
      onSubmit={handleSubmit(async (data: InferType<typeof schema>) => {
        try {
          setIsSubmitting(true);
          const response = await loginUser(data);

          if (!response.ok) throw response?.message;

          showToast({
            error: false,
            message: "Login succeeded.",
          });

          router?.replace(response?.message);
        } catch (error) {
          showToast({ error: true, message: "Invalid username and password." });
          setIsSubmitting(false);
        }
      })}
    >
      <div className="flex flex-col gap-y-4">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextInput
              disabled={isSubmitting}
              required
              label="Email"
              placeholder="Email"
              error={error?.message}
              rightIcon={
                <svg
                  className={`w-6 h-6 ${
                    error ? "text-red-500" : "text-gray-800"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextInput
              disabled={isSubmitting}
              required
              label="Password"
              type="password"
              placeholder="Password"
              error={error?.message}
              rightIcon={
                <svg
                  className={`w-6 h-6 ${
                    error ? "text-red-500" : "text-gray-800"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              {...field}
            />
          )}
        />
      </div>
      <div className="mt-8">
        <Button type="submit" color="primary" disabled={isSubmitting} fullSized>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
