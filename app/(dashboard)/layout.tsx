import { PropsWithChildren } from "react";
import MainLayout from "../components/MainLayout";

export default function Layout(props: PropsWithChildren) {
  return <MainLayout>{props.children}</MainLayout>;
}
