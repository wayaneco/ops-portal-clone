import { headers } from "next/headers";
import CompanyDetail from "../components/company-detail";
import axios from "axios";

const Page = async function (props: { params: { id: string } }) {
  const response = await fetch(
    `http://localhost:3000/api/company/${props?.params?.id}`,
    {
      method: "GET",
      headers: headers(),
      next: {
        tags: ["company_details"],
        revalidate: 0,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch company ${props?.params.id}`);
  }

  const data = await response.json();

  let log_content;

  if (["IN PROGRESS", "COMPLETED"].includes(data?.provisioning_status)) {
    const provisionResponse: {
      data: {
        log_content: Array<{ event: string; status: "pending" | "completed" }>;
      };
    } = await axios.get<any>(
      `https://api-portal-dev.everesteffect.com/provision-logs?provider_name=${data?.web_address}&bucket_name=ee-provision-dev`
    );

    log_content = provisionResponse?.data?.log_content;
  }

  return <CompanyDetail initialLogs={log_content} companyInfo={data} />;
};

export default Page;
