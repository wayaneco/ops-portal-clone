"use client";

import moment from "moment";
import axios from "axios";

import { TextInput, Button, Spinner, Toast } from "flowbite-react";
import {
  ChangeEvent,
  LegacyRef,
  ReactNode,
  useContext,
  useRef,
  useState,
  useTransition,
  useEffect,
  createContext,
} from "react";
import Confetti from "react-confetti";
import { SidebarContext, SidebarContextType } from "../context";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";

import { schema } from "../schema";
import { AddClientForm } from "../components/form";
import { useSupabaseSessionContext } from "@/app/components/Context/SupabaseSessionProvider";
import { ClientsType } from "@/app/types";
import { upsertCompanyDetails } from "@/app/actions/company/upsert-company";
import { convertFileToBase64 } from "@/utils/file/convertFileToBase64";
import { createClient } from "@/utils/supabase/client";
import {
  ROLE_NETWORK_ADMIN,
  STATUS_COMPLETED,
  STATUS_IN_PROGRESS,
  STATUS_PROVISION,
} from "@/app/constant";
import { useToastContext } from "@/app/components/Context/ToastProvider";
import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { useIsFirstRender } from "@/app/hooks/isFirstRender";

import LoadingSkeleton from "../loading";

type CompanyDetailType = {
  initialLogs?: Array<{ event: string; status: STATUS_PROVISION }>;
  companyInfo?: ClientsType;
};

type ToastType = {
  show: boolean;
  message: string | ReactNode;
  isError?: boolean;
};

type ProvisionLoggingContextType = {
  logs: Array<{ event: string; status: STATUS_PROVISION }>;
  handleProvision: () => any;
  isProvisioning: boolean;
  isCompleted: boolean;
};

export const ProvisionLoggingContext = createContext<
  ProvisionLoggingContextType | undefined
>(undefined);

const provisionApiEnv = process.env["NEXT_PUBLIC_PROVISION_API"];

export const useProvisionLoggingContext = () => {
  const context = useContext<ProvisionLoggingContextType | undefined>(
    ProvisionLoggingContext
  )!;

  if (!context) {
    throw new Error();
  }

  return context;
};

