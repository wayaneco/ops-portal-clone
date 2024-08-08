"use client";

import { Avatar, TextInput, Button, Label, Card } from "flowbite-react";
import { NextPage } from "next";
import { useContext } from "react";
import { SidebarContext, SidebarContextType } from "../context";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Image from "next/image";

import TonisKitchen from "public/tonis.svg";

import { schema } from "./schema";
import { AddClientForm } from "./add-form";

export default function Page(props: NextPage) {
  const { pathname } = useContext<SidebarContextType | undefined>(
    SidebarContext
  )!;

  const methods = useForm({
    defaultValues: {
      name: "Tinos Kitchen",
      web_address: "test.everesteffect.com",
      longitude: "",
      latitude: "",
      is_enabled: false,
      tags: [],
      provider_type: [],
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
          <div className="bg-gray-50">
            <div className="flex gap-x-4 items-center">
              <div className="w-64">
                <Avatar
                  img={(avatarProps) => (
                    <Image
                      src={TonisKitchen}
                      alt="Tonis Kitchen"
                      {...avatarProps}
                    />
                  )}
                  size="lg"
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
              <Button color="primary">Done</Button>
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
}
