"use client";

import { Button } from "flowbite-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-5" type="submit" color="primary" fullSized>
      {pending ? "Logging in..." : "Login"}
    </Button>
  );
}