const CompanyDetail = function ({
  companyInfo,
  initialLogs = [],
}: CompanyDetailType) {
  const supabase = createClient();
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [startLogging, setStartLogging] = useState<boolean>(false);
  const [logs, setLogs] =
    useState<ProvisionLoggingContextType["logs"]>(initialLogs);
  const [isCompleted, setIsCompleted] = useState(
    companyInfo?.provisioning_status === STATUS_COMPLETED
  );
  const [_, startTransition] = useTransition();

  const router = useRouter();
  const path = usePathname();

  const { showToast } = useToastContext();
  const { user } = useSupabaseSessionContext();
  const { currentPrivilege } = useUserClientProviderContext();
  const { pathname } = useContext<SidebarContextType | undefined>(
    SidebarContext
  )!;
  const inputRef = useRef<HTMLInputElement>();

  const isFirstRender = useIsFirstRender();

  const companyTags = companyInfo?.tags
    ?.filter((tag) => !!tag?.name)
    ?.map((tag) => ({ label: tag?.name }));

  const companyProviderType = companyInfo?.provider_types
    ?.filter((provider_type) => !!provider_type?.name)
    ?.map((provider_type) => ({
      label: provider_type?.name,
    }));

  const methods = useForm({
    values: {
      logo: companyInfo?.logo_url ?? null,
      name: companyInfo?.name ?? "",
      web_address: companyInfo?.web_address ?? "",
      longitude: companyInfo?.longitude ?? "",
      latitude: companyInfo?.latitude ?? "",
      is_enabled: companyInfo?.is_enabled ?? true,
      service_provided: companyInfo?.service_provided_data ?? [
        { label: "Meals", type: "count" },
      ],
      tags: companyTags,
      provider_types: companyProviderType,
      provisioning_status: companyInfo?.provisioning_status ?? "DRAFT",
      isUpdate: !!companyInfo,
      isWebAddressValid: !!companyInfo,
      isDirty: false,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const watchIsDirty = methods.watch("isDirty");
  const watchName = methods.watch("name");
  const watchWebAddress = methods.watch("web_address");
  const watchIsWebAddressValid = methods.watch("isWebAddressValid");

  const isSubmitButtonDisabled =
    (!watchIsDirty && !methods?.formState?.isDirty) ||
    startLogging ||
    !watchIsWebAddressValid ||
    !watchName ||
    !watchWebAddress;

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    startTransition(async () => {
      try {
        const tagPayload = data?.tags?.map(
          (tag: { label: string }) => tag.label
        );
        const providerTypePayload = data?.provider_types?.map(
          (provider_type: { label: string }) => provider_type.label
        );

        const response = await upsertCompanyDetails(
          {
            logo: data?.logo as string,
            name: data?.name,
            web_address: data?.web_address,
            longitude: data?.longitude,
            latitude: data?.latitude,
            is_enabled: data?.is_enabled,
            provisioning_status: data?.provisioning_status,
            service_provided: data?.service_provided,
            tags: tagPayload,
            provider_types: providerTypePayload,
            staff_id: user?.id,
            client_id: companyInfo?.client_id,
          },
          {
            update: !!companyInfo,
          }
        );

        if (!response.ok) throw response.message;

        showToast({
          message: (
            <div>
              <strong>{watchName}</strong>{" "}
              {!!companyInfo
                ? "is updated successfully."
                : "is added successfully."}
            </div>
          ),
        });

        router.push("/company");
      } catch (error: any) {
        showToast({
          message: error,
          error: true,
        });
        setIsSubmitting(false);
      }
    });
  };

  const handleProvision = async () => {
    try {
      if (watchWebAddress !== companyInfo?.web_address) {
        const { error: error_update_web_address } = await supabase
          .from("clients")
          .update({
            web_address: watchWebAddress,
          })
          .eq("id", companyInfo?.client_id);

        if (error_update_web_address) throw error_update_web_address?.message;
      }

      const response = await fetch(`${provisionApiEnv}/provision`, {
        method: "POST",
        mode: "no-cors", // Set to 'no-cors' to disable CORS handling
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${watchWebAddress}-execution-${moment()
            .format("MMM-DD-YYYY")
            .toLowerCase()}`,
          input: `{"hostname": "${watchWebAddress}", "build_id": "${watchWebAddress}_${watchWebAddress}_v.1.0.0_dev"}`,
        }),
      });

      const { data, error: error_update_provision_status } = await supabase
        .from("clients")
        .update({
          provisioning_status: STATUS_IN_PROGRESS,
        })
        .eq("id", companyInfo?.client_id);

      if (error_update_provision_status)
        throw error_update_provision_status?.message;

      setStartLogging(true);
      return {
        ...response,
        data,
      };
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (showConfetti) {
      timeout = setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showConfetti]);

  useEffect(() => {
    if (startLogging) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get<any>(
            `${provisionApiEnv}/provision-logs?provider_name=${watchWebAddress}&bucket_name=ee-provision-dev`
          );

          setLogs(data?.log_content);

          const FINISH_LENGTH = 7;
          const totalCompletedEvent = data?.log_content?.filter(
            ({ status }: { status: "completed" }) => status === "completed"
          )?.length;

          if (totalCompletedEvent === FINISH_LENGTH) {
            const response = await supabase
              .from("clients")
              .update({
                provisioning_status: STATUS_COMPLETED,
              })
              .eq("id", companyInfo?.client_id);

            if (response?.error) {
              throw new Error(response?.error?.message);
            }
            setIsCompleted(true);
            setStartLogging(false);
            setShowConfetti(true);
            clearInterval(intervalId);
          }
        } catch (err) {
          fetchData();
        }
      };

      fetchData(); // Initial fetch

      const intervalId = setInterval(() => {
        fetchData();
      }, 8000); // 8 seconds

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLogging]);

  useEffect(() => {
    const getLogs = async () => {
      try {
        const { data } = await axios.get<any>(
          `${provisionApiEnv}/provision-logs?provider_name=${
            watchWebAddress || companyInfo?.web_address
          }&bucket_name=ee-provision-dev`
        );

        if (companyInfo?.provisioning_status === STATUS_IN_PROGRESS) {
          const { error: error_update_provision_status } = await supabase
            .from("clients")
            .update({
              provisioning_status: STATUS_COMPLETED,
            })
            .eq("id", companyInfo?.client_id);

          if (error_update_provision_status)
            throw error_update_provision_status?.message;
        }

        setLogs(data?.log_content);
      } catch (error) {
        console.log(error);
      }
    };

    if (companyInfo?.provisioning_status === STATUS_IN_PROGRESS) {
      setStartLogging(true);
    } else if (companyInfo?.provisioning_status === STATUS_COMPLETED) {
      getLogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyInfo?.provisioning_status]);

  if (isFirstRender || (!companyInfo && path !== "/company/add")) {
    return <LoadingSkeleton />;
  }

  return (
    <ProvisionLoggingContext.Provider
      value={{
        logs,
        handleProvision,
        isProvisioning: startLogging,
        isCompleted,
      }}
    >
      <FormProvider {...methods}>
        {isSubmitting && (
          <div className="absolute bg-gray-200/40 cursor-not-allowed inset-0 top-20 z-20 flex items-center justify-center">
            <Spinner color="primary" size="xl" />
          </div>
        )}
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <div className="absolute left-0 right-0 overflow-x-hidden">
            <div className="relative z-10 bg-gray-50">
              <div className="flex items-center">
                <div className="min-w-64 w-64">
                  <Controller
                    control={methods.control}
                    name="logo"
                    render={({ field: { value, onChange } }) => (
                      <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          !startLogging && inputRef.current?.click()
                        }
                      >
                        {!value ? (
                          <div className="flex items-center justify-center w-40 h-20 bg-gray-300 rounded  dark:bg-gray-700">
                            <svg
                              className="w-10 h-10 text-gray-200 dark:text-gray-600"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 18"
                            >
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={
                              (value as string)?.includes("base64")
                                ? (value as string)
                                : `${value}?${new Date().getTime()}`
                            }
                            alt={`Company Logo`}
                            className="w-auto h-20"
                          />
                        )}
                        <input
                          className="hidden"
                          type="file"
                          ref={inputRef as LegacyRef<HTMLInputElement>}
                          accept="image/**"
                          onChange={async (
                            event: ChangeEvent<HTMLInputElement>
                          ) => {
                            if (!event?.currentTarget?.files![0]) return;

                            const base64 = await convertFileToBase64(
                              event.currentTarget?.files[0]
                            );

                            onChange(base64);
                          }}
                        />
                      </div>
                    )}
                  />
                </div>
                <div className="w-full flex items-center justify-between px-5">
                  <Controller
                    control={methods.control}
                    name="name"
                    render={({ field }) => (
                      <TextInput
                        color="primary"
                        placeholder="Add client name"
                        className="w-[450px]"
                        disabled={
                          !currentPrivilege?.includes(ROLE_NETWORK_ADMIN) ||
                          startLogging
                        }
                        {...field}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    disabled={isSubmitButtonDisabled}
                  >
                    {companyInfo ? "Update Company" : "Add Company"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="h-full w-full pl-64">
              <AddClientForm routeName={pathname} />
            </div>
          </div>
        </form>
        {showConfetti && (
          <Confetti
            className="fixed inset-0 !z-10"
            height={window && window?.innerHeight}
            width={window && window?.innerWidth}
            tweenDuration={10000}
          />
        )}
      </FormProvider>
    </ProvisionLoggingContext.Provider>
  );
};

export default CompanyDetail;
