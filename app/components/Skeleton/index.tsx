"use client";

import { Table } from "flowbite-react";

export const TableSkeleton = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-200 rounded-full w-[450px] animate-pulse" />
      </div>
      <div className="mt-5 rounded-md border border-gray-100">
        <Table>
          <Table.Head>
            <Table.HeadCell className="py-4">
              <div className="h-4 bg-gray-200 rounded-full w-48 animate-pulse" />
            </Table.HeadCell>
            <Table.HeadCell className="py-4">
              <div className="h-4 bg-gray-200 rounded-full w-48 animate-pulse" />
            </Table.HeadCell>
            <Table.HeadCell className="py-4">
              <div className="h-4 bg-gray-200 rounded-full w-48 animate-pulse" />
            </Table.HeadCell>
            <Table.HeadCell className="py-4"></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white">
              <Table.Cell>
                <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
              </Table.Cell>
              <Table.Cell>
                <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
              </Table.Cell>
              <Table.Cell>
                <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
              </Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell>
                <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
              </Table.Cell>
              <Table.Cell>
                <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
              </Table.Cell>
              <Table.Cell>
                <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
              </Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <div className="mt-5">
        <div className="h-8 bg-gray-200 rounded-full w-[100px]  animate-pulse" />
      </div>
    </>
  );
};

export const SkeletonWithUserImage = () => (
  <div>
    <div className="h-10 bg-gray-300 rounded-full w-32 animate-pulse" />
    <div className="mt-5">
      <div className="bg-gray-300 rounded-md">
        <div className="p-8">
          <div className="flex gap-x-5">
            <div className="flex items-center justify-center w-52 h-64 bg-gray-300 border-2 border-gray-200 rounded-md  animate-pulse">
              <svg
                className="w-20 h-20 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col gap-y-4">
              <div className="h-10 bg-gray-200 rounded-full w-full animate-pulse" />
              <div className="h-10 bg-gray-200 rounded-full w-full animate-pulse" />
              <div className="h-10 bg-gray-200 rounded-full w-full animate-pulse" />
              <div className="h-10 bg-gray-200 rounded-full w-full animate-pulse" />
            </div>
            <div className="flex gap-x-4">
              <div className="h-10 bg-gray-200 rounded-full w-24 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded-full w-32 animate-pulse" />
            </div>
          </div>
          <div className="mt-10">
            <Table className="border-2 border-gray-200">
              <Table.Head className="border-b border-gray-200">
                <Table.HeadCell className="bg-gray-300 py-4">
                  <div className="h-5 bg-gray-200 rounded-full w-48 animate-pulse" />
                </Table.HeadCell>
                <Table.HeadCell className="bg-gray-300 py-4">
                  <div className="h-5 bg-gray-200 rounded-full w-48 animate-pulse" />
                </Table.HeadCell>
                <Table.HeadCell className="bg-gray-300 py-4">
                  <div className="h-5 bg-gray-200 rounded-full w-48 animate-pulse" />
                </Table.HeadCell>
                <Table.HeadCell className="bg-gray-300 py-4"></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white">
                  <Table.Cell className="bg-gray-300">
                    <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
                  </Table.Cell>
                  <Table.Cell className="bg-gray-300">
                    <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
                  </Table.Cell>
                  <Table.Cell className="bg-gray-300">
                    <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
                  </Table.Cell>
                  <Table.Cell className="bg-gray-300">
                    <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="bg-gray-300">
                    <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
                  </Table.Cell>
                  <Table.Cell className="bg-gray-300">
                    <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
                  </Table.Cell>
                  <Table.Cell className="bg-gray-300">
                    <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
                  </Table.Cell>
                  <Table.Cell className="bg-gray-300">
                    <div className="h-3 bg-gray-200 rounded-full w-48 animate-pulse" />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <div className="mt-10">
              <div className="h-8 bg-gray-200 rounded-full w-[100px] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
