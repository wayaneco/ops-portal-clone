"use client";

export const Content = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-32 mx-auto text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>

      <div className="text-center text-2xl font-medium text-gray-700">
        Login verification failed
      </div>
      <div className="text-gray-500 mb-2">
        You will can send another request in your device.
      </div>
      <div className="text-sm text-gray-500 mb-8">
        You can now close this tab manually.
      </div>
    </>
  );
};
