"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Spinner, TextInput } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import * as Yup from "yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useToastContext } from "@/app/components/Context/ToastProvider";
import { createClient } from "@/utils/supabase/client";
import { useIsFirstRender } from "@/app/hooks/isFirstRender";
import { useLoginContextProvider } from "@/app/components/Context/LoginContext";

const schema = Yup.object().shape({
  otp: Yup.array(
    Yup.object().shape({
      value: Yup.string().required(),
    })
  ),
});

const defaultValues = {
  otp: [
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
  ],
};

export function OTPForm() {
  const supabase = createClient();
  const router = useRouter();
  const isFirstRender = useIsFirstRender();

  const { id, email, phone_number, token_hash, redirectUrl, type } =
    useLoginContextProvider();

  if (!id) {
    redirect("/login");
  }

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(60);
  const { showToast } = useToastContext();

  const { control, handleSubmit, trigger, setFocus, setValue, watch } = useForm(
    {
      defaultValues,
      resolver: yupResolver(schema),
      mode: "onChange",
    }
  );

  const { fields } = useFieldArray({
    control: control,
    name: "otp",
  });

  const watchOTP = watch("otp");

  useEffect(() => {
    if (!isFirstRender) {
      setFocus(`otp.${0}.value`);
    }
  }, [setFocus, isFirstRender]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    timer = setInterval(() => {
      setCountDown((count) => {
        if (count === 0) {
          clearInterval(timer);
          return 0;
        }

        return count - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  if (isFirstRender) {
    return (
      <>
        <div className="text-center">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4" />
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4" />
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4 mb-4 mx-auto" />
        </div>
        <div className="flex gap-x-4">
          <div className="h-11 bg-gray-200 rounded-sm dark:bg-gray-700 w-11 mb-4" />
          <div className="h-11 bg-gray-200 rounded-sm dark:bg-gray-700 w-11 mb-4" />
          <div className="h-11 bg-gray-200 rounded-sm dark:bg-gray-700 w-11 mb-4" />
          <div className="h-11 bg-gray-200 rounded-sm dark:bg-gray-700 w-11 mb-4" />
          <div className="h-11 bg-gray-200 rounded-sm dark:bg-gray-700 w-11 mb-4" />
          <div className="h-11 bg-gray-200 rounded-sm dark:bg-gray-700 w-11 mb-4" />
        </div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4" />
        <div className="h-10 bg-gray-200 rounded-sm dark:bg-gray-700 w-full mb-4" />
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          setIsSubmitting(true);
          const otp_code = data?.otp
            ?.map((otp) => otp.value)
            .join("") as string;

          const { error: otp_error } = await supabase.rpc("verify_otp", {
            p_user_id: id,
            p_otp_code: otp_code,
          });

          if (otp_error) throw otp_error.message;

          const { error: verify_otp_error } = await supabase.auth.verifyOtp({
            token_hash,
            type: "magiclink",
          });

          if (verify_otp_error) throw verify_otp_error.message;

          showToast({
            message: `Verification successful! You're now logged in.`,
          });

          router.replace(redirectUrl as string);
        } catch (error) {
          setIsSubmitting(false);
          showToast({
            message: error as string,
            error: true,
          });
        }
      })}
    >
      <div className="mb-8 text-center">
        <p className="text-sm">
          {`To complete your login, enter the one-time PIN we’ve just sent to your ${
            type === "email"
              ? `email address ${email.slice(0, 1)}****@${email.split("@")[1]}`
              : `phone number ending ${phone_number.slice(-4)}`
          }`}
        </p>
      </div>
      <div className="flex gap-x-4">
        {fields?.map((field, index) => {
          return (
            <Controller
              key={field?.id}
              name={`otp.${index}.value`}
              control={control}
              render={({
                field: { value, onChange, ref, name, onBlur },
                fieldState: { error },
              }) => (
                <TextInput
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  disabled={isSubmitting}
                  style={{
                    textAlign: "center",
                    caretColor: "transparent",
                  }}
                  autoComplete="false"
                  color={error ? "error" : "primary"}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onClick={() => {
                    const lastInputtedValue = watchOTP
                      ?.map((otp) => otp.value)
                      .filter(Boolean).length!;

                    if (lastInputtedValue === 0) {
                      setFocus(`otp.${0}.value`);
                    } else if (lastInputtedValue === 6) {
                      setFocus(`otp.${5}.value`);
                    } else {
                      setFocus(`otp.${lastInputtedValue}.value`);
                    }
                  }}
                  onKeyDown={(event) => {
                    const inputValue = event.currentTarget.value;

                    if (event.key === "Backspace" && !inputValue && index > 0) {
                      setTimeout(() => {
                        setValue(`otp.${index - 1}.value`, "");
                        setFocus(`otp.${index - 1}.value`);
                        trigger("otp");
                      }, 10);
                    }
                  }}
                  onFocus={(event) => {
                    const input = event.target;
                    setTimeout(() => {
                      input.setSelectionRange(
                        input.value.length,
                        input.value.length
                      );
                      ``;
                    }, 0);
                  }}
                  value={value}
                  maxLength={1}
                  onChange={(event) => {
                    const { value } = event.target;
                    onChange(value);

                    if (value && index < fields.length - 1) {
                      setFocus(`otp.${index + 1}.value`);
                    }
                  }}
                />
              )}
            />
          );
        })}
      </div>
      <div className="my-8">
        <p className="text-sm mb-3">
          Didn&apos;t receive code?{" "}
          {!!countDown && (
            <span>{`${countDown}${countDown > 1 ? "secs" : "sec"}`}</span>
          )}
        </p>
        <p className="text-sm">
          <u
            className="text-primary-500 cursor-pointer block"
            onClick={async () => {
              try {
                setIsResending(true);
                const { error } = await supabase.rpc("generate_otp", {
                  p_user_id: id,
                });

                if (error) throw error?.message;

                showToast({
                  message: "OTP sent successfully",
                });
                setCountDown(60);
                setIsResending(false);
              } catch (error) {
                showToast({
                  message: error as string,
                  error: true,
                });
                setIsResending(false);
              }
            }}
          >
            Resend code{" "}
            {isResending && (
              <Spinner color="primary" className="ml-2 size-3.5" />
            )}
          </u>
        </p>
        <p className="text-sm">
          <u className="text-primary-500 cursor-pointer">
            Resend code via email
          </u>
        </p>
      </div>
      <div className="mt-8">
        <Button type="submit" color="primary" disabled={isSubmitting} fullSized>
          {isSubmitting ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </form>
  );
}
