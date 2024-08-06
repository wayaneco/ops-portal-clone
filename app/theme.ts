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
        "text-white bg-primary-500 hover:bg-primary-600 focus:outline-primary-400",
    },
  },
  textInput: {
    base: "relative w-full",
    field: {
      input: {
        base: "block w-full border border-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
        colors: {
          primary:
            "border-primary-500 bg-gray-50 text-gray-900 placeholder-gray-900 focus:border-primary-600 focus:ring-primary-600",
        },
      },
    },
  },
  checkbox: {
    root: {
      base: "h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700",

      color: {
        primary:
          "text-primary-500 focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-primary-600",
      },
    },
  },
  sidebar: {
    root: {
      inner:
        "h-full overflow-y-auto overflow-x-hidden bg-gray-50 px-3 py-4 dark:bg-gray-800",
    },
  },
  badge: {
    root: {
      color: {
        primary: "bg-primary-500 text-white",
      },
    },
  },
  modal: {},
  footer: {},
  navbar: {},
};

export default FlowbiteTheme;
