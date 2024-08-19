"use client";

const Loading = () => {
  return (
    <div className="absolute z-10 inset-0 mt-[100px] overflow-hidden">
      <div className="flex h-full w-full">
        <div className="h-full w-64 bg-gray-300">
          <div className="flex items-center justify-center w-64 h-24 bg-gray-300 rounded">
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
          <div className="mt-4">
            <div className="flex flex-col gap-y-5">
              <div className="px-4">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse" />
              </div>
              <div className="px-4">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 animate-pulse" />
              </div>
              <div className="px-4">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse" />
              </div>

              <div className="px-4">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse" />
              </div>
              <div className="px-4">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-[90%] animate-pulse" />
              </div>
              <div className="px-4">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse" />
              </div>
              <div className="px-4">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 animate-pulse" />
              </div>
              <div className="px-4">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse" />
              </div>

              <div className="px-4">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse" />
              </div>
              <div className="px-4">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-[90%] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full flex flex-col">
          <div className="h-24 bg-gray-300">
            <div className="flex items-center h-full px-8 gap-x-5">
              <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-[450px] animate-pulse" />
              <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-[100px] animate-pulse" />
            </div>
          </div>
          <div className="m-8">
            <div className="bg-gray-300 rounded-md p-8">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4 animate-pulse" />
              <div className="flex gap-x-5">
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-72 mb-4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4 animate-pulse" />
              </div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4/5 mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4 animate-pulse" />
              <div className="flex gap-x-5">
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-72 mb-4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4 animate-pulse" />
              </div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4/5 mb-4 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
