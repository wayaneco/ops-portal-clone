"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import { InferType } from "yup";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";

import { useToastContext } from "@/app/components/Context/ToastProvider";
import { CustomTextInput } from "@/app/components/TextInput";

import { useIsFirstRender } from "@/app/hooks/isFirstRender";

import schema from "./schema";

import * as EverestEffect from "public/everest-effect.svg";

type LoginFormProps = {
  loginUser: (payload: InferType<typeof schema>) => any;
};

const defaultValues = {
  email: "",
};

export function LoginForm({ loginUser }: LoginFormProps) {
  const isFirstRender = useIsFirstRender();

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [confirmationLink, setConfirmationLink] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { showToast } = useToastContext();

  const { control, handleSubmit, watch } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const email = watch("email");

  const handleLogin = async (data: InferType<typeof schema>) => {
    try {
      setIsSubmitting(true);

      const { data: login_data, error } = await loginUser(data);

      if (error) throw error;

      setIsEmailSent(true);
      setConfirmationLink(login_data);
    } catch (error) {
      showToast({ error: true, message: error as string });
      setIsSubmitting(false);
    }
  };

  if (isFirstRender) {
    return (
      <>
        <div className="flex items-center mx-auto justify-center w-4/5 h-32 bg-gray-300 rounded">
          <svg
            className="w-10 h-10 text-gray-200 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="my-4 h-px bg-gray-100" />
        <div className="h-3 bg-gray-200 rounded-full w-11" />
        <div className="h-11 bg-gray-200 rounded-md w-full mb-4" />
        <div className="h-10 bg-gray-200 rounded-md w-full" />
      </>
    );
  }

  return (
    <>
      {!isEmailSent && (
        <>
          <div className="relative h-20 pb-10">
            <Image src={EverestEffect} alt="Everest Effect Logo" fill />
          </div>
          <div className="my-4 h-px bg-gray-200" />
        </>
      )}
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className={isEmailSent ? "block" : "hidden"}>
          <div className="flex flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-20 mx-auto text-primary-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>

            <div className="text-center text-2xl font-medium text-gray-700 mb-5">
              Email confirmation
            </div>
            <div className="text-center">
              <span className="text-gray-500">We have sent an email to</span>{" "}
              <span className="text-primary-500 font-bold">{email}</span>{" "}
              <span className="text-gray-500">
                to confirm the validity of your email address.
              </span>
            </div>
            <div className="mt-10 border-t border-gray-100 pt-5">
              <p className="text-center text-sm">
                Didn&apos;t receive an email?{" "}
                <span
                  className="text-primary-500 font-bold cursor-pointer"
                  onClick={async () => {
                    await handleLogin({ email });
                  }}
                >
                  Resend confirmation email
                </span>
                .
              </p>
            </div>

            <div className="mt-5 text-center text-sm">
              <div className="inline-block">
                For testing purposes, Click this link
              </div>{" "}
              <a
                href={confirmationLink}
                className="text-primary-500 underline inline-block"
              >
                Verify
              </a>{" "}
              to login.
            </div>
          </div>
        </div>
        <div className={isEmailSent ? "hidden" : "block"}>
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
            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting}
              fullSized
            >
              Continue
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
