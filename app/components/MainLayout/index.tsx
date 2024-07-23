import { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";

export default function MainLayout(props: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen container mx-auto">{props?.children}</div>
    </>
  );
}
