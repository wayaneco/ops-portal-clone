"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { InferType } from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useToastContext } from "@/app/components/Context/ToastProvider";
import { CustomTextInput } from "@/app/components/TextInput";

import schema from "./schema";
import {
  LoginContextType,
  useLoginContextProvider,
} from "@/app/components/Context/LoginContext";
import { useIsFirstRender } from "@/app/hooks/isFirstRender";

type LoginFormProps = {
  sendOTP: (data: { email: string; type: "sms" | "email" }) => Promise<{
    data: any;
    error: any;
  }>;
};

const defaultValues = {
  email: "",
};

export function LoginForm({ sendOTP }: LoginFormProps) {
  const router = useRouter();
  const isFirstRender = useIsFirstRender();

  const { updateInfo } = useLoginContextProvider();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { showToast } = useToastContext();

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  if (isFirstRender) {
    return (
      <>
        <div className="flex flex-col gap-y-4">
          <div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-1" />
            <div className="h-10 bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4" />
          </div>
        </div>
        <div className="h-10 bg-gray-200 rounded-sm dark:bg-gray-700 w-full mb-4" />
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(async ({ email }: InferType<typeof schema>) => {
        try {
          setIsSubmitting(true);
          const { data, error } = await sendOTP({ email, type: "sms" });

          if (error) throw error;

          Object.keys(data).map((key) => {
            updateInfo(key as keyof LoginContextType, data[key]);
          });

          router.replace("/otp");
        } catch (_error) {
          showToast({ error: true, message: "Invalid" });
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
      </div>
      <div className="mt-8">
        <Button type="submit" color="primary" disabled={isSubmitting} fullSized>
          Continue
        </Button>
      </div>
    </form>
  );
}
