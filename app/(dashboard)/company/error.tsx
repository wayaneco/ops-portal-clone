"use client";

import { Button } from "flowbite-react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <div className="text-2xl text-gray-800">Something went wrong.</div>
      <div>{JSON.stringify(error)}</div>
      <div>COMPANY PAGE</div>
      <Button color="primary" onClick={reset}>
        Reset
      </Button>
    </div>
  );
};

export default ErrorPage;
