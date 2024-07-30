"use client";

import {
  Avatar,
  Sidebar,
  SidebarItems,
  SidebarItemGroup,
  SidebarItem,
  TextInput,
  Button,
  Label,
  Card,
} from "flowbite-react";
import { NextPage } from "next";
import { useContext } from "react";
import { SidebarContext, SidebarContextType } from "../context";

export default function Page(props: NextPage) {
  const { pathname } = useContext<SidebarContextType | undefined>(
    SidebarContext
  )!;

  return (
    <div className="absolute left-0 right-0 overflow-x-hidden">
      <div className="bg-gray-50">
        <div className="flex gap-x-4 items-center">
          <div className="w-64">
            <Avatar
              img="https://www.everesteffect.com/img/ee_logo_dark.svg"
              size="lg"
            />
          </div>
          <TextInput
            color="primary"
            placeholder="Add client name"
            className="w-[450px]"
          />
          <Button color="primary">Done</Button>
        </div>
      </div>
      <div className="h-full w-full pl-64">
        <div className="m-8">
          <Card>
            <div className="p-8">{getDynamicComponent(pathname)}</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const getDynamicComponent = (routeName: string) => {
  let component;
  switch (routeName) {
    case "webAddress":
      component = (
        <div>
          <Label className="mb-2 block">Host Name</Label>
          <div className="flex gap-x-4">
            <TextInput
              color="primary"
              placeholder="domain.everesteffect.com"
              className="w-[450px] placeholder-shown:italic"
            />
            <Button color="primary">Provision</Button>
          </div>
          <div className="text-sm mt-2 ml-2 ">
            Required to provision the Everest Portal subdomain for this client
          </div>
        </div>
      );
      break;

    case "serviceLocation":
      component = <div>Test</div>;
      break;

    case "serviceProvided":
      component = (
        <div>
          <div className="flex item-center gap-x-4">
            <TextInput
              placeholder="Search service provided"
              color="primary"
              className="w-[450px]"
            />
            <Button color="primary">Search</Button>
            <div className="ml-auto">
              <Button color="primary">Create new service</Button>
            </div>
          </div>
          <div className="mt-10">
            <div className="overflow-y-auto">
              <div className="max-h-[calc(100vh-550px)]">
                <div className="bg-white">
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Button color="primary">Add</Button>
          </div>
        </div>
      );
      break;

    case "tags":
      component = (
        <div>
          <div className="flex item-center gap-x-4">
            <TextInput
              placeholder="Search organizational tags"
              color="primary"
              className="w-[450px]"
            />
            <Button color="primary">Search</Button>
            <div className="ml-auto">
              <Button color="primary">Create new tag</Button>
            </div>
          </div>
          <div className="mt-10">
            <div className="overflow-y-auto">
              <div className="max-h-[calc(100vh-550px)]">
                <div className="bg-white">
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Button color="primary">Add</Button>
          </div>
        </div>
      );
      break;

    case "providerType":
      component = (
        <div>
          <div className="flex item-center gap-x-4">
            <TextInput
              placeholder="Search provider types"
              color="primary"
              className="w-[450px]"
            />
            <Button color="primary">Search</Button>
            <div className="ml-auto">
              <Button color="primary">Create new type</Button>
            </div>
          </div>
          <div className="mt-10">
            <div className="overflow-y-auto">
              <div className="max-h-[calc(100vh-550px)]">
                <div className="bg-white">
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Toni&apos;s Kitchen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Button color="primary">Add</Button>
          </div>
        </div>
      );
      break;
    default:
      component = null;
      break;
  }

  return component;
};
