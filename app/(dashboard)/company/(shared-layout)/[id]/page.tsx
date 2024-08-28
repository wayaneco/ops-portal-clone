import axios from "axios";
import { headers } from "next/headers";

import {
  STATUS_COMPLETED,
  STATUS_IN_PROGRESS,
  STATUS_PROVISION,
} from "@/app/constant";

import CompanyDetail from "../components/company-detail";

const getCompanyDetails = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/company/${id}`,
    {
      method: "GET",
      headers: headers(),
      next: {
        tags: ["company_details"],
        revalidate: 0,
      },
    }
  );

  return response;
};

const Page = async function (props: { params: { id: string } }) {
  const response = await getCompanyDetails(props?.params?.id);

  if (!response.ok) {
    throw new Error(`Failed to fetch company ${props?.params.id}`);
  }

  const data = await response.json();

  let log_content;

  if (
    [STATUS_IN_PROGRESS, STATUS_COMPLETED].includes(data?.provisioning_status)
  ) {
    const provisionResponse: {
      data: {
        log_content: Array<{ event: string; status: STATUS_PROVISION }>;
      };
    } = await axios.get<any>(
      `https://api-portal-dev.everesteffect.com/provision-logs?provider_name=${data?.web_address}&bucket_name=ee-provision-dev`
    );

    log_content = provisionResponse?.data?.log_content;
  }

  return <CompanyDetail initialLogs={log_content} companyInfo={data} />;
};

export default Page;
