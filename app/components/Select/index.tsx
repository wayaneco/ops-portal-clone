"use client";

import { Label } from "flowbite-react";
import Select from "react-tailwindcss-select";

import { Options } from "react-tailwindcss-select/dist/components/type";

type CustomSelectProps = {
  error?: string;
  label: string;
  required?: boolean;
  options: Options;
  onChange: (newValue: any) => void;
  value: any;
};

export const CustomerSelect = (props: CustomSelectProps) => {
  const { error, label, value, options, required, onChange } = props;

  return (
    <div>
      <Label
        className={`text-xs ${
          required && 'after:content-["*"] after:ml-px after:text-red-500'
        }`}
        color={error ? "error" : "primary"}
      >
        {label}
      </Label>
      <Select
        classNames={{
          menuButton: () =>
            `flex py-[2px] text-sm text-gray-900 border  rounded-lg shadow-sm bg-gray-50 focus:ring-1  ${
              error
                ? "border-red-500 text-red-500 focus:ring-red-600"
                : "border-primary-500 focus:ring-primary-600"
            }`,
          listItem: ({ isSelected }: any) =>
            `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded hover:bg-primary-500 hover:text-white ${
              isSelected ? "bg-primary-500 text-white" : "text-gray-600"
            } `,
        }}
        placeholder="Select Role"
        primaryColor="primary"
        options={options}
        value={value as any}
        onChange={onChange}
      />
      {error && <small className="text-red-500 mb-1">{error}</small>}
    </div>
  );
};
