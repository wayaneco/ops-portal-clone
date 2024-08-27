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
        base: "block w-full border border-primary-500 disabled:cursor-not-allowed disabled:border-none",
        colors: {
          primary:
            "border-primary-500 bg-gray-50 text-gray-900 focus:border-primary-600 focus:ring-primary-600",
        },
      },
    },
  },
  checkbox: {
    root: {
      base: "h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed",
      color: {
        primary:
          "text-primary-500 focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-primary-600 disabled:text-red-500",
      },
    },
  },
  select: {
    field: {
      select: {
        colors: {
          primary:
            "outline-primary-500 border-primary-500 focus:ring-primary-500 focus:border-primary-500",
        },
      },
    },
  },
  datepicker: {
    views: {
      days: {
        items: {
          item: {
            selected: "bg-primary-500 text-white hover:bg-primary-600",
          },
        },
      },
    },
  },
  sidebar: {
    root: {
      inner:
        "h-full overflow-y-auto overflow-x-hidden bg-gray-50 px-3 py-4 dark:bg-gray-800",
    },
  },
  spinner: {
    color: {
      primary: "fill-primary-500",
    },
  },
  radio: {
    root: {
      base: "h-4 w-4 border border-primary-500 text-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-primary-600 dark:bg-primary-700 dark:focus:bg-primary-600 dark:focus:ring-primary-600",
    },
  },
  toast: {
    root: {
      base: "flex w-full max-w-xs items-center rounded-md bg-primary-500 p-4 text-white shadow",
      closed: "opacity-0 ease-out",
    },
    toggle: {
      base: "-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-primary-500 p-1.5 text-white",
      icon: "h-5 w-5 shrink-0",
    },
  },
  badge: {
    root: {
      color: {
        primary: "bg-primary-500 text-white",
        gray: "bg-gray-200 text-gray-600",
        "in progress": "bg-yellow-400 text-gray-200",
        completed: "bg-primary-500 text-white",
        draft: "bg-gray-200 text-gray-600",
      },
    },
  },
  modal: {
    header: {
      base: "flex items-start justify-between rounded-t border-b p-5 bg-primary-500 dark:border-gray-600",
      popup: "border-b-0 p-2",
      title: "text-xl font-medium text-white",
      close: {
        base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-white",
        icon: "h-5 w-5",
      },
    },
  },
  footer: {},
  navbar: {
    link: {
      base: "block py-2 pl-3 pr-4 p-0",
      active: {
        on: "text-primary-500",
        off: "text-gray-600 hover:text-primary-500",
      },
    },
  },
};

export default FlowbiteTheme;
