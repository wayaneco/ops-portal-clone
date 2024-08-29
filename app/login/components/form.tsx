"use client";

import { TextInput, Button } from "flowbite-react";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submitButton";
type LoginFormProps = {
  loginUser: (prevState: any, formData: FormData) => any;
};

const initialState = {
  email: "",
  password: "",
};

export function LoginForm({ loginUser }: LoginFormProps) {
  const [message, formAction] = useFormState(loginUser, initialState);

  return (
    <form action={formAction}>
      <TextInput
        className="mb-3"
        color={message?.email ? "failure" : "primary"}
        name="email"
        placeholder="Email"
        rightIcon={() => (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
              clip-rule="evenodd"
            />
          </svg>
        )}
        helperText={
          message?.email && (
            <>
              <span className="font-medium">{message?.email}</span>
            </>
          )
        }
      />
      <TextInput
        placeholder="Password"
        color={message?.password ? "failure" : "primary"}
        name="password"
        type="password"
        rightIcon={() => (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
              clip-rule="evenodd"
            />
          </svg>
        )}
        helperText={
          message?.password && (
            <>
              <span className="font-medium">{message?.password}</span>
            </>
          )
        }
      />
      <SubmitButton />
    </form>
  );
}
