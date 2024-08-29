"use client";

import moment from "moment";
import { ChangeEvent, LegacyRef, useState, useRef } from "react";
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

import { addUser } from "@/app/actions/user/add-user";
import { UserDetailType } from "@/app/types";

import { ToastStateType } from "./user-list-table";
import { schema } from "./schema";
import { useUserClientProviderContext } from "@/app/components/Context/UserClientContext";
import { useRetriggerContextProvider } from "@/app/components/Context/RetriggerProvider";

type AddUserProps = {
  close: () => void;
  setToast: (state: ToastStateType) => void;
};

export const AddUser = (props: AddUserProps) => {
  const { close, setToast } = props;
  const inputRef = useRef<HTMLInputElement>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useSupabaseSessionContext();
  const { selectedClient } = useUserClientProviderContext();
  const { refreshUserListFunc } = useRetriggerContextProvider();

  const methods = useForm({
    defaultValues: {
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
    formState: { errors },
  } = methods;

  const handleSubmit = async () => {
    const isFieldsValid = await trigger();

    if (!isFieldsValid) return;
    setIsSubmitting(true);
    try {
      const response: { isError: boolean; message: string } = await addUser({
        ...(getValues() as UserDetailType),
        staff_id: user?.id,
        client_id: selectedClient,
        birth_date: "2024-08-13",
      });

      if (response.isError) {
        setToast({
          show: true,
          message: <div>{response?.message}</div>,
          isError: true,
        });
        setIsSubmitting(false);
        return;
      }

      refreshUserListFunc();
      setIsSubmitting(false);
      setToast({ show: true, message: <div>User is added successfully.</div> });
      close();
    } catch (error: any) {
      setIsSubmitting(false);
      setToast({
        show: true,
        message: <div>Field to add user.</div>,
        isError: true,
      });
    }
  };
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
                  render={({ field }) => (
                    <div>
                      <Label className="text-xs">First Name</Label>
                      <TextInput
                        placeholder="First Name"
                        color="primary"
                        {...field}
                      />
                      {(errors as FieldValues)?.first_name?.message && (
                        <small className="text-red-500 mb-1">
                          {(errors as FieldValues)?.first_name?.message}
                        </small>
                      )}
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="middle_name"
                  render={({ field }) => (
                    <div>
                      <Label className="text-xs">Middle Name</Label>
                      <TextInput
                        placeholder="Middle Name"
                        color="primary"
                        {...field}
                      />
                      {(errors as FieldValues)?.middle_name?.message && (
                        <small className="text-red-500 mb-1">
                          {(errors as FieldValues)?.middle_name?.message}
                        </small>
                      )}
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="last_name"
                  render={({ field }) => (
                    <div>
                      <Label className="text-xs">Last Name</Label>
                      <TextInput
                        placeholder="Last Name"
                        color="primary"
                        {...field}
                      />
                      {(errors as FieldValues)?.last_name?.message && (
                        <small className="text-red-500 mb-1">
                          {(errors as FieldValues)?.last_name?.message}
                        </small>
                      )}
                    </div>
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
                                fill-rule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"
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
              name="preferred_name"
              render={({ field }) => (
                <div>
                  <Label className="text-xs">Preferred Name</Label>
                  <TextInput
                    placeholder="Preferred Name"
                    color="primary"
                    {...field}
                  />
                  {(errors as FieldValues)?.preferred_name?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors as FieldValues)?.preferred_name?.message}
                    </small>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="birth_date"
              render={({ field: { value, onChange } }) => (
                <div>
                  <Label className="text-xs">Date of Birth</Label>
                  <Datepicker
                    placeholder="Date of Birth"
                    color="primary"
                    onSelectedDateChanged={(date) =>
                      onChange(moment(date).format("YYYY-MM-DD"))
                    }
                    maxDate={moment().toDate()}
                    showTodayButton={false}
                    showClearButton={false}
                    value={value ? moment(value).format("MMMM DD, YYYY") : ""}
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <div>
                  <Label className="text-xs">Email</Label>
                  <TextInput
                    placeholder="Email Address"
                    color="primary"
                    {...field}
                  />
                  {(errors as FieldValues)?.email?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors as FieldValues)?.email?.message}
                    </small>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="primary_phone"
              render={({ field }) => (
                <div>
                  <Label className="text-xs">Phone Number</Label>
                  <TextInput
                    placeholder="Phone Number"
                    color="primary"
                    {...field}
                  />
                  {(errors as FieldValues)?.primary_phone?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors as FieldValues)?.primary_phone?.message}
                    </small>
                  )}
                </div>
              )}
            />
            <div className="flex flex-row gap-2">
              <Controller
                control={control}
                name="addr_line_1"
                render={({ field }) => (
                  <div className="flex-1">
                    <Label className="text-xs">Address Line 1</Label>
                    <TextInput
                      placeholder="Address Line 1"
                      color="primary"
                      {...field}
                    />
                    {(errors as FieldValues)?.addr_line_1?.message && (
                      <small className="text-red-500 mb-1">
                        {(errors as FieldValues)?.addr_line_1?.message}
                      </small>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="addr_line_2"
                render={({ field }) => (
                  <div className="flex-1">
                    <Label className="text-xs">Address Line 2</Label>
                    <TextInput
                      placeholder="Address Line 2"
                      color="primary"
                      {...field}
                    />
                    {(errors as FieldValues)?.addr_line_2?.message && (
                      <small className="text-red-500 mb-1">
                        {(errors as FieldValues)?.addr_line_2?.message}
                      </small>
                    )}
                  </div>
                )}
              />
            </div>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <div>
                  <Label className="text-xs">City</Label>
                  <TextInput placeholder="City" color="primary" {...field} />
                  {(errors as FieldValues)?.city?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors as FieldValues)?.city?.message}
                    </small>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <div>
                  <Label className="text-xs">Country</Label>
                  <TextInput placeholder="Country" color="primary" {...field} />
                  {(errors as FieldValues)?.country?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors as FieldValues)?.country?.message}
                    </small>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="zip_code"
              render={({ field }) => (
                <div>
                  <Label className="text-xs">Zip Code</Label>
                  <TextInput
                    onKeyPress={(event) => {
                      event.persist();

                      if (!/^[0-9]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    placeholder="Zip Code"
                    color="primary"
                    {...field}
                  />
                  {(errors as FieldValues)?.zip_code?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors as FieldValues)?.zip_code?.message}
                    </small>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="state_province_region"
              render={({ field }) => (
                <div>
                  <Label className="text-xs">State/Province/Region</Label>
                  <TextInput
                    placeholder="State/Province/Region"
                    color="primary"
                    {...field}
                  />
                  {(errors as FieldValues)?.state_province_region?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors as FieldValues)?.state_province_region?.message}
                    </small>
                  )}
                </div>
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
