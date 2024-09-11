import { Metadata } from "next";
import axios from "axios";

import { STATUS_COMPLETED, STATUS_IN_PROGRESS } from "@/app/constant";

import CompanyDetail from "../components/company-detail";
import { getCompanyById } from "@/app/actions/company/get-company-by-id";

const getInitialLogs = async (web_address: string) => {
  const provisionApiEnv = process.env["NEXT_PUBLIC_PROVISION_API"];
  const xApiKey = process.env["NEXT_PUBLIC_PROVISION_X_API_KEY"];
  const bucketName = process.env["NEXT_PUBLIC_PROVISION_BUCKET_NAME"];
  try {
    const provisionResponse = await axios.get<any>(
      `${provisionApiEnv}/provision-logs?provider_name=${web_address}&bucket_name=${bucketName}`,
      {
        headers: {
          "x-api-key": xApiKey,
        },
      }
    );

    return provisionResponse?.data?.log_content;
  } catch (error) {
    return [];
  }
};

export const metadata: Metadata = {
  title: "Everest Effect Portal - Company Details",
};

const Page = async function (props: { params: { id: string } }) {
  const companyDetail = await getCompanyById(props?.params?.id);

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

  return (
    <CompanyDetail
      initialLogs={JSON.parse(JSON.stringify(initial_logs))}
      companyInfo={JSON.parse(JSON.stringify(companyDetail))}
    />
  );
};

export default Page;

export const dynamic = "force-dynamic";
