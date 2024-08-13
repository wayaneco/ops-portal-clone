"use client";

import { TextInput, Button, Card } from "flowbite-react";
import { ChangeEvent, LegacyRef, useContext, useRef } from "react";
import { SidebarContext, SidebarContextType } from "../context";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { schema } from "../schema";
import { AddClientForm } from "../components/form";
import { ClientsType } from "@/app/types";

type CompanyDetailType = {
  companyInfo?: ClientsType;
};

const CompanyDetail = function ({ companyInfo }: CompanyDetailType) {
  const { pathname } = useContext<SidebarContextType | undefined>(
    SidebarContext
  )!;
  const inputRef = useRef<HTMLInputElement>();

  const methods = useForm({
    defaultValues: {
      logo: companyInfo?.logo_url ?? null,
      name: companyInfo?.name ?? "",
      web_address: companyInfo?.web_address ?? "",
      longitude: companyInfo?.longitude ?? "",
      latitude: companyInfo?.latitude ?? "",
      is_enabled: companyInfo?.is_enabled ?? false,
      service_provided: companyInfo?.service_provided ?? [],
      tags: companyInfo?.tags ?? [],
      provider_types: companyInfo?.provider_types ?? [],
      provisioning_status: companyInfo?.provisioning_status ?? "DRAFT",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  const watchName = methods.watch("name");
  const watchWebAddress = methods.watch("web_address");

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="absolute left-0 right-0 overflow-x-hidden">
          <div className="relative z-50 bg-gray-50">
            <div className="flex gap-x-4 items-center">
              <div className="w-64">
                <Controller
                  control={methods.control}
                  name="logo"
                  render={({ field: { value, onChange } }) => (
                    <div
                      className="flex items-center justify-center cursor-pointer"
                      onClick={() => inputRef.current?.click()}
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
                          src={value}
                          alt="Tonis Kitchen"
                          className="w-auto h-20"
                        />
                      )}
                      <input
                        className="hidden"
                        type="file"
                        ref={inputRef as LegacyRef<HTMLInputElement>}
                        accept="image/**"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          if (!event?.currentTarget?.files![0]) return;

                          var file = event?.currentTarget?.files![0];

                          var reader = new FileReader();
                          reader.onloadend = function () {
                            onChange(reader.result);
                          };

                          reader.readAsDataURL(file);
                        }}
                      />
                    </div>
                  )}
                />
              </div>
              <Controller
                control={methods.control}
                name="name"
                render={({ field }) => (
                  <TextInput
                    color="primary"
                    placeholder="Add client name"
                    className="w-[450px]"
                    {...field}
                  />
                )}
              />
              <Button
                type="submit"
                color="primary"
                disabled={!watchName || !watchWebAddress}
              >
                {companyInfo ? "Update Company" : "Add Company"}
              </Button>
            </div>
          </div>
          <div className="h-full w-full pl-64">
            <AddClientForm routeName={pathname} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CompanyDetail;
