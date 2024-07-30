import { type CustomFlowbiteTheme } from "flowbite-react";

const FlowbiteTheme: CustomFlowbiteTheme = {
  button: {
    base: "group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none",
    fullSized: "w-full",
    disabled: "cursor-not-allowed opacity-50",
    isProcessing: "cursor-wait",
    spinnerSlot: "absolute top-0 flex h-full items-center",
    color: {
      primary:
        "text-white bg-blue-500 hover:bg-blue-600 focus:outline-blue-400",
    },
  },
  textInput: {
    base: "relative w-full",
    field: {
      input: {
        base: "block w-full border border-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
        colors: {
          primary:
            "border-blue-500 bg-gray-50 text-gray-900 placeholder-gray-900 focus:border-blue-600 focus:ring-blue-600",
        },
      },
    },
  },
  checkbox: {
    root: {
      base: "h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700",
    },
  },
  sidebar: {
    root: {
      inner:
        "h-full overflow-y-auto overflow-x-hidden bg-gray-50 px-3 py-4 dark:bg-gray-800",
    },
  },
  modal: {},
  footer: {},
  navbar: {},
};

export default FlowbiteTheme;
