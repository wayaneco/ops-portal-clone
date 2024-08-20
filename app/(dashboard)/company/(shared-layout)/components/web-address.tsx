import { Label, TextInput, Button, List, Spinner } from "flowbite-react";
import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { useProvisionLoggingContext } from "./company-detail";
import { createClient } from "@/utils/supabase/client";

export const WebAddress = () => {
  const supabase = createClient();

  const inputRef = useRef();
  const [status, setStatus] = useState({
    isFetching: false,
    isDone: false,
  });
  const [isWebAddressExist, setIsWebAddressExist] = useState<boolean>(false);
  const { control, watch, setValue } = useFormContext();

  const { logs, handleProvision, isProvisioning, isCompleted } =
    useProvisionLoggingContext();

  const watchWebAddress = watch("web_address");
  const isUpdate = watch("isUpdate");

  const isProvisionButtonDisabled =
    !isUpdate ||
    isProvisioning ||
    isCompleted ||
    isWebAddressExist ||
    status?.isFetching;

  const handleDebounce = useDebouncedCallback(async (value: string) => {
    if (value) {
      setStatus({
        isFetching: true,
        isDone: false,
      });
      const { data } = await supabase
        .from("clients")
        .select("name")
        .ilike("name", value);

      if (data?.length) {
        setIsWebAddressExist(true);
        setValue("isWebAddressValid", false);
      } else {
        setValue("isWebAddressValid", true);
      }

      setStatus({ isFetching: false, isDone: true });
    }
  }, 1000); // 1 SECONDS

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
                setValue("isWebAddressValid", false);
                setStatus({
                  isFetching: true,
                  isDone: false,
                });
                setIsWebAddressExist(false);

                !event?.target?.value &&
                  setStatus({
                    isFetching: false,
                    isDone: false,
                  });
                handleDebounce(event?.target?.value);
                onChange(event?.target?.value);
              }}
            />
          )}
        />
        <Button
          color="primary"
          disabled={isProvisionButtonDisabled}
          onClick={handleProvision}
        >
          <span>{isProvisioning ? "Provisioning..." : "Provision"}</span>{" "}
          {isProvisioning && <Spinner className="ml-2" />}
        </Button>
      </div>
      <div className="text-sm mt-2 ml-2 text-black">
        {status.isDone && (
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
        )}
        {status.isFetching && (
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
                <List>
                  {isProvisioning && !logs?.length && (
                    <>
                      <List.Item className="flex items-center">
                        [1] Attempt to get the CodeBuild project information{" "}
                        <svg
                          className="w-6 h-6 text-green-400 dark:text-white"
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
                            d="M5 11.917 9.724 16.5 19 7.5"
                          />
                        </svg>
                      </List.Item>
                      <List.Item className="flex items-center">
                        [2] Check Project ee-provision-dev exists{" "}
                        <svg
                          className="w-6 h-6 text-green-400 dark:text-white"
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
                            d="M5 11.917 9.724 16.5 19 7.5"
                          />
                        </svg>
                      </List.Item>
                      <List.Item className="flex items-center">
                        [3] Start CodeBuild project with environment variables{" "}
                        <svg
                          className="w-6 h-6 text-green-400 dark:text-white"
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
                            d="M5 11.917 9.724 16.5 19 7.5"
                          />
                        </svg>
                      </List.Item>
                    </>
                  )}

                  {logs?.map((item: any, index: any) => (
                    <List.Item key={index} className="flex items-center">
                      {item.event}{" "}
                      <svg
                        className="w-6 h-6 text-green-400 dark:text-white"
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
                          d="M5 11.917 9.724 16.5 19 7.5"
                        />
                      </svg>
                    </List.Item>
                  ))}

                  {logs?.length < 7 && (
                    <div className="flex items-center gap-x-5">
                      {/* <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-56 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-40 animate-pulse" /> */}
                      <Spinner color="primary" />
                    </div>
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
