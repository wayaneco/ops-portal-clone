"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableCell,
} from "flowbite-react";

export default function Loading() {
  return (
    <div className="py-8">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
      <div className="mt-5">
        <div className="flex">
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="flex-1 mx-10">
            <form>
              <div className="flex flex-col gap-y-2">
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              </div>
            </form>
          </div>
          <div>
            <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
          </div>
        </div>
        <div className="mt-10">
          <div className="overflow-x-auto">
            <Table border={1}>
              <TableHead>
                <TableHeadCell>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                </TableHeadCell>
                <TableHeadCell>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                </TableHeadCell>
                <TableHeadCell className="w-40 text-center">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                </TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                <Table.Row>
                  <TableCell>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                  </TableCell>
                  <TableCell>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-x-2">
                      <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                      <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                    </div>
                  </TableCell>
                </Table.Row>
              </TableBody>
            </Table>
          </div>
          <div className="mt-10">
            <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
