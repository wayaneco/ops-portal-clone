"use client";

import { ReactNode } from "react";
import { Button, Navbar as FBNavbar, NavbarBrand } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar(): ReactNode {
  return (
    <FBNavbar className="fixed w-full">
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
        <FBNavbar.Link href="/user" className="text-base md:text-lg">
          User
        </FBNavbar.Link>
        <FBNavbar.Link href="/company" className="text-base md:text-lg">
          Company
        </FBNavbar.Link>
        <FBNavbar.Link href="#" className="text-base md:text-lg">
          Kiosk
        </FBNavbar.Link>
        <FBNavbar.Link
          href="/auth"
          className="text-base md:text-lg block md:hidden"
        >
          Logout
        </FBNavbar.Link>
      </FBNavbar.Collapse>
      <Link href="/auth" className="text-base md:text-lg hidden md:block">
        Logout
      </Link>
    </FBNavbar>
  );
}
