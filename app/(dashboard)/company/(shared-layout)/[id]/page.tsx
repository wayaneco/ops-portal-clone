import { Metadata } from "next";
import { STATUS_COMPLETED, STATUS_IN_PROGRESS } from "@/app/constant";
import CompanyDetail from "../components/company-detail";
import { getCompanyById } from "@/app/actions/company/get-company-by-id";

export const metadata: Metadata = {
  title: "Everest Effect Portal - Company Details",
};

const Page = async function (props: { params: { id: string } }) {
  const companyDetail = await getCompanyById(props?.params?.id);

  let initial_logs = [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (
    [STATUS_COMPLETED, STATUS_IN_PROGRESS]?.includes(
      companyDetail?.provisioning_status
    ) && companyDetail?.web_address
  ) {
    const response = await fetch(
      `${baseUrl}/api/get-initial-logs?web_address=${companyDetail.web_address}`
    );
    if (!response.ok) {
      console.error(`Failed to fetch initial logs: ${response.status} ${response.statusText}`);
      return; // Optionally handle error UI
    }
   
    initial_logs = await response.json();
  }

  return (
    
    <CompanyDetail
      initialLogs={JSON.parse(JSON.stringify(initial_logs))}
      companyInfo={JSON.parse(JSON.stringify(companyDetail))}
    />
  );
};

export default Page;

export const dynamic = "force-dynamic";
