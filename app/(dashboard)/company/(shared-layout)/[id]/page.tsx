import axios from "axios";
import { headers } from "next/headers";

import { STATUS_COMPLETED, STATUS_IN_PROGRESS } from "@/app/constant";

import CompanyDetail from "../components/company-detail";

const getCompanyDetails = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/company/${id}`,
      {
        method: "GET",
        headers: new Headers(headers()),
        next: {
          tags: ["company_details"],
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch company ${id}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const getInitialLogs = async (web_address: string) => {
  try {
    const provisionResponse = await axios.get<any>(
      `https://api-portal-dev.everesteffect.com/provision-logs?provider_name=${web_address}&bucket_name=ee-provision-dev`
    );

    return provisionResponse?.data?.log_content;
  } catch (error) {
    return error;
  }
};

const Page = async function (props: { params: { id: string } }) {
  const companyDetail = await getCompanyDetails(props?.params?.id);

  let initial_logs;

  if (
    [STATUS_COMPLETED, STATUS_IN_PROGRESS]?.includes(
      companyDetail?.provisioning_status
    )
  ) {
    const response = await getInitialLogs(companyDetail?.web_address);

    initial_logs = response;
  } else {
    initial_logs = [];
  }

  console.log(1111111111111111, initial_logs);
  console.log(2222222222222222, companyDetail);

  return (
    <CompanyDetail
      initialLogs={JSON.parse(JSON.stringify(initial_logs))}
      companyInfo={JSON.parse(JSON.stringify(companyDetail))}
    />
  );
};

export default Page;
