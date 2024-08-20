"use client";

import { ReactNode } from "react";
import { Button, Navbar as FBNavbar, Select } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSupabaseSessionContext } from "../Context/SupabaseSessionProvider";
import { createClient } from "@/utils/supabase/client";
import { ClientsType, UserDetailType } from "@/app/types";

export default function Navbar({
  privileges,
}: {
  privileges: string;
}): ReactNode {
  const supabase = createClient();
  const pathname = usePathname();

  const { session, userInfo } = useSupabaseSessionContext();

  const REGEX_COMPANY_PAGE = new RegExp(/^\/company?\w/);
  const REGEX_USER_PAGE = new RegExp(/^\/user?(\/\w)?.+/);

  const dynamicLinks = (privileges: string) => {
    let component;
    switch (privileges) {
      default:
        component = (
          <>
            <FBNavbar.Link
              href="/user"
              className={`text-base md:text-lg ${
                REGEX_USER_PAGE.test(pathname) && "text-primary-500"
              }`}
            >
              User
            </FBNavbar.Link>
            <FBNavbar.Link
              href="/company"
              className={`text-base md:text-lg ${
                REGEX_COMPANY_PAGE.test(pathname) && "text-primary-500"
              }`}
            >
              Company
            </FBNavbar.Link>
            <FBNavbar.Link
              href="/kiosk"
              className={`text-base md:text-lg ${
                pathname === "/kiosk" && "text-primary-500"
              }`}
            >
              Kiosk
            </FBNavbar.Link>
          </>
        );
    }
    return component;
  };

  return (
    <FBNavbar
      className="fixed w-full z-50 shadow-md"
      fluid={/^\/company\/\w/.test(pathname)}
    >
      <FBNavbar.Brand
        as={Link}
        href="/"
        className="w-[100px] h-[80px] relative mr-10"
      >
        <Image
          src="https://www.everesteffect.com/img/ee_logo_dark.svg"
          alt="Everest Effect Logo"
          fill
        />
      </FBNavbar.Brand>
      <FBNavbar.Toggle />
      <FBNavbar.Collapse className="flex-none md:flex-1">
        {dynamicLinks(privileges)}
        <FBNavbar.Link
          href="/auth"
          className="text-base md:text-lg block md:hidden"
        >
          Logout
        </FBNavbar.Link>
      </FBNavbar.Collapse>
      {session ? (
        <div className="flex items-center gap-x-4">
          {generateFieldForActiveClient(userInfo)}
          <Button
            color="white"
            type="button"
            className="text-black hidden md:block"
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link
          href="/login"
          className="text-base text-black md:text-lg hidden md:block"
        >
          Login
        </Link>
      )}
    </FBNavbar>
  );
}

const generateFieldForActiveClient = (userInfo: UserDetailType) => {
  let component;

  switch (true) {
    case userInfo?.clients?.length > 1:
      component = (
        <div className="flex items-center gap-x-2">
          <strong>{userInfo?.email}</strong>
          <div className="">in behalf of</div>
          <Select color="primary" value={userInfo?.clients?.[0]?.id}>
            {userInfo?.clients?.map((client: ClientsType, index: number) => (
              <option key={index} value={client?.id}>
                {client?.name}
              </option>
            ))}
          </Select>
        </div>
      );
      break;
    case userInfo?.clients?.length === 1:
      component = (
        <div className="flex items-center gap-x-2">
          <strong>{userInfo?.email}</strong>
          <div className="">in behalf of</div>
          <strong>{userInfo?.clients[0].name}</strong>
        </div>
      );
      break;
    default:
      component = (
        <div className="flex items-center gap-x-2">
          <div className="">Welcome,</div>
          <strong>{userInfo?.email}</strong>
        </div>
      );
      break;
  }

  return component;
};
