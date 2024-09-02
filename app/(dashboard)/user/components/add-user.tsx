"use client";

import { ChangeEvent, LegacyRef, useState, useRef, useEffect } from "react";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import {
  Modal,
  TextInput,
  Spinner,
  Button,
  Label,
  Datepicker,
} from "flowbite-react";

import { yupResolver } from "@hookform/resolvers/yup";

import { useSupabaseSessionContext } from "@/app/components/Context/SupabaseSessionProvider";

import { convertFileToBase64 } from "@/utils/file/convertFileToBase64";
import { createClient } from "@/utils/supabase/client";
import { addUser } from "@/app/actions/user/add-user";
import { UserDetailType } from "@/app/types";

import { useToastContext } from "@/app/components/Context/ToastProvider";
import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { ROLE_NETWORK_ADMIN, ROLE_PRIMARY_CONTACT } from "@/app/constant";

import { schema } from "./schema";
import { CustomTextInput } from "@/app/components/TextInput";
import { CustomerSelect } from "@/app/components/Select";
import { CustomerDatepicker } from "@/app/components/Datepicker";

type AddUserProps = {
  close: () => void;
};

export const AddUser = (props: AddUserProps) => {
  const { close } = props;
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [roles, setRoles] = useState<Array<{ value: string; label: string }>>(
    []
  );

  const { showToast } = useToastContext();
  const { user } = useSupabaseSessionContext();
  const { selectedClient } = useUserClientProviderContext();
  const { hasAdminRole } = useUserClientProviderContext();

  const methods = useForm({
    defaultValues: {
      role: "",
      photo_url: null,
      first_name: "",
      last_name: "",
      middle_name: "",
      birth_date: "",
      preferred_name: "",
      email: "",
      primary_phone: "",
      addr_line_1: "",
      addr_line_2: "",
      zip_code: "",
      city: "",
      country: "",
      state_province_region: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    control,
    trigger,
    getValues,
    setFocus,
    formState: { errors },
  } = methods;

  const handleSubmit = async () => {
    const isFieldsValid = await trigger();

    if (!isFieldsValid) return;
    setIsSubmitting(true);
    try {
      const { role, ...payload } = getValues() as UserDetailType & {
        role: {
          value: string;
          label: string;
        };
      };

      const response = await addUser({
        ...payload,
        role_id: role?.value,
        isNetworkAdmin: role?.label === ROLE_NETWORK_ADMIN,
        staff_id: user?.id,
        client_id: selectedClient,
      });

      if (!response.ok) throw response?.message;

      setIsSubmitting(false);
      showToast({ message: response?.message });
      close();
    } catch (error: any) {
      setIsSubmitting(false);
      showToast({
        message: error,
        error: true,
      });
    }
  };

  useEffect(() => {
    const getRoleList = async () => {
      setIsSubmitting(true);
      supabase
        .from("roles")
        .select()
        .then((result) => {
          const filteredRoles = result?.data?.filter((role) => {
            if (!hasAdminRole) {
              return ![ROLE_NETWORK_ADMIN, ROLE_PRIMARY_CONTACT]?.includes(
                role?.name
              );
            }

            return ![ROLE_PRIMARY_CONTACT]?.includes(role?.name);
          });

          const formattedRoles = filteredRoles?.map((role) => ({
            value: role?.id,
            label: role?.name,
          }));

          setRoles(formattedRoles as Array<{ label: string; value: string }>);
          setIsSubmitting(false);
        });
    };
    getRoleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <Modal.Header>Add User</Modal.Header>
        <Modal.Body>
          {isSubmitting && (
            <div className="absolute inset-0 z-50">
              <div className="flex justify-center items-center h-full bg-gray-200/40 cursor-not-allowed">
                <Spinner color="primary" />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-y-2">
            <div className="flex gap-2">
              <div className="flex flex-col gap-2 flex-1">
                <Controller
                  control={control}
                  name="first_name"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <CustomTextInput
                        required
                        label="First Name"
                        placeholder="First Name"
                        error={error?.message}
                        {...field}
                      />
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name="middle_name"
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextInput
                      label="Middle Name"
                      placeholder="Middle Name"
                      error={error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="last_name"
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextInput
                      required
                      label="Last Name"
                      placeholder="Last Name"
                      error={error?.message}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="w-64 h-56 ">
                <div className="w-full h-full pl-5 pt-5">
                  <Controller
                    control={control}
                    name="photo_url"
                    render={({ field: { value, onChange } }) => (
                      <>
                        <div className="relative border h-full w-full overflow-hidden rounded-md bg-gray-100 group">
                          {!value ? (
                            <svg
                              className="absolute inset-0 w-full h-full  text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={value as string}
                              alt="Tonis Kitchen"
                              className="w-full h-full object-cover"
                            />
                          )}
                          <Button
                            type="button"
                            color="primary"
                            className="absolute py-2 px-3 w-4/5 bottom-2 ml-[50%] -translate-x-2/4 opacity-0 -z-10 transition-all group-hover:opacity-100 group-hover:z-10 [&>span]:p-0"
                            onClick={() => inputRef.current?.click()}
                          >
                            Change photo
                          </Button>
                        </div>
                        <input
                          className="hidden"
                          type="file"
                          ref={inputRef as LegacyRef<HTMLInputElement>}
                          accept="image/**"
                          onChange={async (
                            event: ChangeEvent<HTMLInputElement>
                          ) => {
                            if (!event?.currentTarget?.files![0]) return;

                            const base64 = await convertFileToBase64(
                              event.currentTarget?.files[0]
                            );

                            onChange(base64);
                          }}
                        />
                        {(errors as FieldValues)?.photo_url?.message && (
                          <small className="text-red-500 mb-1">
                            {(errors as FieldValues)?.photo_url?.message}
                          </small>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
            <Controller
              control={control}
              name="role"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomerSelect
                  label="Role"
                  value={value}
                  onChange={onChange}
                  options={roles}
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="preferred_name"
              render={({ field, fieldState: { error } }) => (
                <CustomTextInput
                  label="Preferred Name"
                  placeholder="Preferred Name"
                  error={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="birth_date"
              render={({ field: { value, onChange } }) => (
                <CustomerDatepicker
                  label="Birth Date"
                  placeholder="Birth Date"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <CustomTextInput
                  required
                  label="Email"
                  placeholder="Email"
                  error={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="primary_phone"
              render={({ field, fieldState: { error } }) => (
                <CustomTextInput
                  label="Phone Number"
                  placeholder="Phone Number"
                  error={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="addr_line_1"
              render={({ field, fieldState: { error } }) => (
                <CustomTextInput
                  label="Address Line 1"
                  placeholder="Address Line 1"
                  error={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="addr_line_2"
              render={({ field, fieldState: { error } }) => (
                <CustomTextInput
                  label="Address Line 2"
                  placeholder="Address Line 2"
                  error={error?.message}
                  {...field}
                />
              )}
            />
            <div className="flex gap-x-2">
              <Controller
                control={control}
                name="city"
                render={({ field, fieldState: { error } }) => (
                  <CustomTextInput
                    label="City"
                    placeholder="City"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="state_province_region"
                render={({ field, fieldState: { error } }) => (
                  <CustomTextInput
                    label="State/Province/Region"
                    placeholder="State/Province/Region"
                    error={error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="zip_code"
                render={({ field, fieldState: { error } }) => (
                  <CustomTextInput
                    label="Zip Code"
                    placeholder="Zip Code"
                    onKeyPress={(event) => {
                      event.persist();

                      if (!/^[0-9]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    error={error?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="country"
              render={({ field, fieldState: { error } }) => (
                <CustomTextInput
                  label="Country"
                  placeholder="Country"
                  error={error?.message}
                  {...field}
                />
              )}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="primary"
            className="w-[150px] mx-auto"
            onClick={handleSubmit}
          >
            Add User
          </Button>
        </Modal.Footer>
      </FormProvider>
    </>
  );
};
