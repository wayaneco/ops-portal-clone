"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import {
  STATUS_COMPLETED,
  STATUS_IN_PROGRESS,
  STATUS_PROVISION,
} from "@/app/constant";

import CompanyDetail from "../components/company-detail";
import { ClientsType } from "@/app/types";

const Page = (props: { params: { id: string } }) => {
  const [companyDetail, setCompanyDetail] = useState<ClientsType | null>(null);
  const [initialLogContent, setInitialLogContent] = useState<
    Array<{ event: string; status: STATUS_PROVISION }>
  >([]);

  const getCompanyDetails = async (id: string) => {
    const response = await fetch(`/api/company/${id}`, {
      method: "GET",
      next: {
        tags: ["company_details"],
        revalidate: 0,
      },
    });

    const data = await response.json();

    return data;
  };

  const getInitialLogContent = async (web_address: string) => {
    const provisionResponse: {
      data: {
        log_content: Array<{ event: string; status: STATUS_PROVISION }>;
      };
    } = await axios.get<any>(
      `https://api-portal-dev.everesteffect.com/provision-logs?provider_name=${web_address}&bucket_name=ee-provision-dev`
    );

    return provisionResponse;
  };

  const getCompanyDataAndLogContent = async () => {
    try {
      const data = await getCompanyDetails(props?.params?.id);

      setCompanyDetail(data);

      if (
        [STATUS_IN_PROGRESS, STATUS_COMPLETED].includes(
          data?.provisioning_status
        )
      ) {
        const provision = await getInitialLogContent(data?.web_address);

        setInitialLogContent(provision?.data?.log_content);
      } else {
        setInitialLogContent([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props?.params?.id) {
      getCompanyDataAndLogContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.params?.id]);

  return (
    <CompanyDetail
      initialLogs={initialLogContent}
      companyInfo={companyDetail as ClientsType}
    />
  );
  // return <div></div>;
};

export default Page;
