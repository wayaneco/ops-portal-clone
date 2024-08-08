"use client";

import { TextInput, Button, Avatar } from "flowbite-react";
import {} from "react-beautiful-dnd";

export const ProviderType = () => {
  return (
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
};
