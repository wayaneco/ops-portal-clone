"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Navbar as FBNavbar, Select } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";

import { useSupabaseSessionContext } from "../Context/SupabaseSessionProvider";
import { useUserClientProviderContext } from "../Context/UserClientContext";

import { ClientsType } from "@/app/types";
import {
  ROLE_NETWORK_ADMIN,
  ROLE_COMPANY_ADMIN,
  ROLE_AGENT,
} from "@/app/constant";
import { logOutUser } from "@/app/actions/auth/logout";

import * as EverestEffect from "public/everest-effect.svg";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useSupabaseSessionContext();
  const {
    changeClient,
    clientLists,
    selectedClient,
    currentPrivilege,
    selectRef,
    hasAdminRole,
  } = useUserClientProviderContext();

  const REGEX_COMPANY_PAGE = new RegExp(/^\/company?\w/);
  const REGEX_USER_PAGE = new RegExp(/^\/user?(\/\w)?.+/);
  const REGEX_USER_ID_PAGE = new RegExp(/^\/user\/\w/);

  const MenuList = ({ currentPrivilege }: { currentPrivilege: Array<any> }) => {
    const isEnable = (expectedPrivilege: Array<any>) => {
      return currentPrivilege?.some((current) =>
        expectedPrivilege?.includes(current)
      );
    };

    return (
      <>
        {(isEnable([ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN, ROLE_AGENT]) ||
          hasAdminRole) && (
          <FBNavbar.Link
            as={Link}
            active={REGEX_USER_PAGE.test(pathname)}
            href={
              !hasAdminRole &&
              !isEnable([ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN])
                ? `/user/${user?.id}`
                : "/user"
            }
            className="text-base md:text-lg"
          >
            User
          </FBNavbar.Link>
        )}
        {(isEnable([ROLE_NETWORK_ADMIN, ROLE_COMPANY_ADMIN]) ||
          hasAdminRole) && (
          <FBNavbar.Link
            as={Link}
            active={REGEX_COMPANY_PAGE.test(pathname)}
            href={!hasAdminRole ? `/company/${selectedClient}` : "/company"}
            className="text-base md:text-lg"
          >
            Company
          </FBNavbar.Link>
        )}
        {(isEnable([ROLE_NETWORK_ADMIN, ROLE_AGENT]) || hasAdminRole) && (
          <FBNavbar.Link
            as={Link}
            active={pathname === "/kiosk"}
            href="/kiosk"
            className="text-base md:text-lg"
          >
            Kiosk
          </FBNavbar.Link>
        )}
      </>
    );
  };

  const GenerateFieldForActiveClient = () => {
    const { userInfo } = useSupabaseSessionContext();
    let component;

    let clientList: any = [];

    if (hasAdminRole) {
      clientList = clientLists;
    } else {
      clientList = userInfo?.clients;
    }

    switch (true) {
      case clientList?.length > 1:
        if (
          hasAdminRole &&
          (REGEX_COMPANY_PAGE.test(pathname) ||
            REGEX_USER_ID_PAGE.test(pathname))
        ) {
          component = (
            <div className="flex items-center gap-x-2 text-gray-600">
              <strong>{userInfo?.email}</strong> as{" "}
              <strong>Network Admin</strong>
            </div>
          );
        } else {
          component = (
            <div className="flex items-center gap-x-2 text-gray-600">
              <strong>{userInfo?.email}</strong>
              <div className="">on behalf of</div>
              <Select
                ref={selectRef}
                color="primary"
                className="w-36"
                value={selectedClient}
                onChange={(event) => {
                  changeClient(event?.target?.value);
                }}
              >
                {clientList?.map((client: ClientsType, index: number) => (
                  <option key={index} value={client?.id}>
                    {client?.name}
                  </option>
                ))}
              </Select>
            </div>
          );
        }
        break;
      case clientList?.length === 1:
        component = (
          <div className="flex items-center gap-x-2 text-gray-600">
            <strong>{userInfo?.email}</strong>
            <div className="">on behalf of</div>
            <strong>{userInfo?.clients[0].name}</strong>
          </div>
        );
        break;
      default:
        component = (
          <div className="flex items-center gap-x-2 text-gray-600">
            <div className="">Welcome,</div>
            <strong>{userInfo?.email}</strong>
          </div>
        );
        break;
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
        <Image src={EverestEffect} alt="Everest Effect Logo" fill />
      </FBNavbar.Brand>
      <FBNavbar.Toggle />
      <FBNavbar.Collapse className="flex-none md:flex-1">
        <MenuList currentPrivilege={currentPrivilege} />
        <FBNavbar.Link
          href="/auth"
          className="text-base md:text-lg block md:hidden"
        >
          Logout
        </FBNavbar.Link>
      </FBNavbar.Collapse>
      {user ? (
        <div className="flex items-center gap-x-4">
          <GenerateFieldForActiveClient />
          <Button
            color="white"
            type="button"
            className="text-black hidden md:block"
            onClick={async () => {
              try {
                const response = await logOutUser();

                if (!response.ok) throw response?.message;

                router.replace("/login");
              } catch (error) {
                console.log(error);
              }
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
};

export default Navbar;
