import { Avatar, Button, Card, TextInput } from "flowbite-react";
import { NextPage } from "next";
import Link from "next/link";

export default function Page(props: NextPage) {
  return (
    <div className="py-16">
      <Card>
        <TextInput
          placeholder="Search by company"
          color="primary"
          className="w-[450px]"
        />

        <div className="overflow-auto bg-gray-100">
          <div className="h-[calc(100vh-500px)]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, k) => (
              <Link key={4} href={`/company/${k + 1}`}>
                <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-gray-200">
                  <Avatar
                    img="https://mrwallpaper.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg"
                    size="md"
                  />
                  <div className="text-lg">Toni&apos;s Kitchen - {k + 1}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <Link href="/company/add">
            <Button color="primary">Add new</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
