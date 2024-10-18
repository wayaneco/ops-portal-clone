import { Metadata } from "next";
import CompanyDetail from "../components/company-detail";

export const metadata: Metadata = {
  title: "Everest Effect Portal - Add Company",
};

const Page = async function () {
  return <CompanyDetail />;
};

export default Page;
