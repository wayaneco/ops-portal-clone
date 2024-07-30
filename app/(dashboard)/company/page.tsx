import { Avatar, Button, Card, TextInput } from "flowbite-react";
import { NextPage } from "next";
import Link from "next/link";

export default function Page(props: NextPage) {
  return (
    <div className="py-14">
      <TextInput
        placeholder="Search by company"
        color="primary"
        className="w-[450px]"
      />
      <div className="mt-10">
        <Card>
          <div className="overflow-auto">
            <div className="h-[calc(100vh-500px)]">
              <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-gray-100 ">
                <Avatar
                  img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                  size="md"
                />
                <div className="text-lg">Toni&apos;s Kitchen</div>
              </div>
              <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-gray-100 ">
                <Avatar
                  img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                  size="md"
                />
                <div className="text-lg">Toni&apos;s Kitchen</div>
              </div>
              <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-gray-100 ">
                <Avatar
                  img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                  size="md"
                />
                <div className="text-lg">Toni&apos;s Kitchen</div>
              </div>
              <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-gray-100 ">
                <Avatar
                  img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                  size="md"
                />
                <div className="text-lg">Toni&apos;s Kitchen</div>
              </div>
              <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-gray-100 ">
                <Avatar
                  img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                  size="md"
                />
                <div className="text-lg">Toni&apos;s Kitchen</div>
              </div>
              <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-gray-100 ">
                <Avatar
                  img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                  size="md"
                />
                <div className="text-lg">Toni&apos;s Kitchen</div>
              </div>
              <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-gray-100 ">
                <Avatar
                  img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                  size="md"
                />
                <div className="text-lg">Toni&apos;s Kitchen</div>
              </div>
              <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-gray-100 ">
                <Avatar
                  img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                  size="md"
                />
                <div className="text-lg">Toni&apos;s Kitchen</div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Link href="/company/add">
              <Button color="primary">Add new</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
