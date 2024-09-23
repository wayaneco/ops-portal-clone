import { Label, TextInput, Button, List, Spinner } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { useProvisionLoggingContext } from "./company-detail";

import { REGEX_WEB_ADDRESS_FIELD, STATUS_PROVISION } from "@/app/constant";

const provisionApiUrl = process.env["NEXT_PUBLIC_PROVISION_API"] as string;
const xApiKey = process.env["NEXT_PUBLIC_PROVISION_X_API_KEY"] as string;

export const WebAddress = () => {
  const inputRef = useRef();
  const [status, setStatus] = useState({
    isFetching: false,
    isDone: false,
  });
  const [isWebAddressExist, setIsWebAddressExist] = useState<boolean>(false);
  const [startProvision, setStartProvision] = useState<boolean>(false);
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { logs, handleProvision, isProvisioning, isCompleted, companyInfo } =
    useProvisionLoggingContext();

  const watchWebAddress = watch("web_address");
  const isUpdate = watch("isUpdate");

  const isProvisionButtonDisabled =
    !isUpdate ||
    startProvision ||
    isProvisioning ||
    isCompleted ||
    isWebAddressExist ||
    status?.isFetching;

  const handleDebounce = useDebouncedCallback(async (value: string) => {
    if (companyInfo?.web_address === value) return;

    if (value) {
      setStatus({
        isFetching: true,
        isDone: false,
      });

      const response = await fetch(
        `${provisionApiUrl}/check-hostname?hostname=${value}`,
        {
          method: "GET",
          headers: {
            "x-api-key": xApiKey,
          },
        }
      );
      const responseData = await response.text();

      const isAlreadyExist = responseData === "true";

      setIsWebAddressExist(isAlreadyExist);
      setValue("isWebAddressValid", !isAlreadyExist);
      setStatus({ isFetching: false, isDone: true });
    }
  }, 1000); // 1 SECONDS

  useEffect(() => {
    if (isCompleted) {
      setStartProvision(false);
    }
  }, [isCompleted]);

  return (
    <>
      <Label className="mb-2 block">Host Name</Label>
      <div className="flex gap-x-4">
        <Controller
          control={control}
          name="web_address"
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <TextInput
              ref={inputRef as any}
              color="primary"
              onPaste={(event) => {
                let copiedText = (
                  event.clipboardData || (window as any)?.clipboardData
                ).getData("text");

                if (!REGEX_WEB_ADDRESS_FIELD.test(copiedText)) {
                  event?.preventDefault();
                }
              }}
              placeholder="domain.everesteffect.com"
              className="w-[450px] placeholder-shown:italic "
              value={value}
              disabled={isProvisioning || isCompleted}
              onKeyPress={(e) => {
                e.persist();
                if (!/^(\d|\w)+$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={async (event) => {
                const { value } = event.target;

                setValue("isWebAddressValid", false);
                setIsWebAddressExist(false);
                setStatus({
                  isFetching: false,
                  isDone: false,
                });

                onChange(value);

                handleDebounce.cancel();

                if (
                  companyInfo?.web_address !== value &&
                  REGEX_WEB_ADDRESS_FIELD.test(value)
                ) {
                  setStatus({
                    isFetching: true,
                    isDone: false,
                  });
                  handleDebounce(value);
                }
              }}
            />
          )}
        />
        {!isCompleted ? (
          <Button
            color="primary"
            disabled={isProvisionButtonDisabled}
            onClick={() => {
              setStartProvision(true);
              handleProvision();
            }}
          >
            <span>
              {isProvisioning || startProvision
                ? "Provisioning..."
                : "Provision"}
            </span>{" "}
            {(isProvisioning || startProvision) && <Spinner className="ml-2" />}
          </Button>
        ) : (
          <Button color="primary">Terminate</Button>
        )}
      </div>
      <div className="text-sm mt-2 ml-2 text-black">
        {errors?.web_address?.message ? (
          <small className="text-xs text-red-500">
            {String(errors?.web_address?.message)}
          </small>
        ) : (
          status.isDone && (
            <>
              {isWebAddressExist ? (
                <div className="flex items-center">
                  <strong className="text-red-500">{watchWebAddress}</strong>
                  <span className="ml-1">is already taken.</span>
                  <svg
                    className="ml-1 w-4 h-4 text-red-500 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center">
                  <strong className="text-green-500">{`${watchWebAddress.toLowerCase()}.everesteffect.com`}</strong>{" "}
                  <span className="ml-1"> is available.</span>
                  <svg
                    className="w-6 h-6 text-green-400 ml-1 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              )}
            </>
          )
        )}
        {!errors?.web_address && status.isFetching && (
          <div className="flex gap-x-3">
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[130px] mb-4 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[80px] mb-4 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px] mb-4 animate-pulse"></div>
          </div>
        )}
      </div>
      <div className="mt-10">
        <div className="overflow-auto max-h-[calc(100vh-470px)]">
          <div className="flex flex-col">
            {(!!logs?.length || isProvisioning) && (
              <>
                <h3 className="text-xl font-semibold mb-4 text-black">
                  Provision Log Content
                </h3>
                <List className="overflow-hidden">
                  {logs?.map(
                    (
                      item: { event: string; status: STATUS_PROVISION },
                      index: any,
                      all
                    ) => {
                      const completedLength = all.filter(
                        (log) => log?.status === "completed"
                      ).length;

                      const isNextProcess = completedLength === index;

                      return (
                        <List.Item
                          key={index}
                          className="flex items-start gap-x-2 gap-y-3 h-auto"
                        >
                          {item?.status === "pending" ? (
                            <Spinner
                              className="w-5 h-5"
                              size="md"
                              color="primary"
                            />
                          ) : (
                            <svg
                              className="min-w-6 min-h-6 w-6 h-6 text-primary-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          )}
                          <span
                            className={
                              index < completedLength || isNextProcess
                                ? "text-gray-800 font-medium"
                                : "text-gray-400"
                            }
                          >
                            {item.event}
                          </span>
                        </List.Item>
                      );
                    }
                  )}
                </List>
              </>
            )}
            {isCompleted && (
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4 text-black">
                  SUCCESSFULLY PROVISIONED
                </h3>

                <div className="flex items-center">
                  <strong
                    className="text-primary-500 underline mr-1 cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://${watchWebAddress.toLowerCase()}.everesteffect.com`,
                        "_blank"
                      )
                    }
                  >
                    {`https://${watchWebAddress.toLowerCase()}.everesteffect.com`}
                  </strong>
                  <span className="mr-1 text-gray-700">is provisioned.</span>
                </div>
                <div className="mt-4">
                  <strong>Note:</strong> DNS propagation takes 24-48 hours to be
                  completed.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
