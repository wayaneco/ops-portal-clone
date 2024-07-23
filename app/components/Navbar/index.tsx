"use client";

import { ReactNode } from "react";
import { Navbar as FBNavbar, NavbarBrand } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar(): ReactNode {
  return (
    // <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    //   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
    //     <div className="flex">
    //       <Link href="/">
    //         <Image
    //           src="https://www.everesteffect.com/img/ee_logo_dark.svg"
    //           alt="Everest Effect Logo"
    //           width={120}
    //           height={80}
    //           className="mr-8 p-2"
    //         />
    //       </Link>
    //       <div
    //         className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
    //         id="navbar-sticky"
    //       >
    //         <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
    //               aria-current="page"
    //             >
    //               User
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //             >
    //               Company
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //             >
    //               Kiosk
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="self-center">
    //       <div className="flex items-center gap-x-2 text-lg p-2">
    //         {/* <div>Toni&apos;s Kitchen</div> */}
    //         <Link href="/auth">Login</Link>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <FBNavbar>
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
        <FBNavbar.Link href="#" className="text-base md:text-lg">
          Company
        </FBNavbar.Link>
        <FBNavbar.Link href="#" className="text-base md:text-lg">
          Kiosk
        </FBNavbar.Link>
        <FBNavbar.Link
          href="/auth"
          className="text-base md:text-lg block md:hidden"
        >
          Login
        </FBNavbar.Link>
      </FBNavbar.Collapse>
      <Link href="/auth" className="text-base md:text-lg hidden md:block">
        Login
      </Link>
    </FBNavbar>
  );
}
