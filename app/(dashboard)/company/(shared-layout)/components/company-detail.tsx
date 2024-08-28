"use client";

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
import { useRouter } from "next/navigation";

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
  const [toastState, setToastState] = useState<ToastType>({
    show: false,
    message: "",
    isError: false,
  });
  const [_, startTransition] = useTransition();

  const router = useRouter();

  const { user } = useSupabaseSessionContext();
  const { currentPrivilege } = useUserClientProviderContext();
  const { pathname } = useContext<SidebarContextType | undefined>(
    SidebarContext
  )!;
  const inputRef = useRef<HTMLInputElement>();

  const isFirstRender = useIsFirstRender();

  const methods = useForm({
    defaultValues: {
      logo: companyInfo?.logo_url ?? null,
      name: companyInfo?.name ?? "",
      web_address: companyInfo?.web_address ?? "",
      longitude: companyInfo?.longitude ?? "",
      latitude: companyInfo?.latitude ?? "",
      is_enabled: companyInfo?.is_enabled ?? true,
      service_provided: companyInfo?.service_provided_data ?? [
        { label: "Meals", type: "count" },
      ],
      tags: [], // TODO: companyInfo?.tags should be a Array not an string
      provider_types: companyInfo?.provider_types ?? [],
      provisioning_status: companyInfo?.provisioning_status ?? "DRAFT",
      isUpdate: !!companyInfo,
      isWebAddressValid: !!companyInfo,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const watchName = methods.watch("name");
  const watchWebAddress = methods.watch("web_address");
  const watchIsWebAddressValid = methods.watch("isWebAddressValid");

  const isSubmitButtonDisabled =
    !methods?.formState?.isDirty ||
    startLogging ||
    !watchIsWebAddressValid ||
    !watchName ||
    !watchWebAddress;

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    startTransition(async () => {
      try {
        const response: { isError: boolean; message: string } =
          await upsertCompanyDetails(
            {
              logo: data?.logo as string,
              name: data?.name,
              web_address: data?.web_address,
              longitude: data?.longitude,
              latitude: data?.latitude,
              is_enabled: data?.is_enabled,
              provisioning_status: data?.provisioning_status,
              service_provided: data?.service_provided,
              tags: data?.tags,
              provider_types: data?.provider_types,
              staff_id: user?.id,
              client_id: companyInfo?.client_id,
            },
            {
              currentPrivilege,
              update: !!companyInfo,
            }
          );

        if (response.isError) throw new Error(response?.message);

        setToastState({
          show: true,
          message: (
            <div>
              <strong>{watchName}</strong>{" "}
              {!!companyInfo
                ? "is updated successfully."
                : "is added successfully."}
            </div>
          ),
        });

        if (!currentPrivilege?.includes(ROLE_NETWORK_ADMIN)) {
          setIsSubmitting(false);
        }

        currentPrivilege?.includes(ROLE_NETWORK_ADMIN) &&
          setTimeout(() => {
            router.push("/company");
          }, 3000);
      } catch (_) {
        setIsSubmitting(false);
        setToastState({
          show: true,
          message: (
            <div>
              {!!companyInfo
                ? "Field to update client."
                : "Field to add client."}
            </div>
          ),
          isError: true,
        });
      }
    });
  };

  const handleProvision = async () => {
    try {
      if (watchWebAddress !== companyInfo?.web_address) {
        await supabase
          .from("clients")
          .update({
            web_address: watchWebAddress,
          })
          .eq("id", companyInfo?.client_id);
      }

      const response = await fetch(
        "https://api-portal-dev.everesteffect.com/provision",
        {
          method: "POST",
          mode: "no-cors", // Set to 'no-cors' to disable CORS handling
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${watchWebAddress}-execution-aug-14-2024`,
            input: `{"hostname": "${watchWebAddress}", "build_id": "${watchWebAddress}_${watchWebAddress}_v.1.0.0_dev"}`,
          }),
        }
      );

      const { data, error } = await supabase
        .from("clients")
        .update({
          provisioning_status: STATUS_IN_PROGRESS,
        })
        .eq("id", companyInfo?.client_id);

      if (error) {
        throw new Error(error.message);
      }

      setStartLogging(true);
      return {
        ...response,
        data,
      };
    } catch (err) {
      // await supabase
      //   .from("clients")
      //   .update({
      //     provisioning_status: "FAILED",
      //   })
      //   .eq("id", companyInfo?.client_id);

      return err;
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
    let timeout: ReturnType<typeof setTimeout>;

    if (toastState.show) {
      timeout = setTimeout(() => {
        setToastState({ show: false, message: "", isError: false });
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [toastState.show]);

  useEffect(() => {
    if (startLogging) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get<any>(
            `https://api-portal-dev.everesteffect.com/provision-logs?provider_name=${watchWebAddress}&bucket_name=ee-provision-dev`
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
      }, 10000); // 10 seconds

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLogging]);

  useEffect(() => {
    const getLogs = async () => {
      const { data } = await axios.get<any>(
        `https://api-portal-dev.everesteffect.com/provision-logs?provider_name=${
          watchWebAddress || companyInfo?.web_address
        }&bucket_name=ee-provision-dev`
      );

      if (companyInfo?.provisioning_status === STATUS_IN_PROGRESS) {
        await supabase
          .from("clients")
          .update({
            provisioning_status: STATUS_COMPLETED,
          })
          .eq("id", companyInfo?.client_id);
      }

      setLogs(data?.log_content);
    };

    if (companyInfo?.provisioning_status === STATUS_IN_PROGRESS) {
      setStartLogging(true);
    } else if (companyInfo?.provisioning_status === STATUS_COMPLETED) {
      getLogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyInfo?.provisioning_status]);

  if (isFirstRender || !companyInfo) {
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
                            src={value as string}
                            alt="Tonis Kitchen"
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
        {toastState.show && (
          <Toast
            className={`absolute right-5 top-5 z-[9999] ${
              toastState?.isError ? "bg-red-600" : "bg-primary-500"
            }`}
          >
            <div className="ml-3 text-sm font-normal text-white">
              {toastState?.message}
            </div>
            <Toast.Toggle
              className={toastState?.isError ? "bg-red-600" : "bg-primary-500"}
              onClick={() =>
                setToastState({ show: false, message: "", isError: false })
              }
            />
          </Toast>
        )}
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
