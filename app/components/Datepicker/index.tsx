"use client";

import moment from "moment";
import { Label, Datepicker } from "flowbite-react";

type CustomerDatepickerProps = {
  required?: boolean;
  label: string;
  value: any;
  placeholder?: string;
  onChange: (newValue: string) => void;
  error?: string;
};

export const CustomerDatepicker = (props: CustomerDatepickerProps) => {
  const { value, onChange, label, required, placeholder, error } = props;
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
      <Datepicker
        placeholder={placeholder}
        color={error ? "error" : "primary"}
        onSelectedDateChanged={(date) =>
          onChange(moment(date).format("YYYY-MM-DD"))
        }
        maxDate={moment().toDate()}
        showTodayButton={false}
        showClearButton={false}
        value={value ? moment(value).format("MMMM DD, YYYY") : ""}
      />
    </div>
  );
};
