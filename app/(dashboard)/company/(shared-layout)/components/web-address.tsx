import { Label, TextInput, Button } from "flowbite-react";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const WebAddress = () => {
  const inputRef = useRef();
  const { control, watch } = useFormContext();

  return (
    <div>
      <Label className="mb-2 block">Host Name</Label>
      <div className="flex gap-x-4">
        <Controller
          control={control}
          name="web_address"
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <TextInput
              ref={inputRef as any}
              color="primary"
              placeholder="domain.everesteffect.com"
              className="w-[450px] placeholder-shown:italic "
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Button color="primary">Provision</Button>
      </div>
      <div className="text-sm mt-2 ml-2 ">
        Required to provision the Everest Portal subdomain for this client
      </div>
    </div>
  );
};
