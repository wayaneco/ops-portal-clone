"use client";

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
export default function Loading() {
  return (
    <div className="py-16">
      <Card>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-[450px] mb-4" />
          <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
        </div>
        <div className="mt-10 overflow-x-auto">
          <Table>
            <TableHead>
              <TableHeadCell>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              </TableHeadCell>
              <TableHeadCell>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              </TableHeadCell>
              <TableHeadCell>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              </TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white">
                <TableCell>
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                </TableCell>
                <TableCell>
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                </TableCell>
                <TableCell>
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                </TableCell>
                <TableCell>
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
