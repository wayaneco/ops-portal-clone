"use client";

import { ReactNode, useContext, useState } from "react";
import { Button, Navbar as FBNavbar, NavbarBrand } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AuthContext } from "../Context/SupabaseSessionProvider";
import { createClient } from "@/utils/supabase/client";

export default function Navbar({
  privileges,
}: {
  privileges: string;
}): ReactNode {
  const supabase = createClient();
  const { session } = useContext(AuthContext)!;
  const pathname = usePathname();

  const regex = new RegExp(/^\/company?\w/);

  const dynamicLinks = (privileges: string) => {
    let component;
    switch (privileges) {
      default:
        component = (
          <>
            <FBNavbar.Link
              href="/user"
              className={`text-base md:text-lg ${
                pathname === "/user" && "text-primary-500"
              }`}
            >
              User
            </FBNavbar.Link>
            <FBNavbar.Link
              href="/company"
              className={`text-base md:text-lg ${
                regex.test(pathname) && "text-primary-500"
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
    <FBNavbar className="fixed w-full" fluid={/^\/company\/\w/.test(pathname)}>
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
        <Button
          color="white"
          type="button"
          onClick={() => {
            supabase.auth.signOut();
          }}
        >
          Logout
        </Button>
      ) : (
        <Link href="/login" className="text-base md:text-lg hidden md:block">
          Login
        </Link>
      )}
    </FBNavbar>
  );
}
