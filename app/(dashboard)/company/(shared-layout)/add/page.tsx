"use client";

import { Avatar, TextInput, Button, Label, Card } from "flowbite-react";
import {
  ChangeEvent,
  LegacyRef,
  MutableRefObject,
  useContext,
  useRef,
} from "react";
import { SidebarContext, SidebarContextType } from "../context";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Image from "next/image";

import TonisKitchen from "public/tonis.svg";
import ImagePlaceholder from "public/image-placeholder.jpg";

import { schema } from "./schema";
import { AddClientForm } from "./add-form";
import { read } from "fs";

const Page = function () {
  const { pathname } = useContext<SidebarContextType | undefined>(
    SidebarContext
  )!;
  const inputRef = useRef<HTMLInputElement>();

  const methods = useForm({
    defaultValues: {
      logo: "",
      name: "",
      web_address: "",
      longitude: "",
      latitude: "",
      is_enabled: false,
      service_provided: [],
      tags: [],
      provider_types: [],
      provisioning_status: "DRAFT",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

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
                      className="flex items-center cursor-pointer"
                      onClick={() => inputRef.current?.click()}
                    >
                      {!value ? (
                        <div className="flex items-center justify-center w-20 h-20 bg-gray-300 rounded  dark:bg-gray-700">
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
                        <Avatar
                          img={(avatarProps) => (
                            <img
                              src={value}
                              width="100%"
                              alt="Tonis Kitchen"
                              {...avatarProps}
                            />
                          )}
                          size="lg"
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
                            methods.setValue("logo", reader?.result);
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
              <Button type="submit" color="primary">
                Done
              </Button>
            </div>
          </div>
          <div className="h-full w-full pl-64">
            <div className="m-8">
              <Card>
                <div className="p-8">
                  <AddClientForm routeName={pathname} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Page;
