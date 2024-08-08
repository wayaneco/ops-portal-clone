"use client";

import { Avatar, TextInput, Button, Label, Card } from "flowbite-react";
import { useContext } from "react";
import { SidebarContext, SidebarContextType } from "../context";

import TonisKitchen from "public/tonis.svg";
import Image from "next/image";
const Page = function (props: { params: { id: string } }) {
  const { pathname } = useContext<SidebarContextType | undefined>(
    SidebarContext
  )!;

  return (
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
          <TextInput
            color="primary"
            placeholder="Add client name"
            className="w-[450px]"
            defaultValue="Toni's Kitchen"
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
};

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
              defaultValue="tonis-kitchen.everesteffect.com"
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
      component = (
        <div>
          {/* <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                className="gmap_iframe"
                width="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=961&amp;height=448&amp;hl=en&amp;q=makati&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
              <a href="https://embed-googlemap.com">
                embed google maps in website
              </a>
            </div>
          </div> */}
          Service Location Body
        </div>
      );
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
                    <div className="text-lg">Service No - 1</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Service No - 2</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Service No - 3</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Service No - 4</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Service No - 5</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Service No - 6</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Service No - 7</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Service No - 8</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Service No - 9</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Service No - 10</div>
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
                    <div className="text-lg">Tag No - 1</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Tag No - 2</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Tag No - 3</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Tag No - 4</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Tag No - 5</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Tag No - 6</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Tag No - 7</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Tag No - 8</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Tag No - 9</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Tag No - 10</div>
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
                    <div className="text-lg">Type No - 1</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Type No - 2</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Type No - 3</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Type No - 4</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Type No - 5</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Type No - 6</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Type No - 7</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Type No - 8</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Type No - 9</div>
                  </div>
                  <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-blue-100 ">
                    <Avatar
                      img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                      size="md"
                    />
                    <div className="text-lg">Type No - 10</div>
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

export default Page;
