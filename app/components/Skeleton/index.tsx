import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";

export const TableSkeleton = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-[450px] mb-4" />
      </div>
      <div className="mt-5">
        <Table>
          <TableHead>
            <TableHeadCell>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
            </TableHeadCell>
            <TableHeadCell>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
            </TableHeadCell>
            <TableHeadCell>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
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
            </TableRow>
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
            </TableRow>
          </TableBody>
        </Table>

        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-[100px] mb-4" />
      </div>
    </>
  );
};

export const SkeletonWithUserImage = () => null;
