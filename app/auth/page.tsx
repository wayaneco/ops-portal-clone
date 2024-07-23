"use client";

import { CorbadoAuth } from "@corbado/react";
import { useRouter } from "next/navigation";

import "./styles.css";

export default function Auth() {
  const router = useRouter();
  const onLoggedIn = () => {
    router.push("/notes");
  };

  return (
    <div className="login h-screen flex items-center justify-center">
      <CorbadoAuth onLoggedIn={onLoggedIn} />
    </div>
  );
}
