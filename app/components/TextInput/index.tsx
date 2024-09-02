"use client";

import { Field, FieldValues } from "react-hook-form";

import { Label, TextInput } from "flowbite-react";

type TextFieldProps = React.HTMLAttributes<HTMLInputElement> & {
  error?: string;
  label: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  value?: any;
  placeholder?: string;
};

export const CustomTextInput = (props: TextFieldProps) => {
  const { label, placeholder, error, required, ...otherInputProps } = props;

  return (
    <div className="flex-1">
      <Label
        className={`text-xs ${
          required && 'after:content-["*"] after:ml-px after:text-red-500'
        }`}
        color={error ? "error" : "default"}
      >
        {label}
      </Label>
      <TextInput
        placeholder={placeholder}
        color={error ? "error" : "primary"}
        {...otherInputProps}
      />
      {error && <small className="text-red-500 mb-1">{error}</small>}
    </div>
  );
};
