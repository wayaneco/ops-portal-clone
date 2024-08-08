import { Avatar, Button, Card, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

import TonisKitchen from "public/tonis.svg";
const Page = function () {
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => (
              <Link key={4} href={`/company/${k}`}>
                <div className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-gray-200">
                  <Avatar
                    bordered
                    img={(avatarProps) => (
                      <Image
                        src={TonisKitchen}
                        alt="Tonis Kitchen"
                        {...avatarProps}
                      />
                    )}
                    size="md"
                  />
                  <div className="text-lg">Toni&apos;s Kitchen - {k}</div>
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
};

export default Page;
