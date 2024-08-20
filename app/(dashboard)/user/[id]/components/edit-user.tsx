import { useState, useRef, ChangeEvent, LegacyRef } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import {
  Modal,
  TextInput,
  Spinner,
  Select,
  Button,
  Label,
} from "flowbite-react";

import { useUserDetailFormContext } from "./user-detail-form";
import { updateUserInfo } from "@/app/actions/user/update-user";
import { convertFileToBase64 } from "@/utils/file/convertFileToBase64";

export const EditUser = () => {
  const inputRef = useRef<HTMLInputElement>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    control,
    watch,
    getValues,
    formState: { errors },
    trigger,
  } = useFormContext();
  const { setToast, closeDialog } = useUserDetailFormContext();

  const { user } = watch("info");
  const watchUserEmail = watch("edit_user.email");

  const handleSubmit = async () => {
    const isFieldsValid = await trigger("edit_user");

    if (!isFieldsValid) return;

    try {
      setIsSubmitting(true);
      const isEmailChanged = watchUserEmail !== user?.email;

      const response: { isError: boolean; message: string } =
        await updateUserInfo({
          ...getValues("edit_user"),
          user_id: user?.user_id,
          isEmailChanged,
        });

      if (response.isError) throw new Error(response?.message);

      setToast(<div>User updated successfully!</div>);
      closeDialog();
    } catch (error: any) {
      setIsSubmitting(false);
      setToast(<div>{error?.message}</div>, true);
    }
  };
  return (
    <>
      <Modal.Header>Update User</Modal.Header>
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
                name="edit_user.first_name"
                render={({ field }) => (
                  <div>
                    <Label className="text-xs">First Name</Label>
                    <TextInput
                      placeholder="First Name"
                      color="primary"
                      {...field}
                    />
                    {(errors?.edit_user as FieldValues)?.first_name
                      ?.message && (
                      <small className="text-red-500 mb-1">
                        {
                          (errors?.edit_user as FieldValues)?.first_name
                            ?.message
                        }
                      </small>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="edit_user.middle_name"
                render={({ field }) => (
                  <div>
                    <Label className="text-xs">Middle Name</Label>
                    <TextInput
                      placeholder="Middle Name"
                      color="primary"
                      {...field}
                    />
                    {(errors?.edit_user as FieldValues)?.middle_name
                      ?.message && (
                      <small className="text-red-500 mb-1">
                        {
                          (errors?.edit_user as FieldValues)?.middle_name
                            ?.message
                        }
                      </small>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="edit_user.last_name"
                render={({ field }) => (
                  <div>
                    <Label className="text-xs">Last Name</Label>
                    <TextInput
                      placeholder="Last Name"
                      color="primary"
                      {...field}
                    />
                    {(errors?.edit_user as FieldValues)?.last_name?.message && (
                      <small className="text-red-500 mb-1">
                        {(errors?.edit_user as FieldValues)?.last_name?.message}
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
                  name="edit_user.photo_url"
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
            name="edit_user.preferred_name"
            render={({ field }) => (
              <div>
                <Label className="text-xs">Preferred Name</Label>
                <TextInput
                  placeholder="Preferred Name"
                  color="primary"
                  {...field}
                />
                {(errors?.edit_user as FieldValues)?.preferred_name
                  ?.message && (
                  <small className="text-red-500 mb-1">
                    {
                      (errors?.edit_user as FieldValues)?.preferred_name
                        ?.message
                    }
                  </small>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="edit_user.email"
            render={({ field }) => (
              <div>
                <Label className="text-xs">Email</Label>
                <TextInput
                  placeholder="Email Address"
                  color="primary"
                  {...field}
                />
                {(errors?.edit_user as FieldValues)?.email?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as FieldValues)?.email?.message}
                  </small>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="edit_user.primary_phone"
            render={({ field }) => (
              <div>
                <Label className="text-xs">Phone Number</Label>
                <TextInput
                  placeholder="Phone Number"
                  color="primary"
                  {...field}
                />
                {(errors?.edit_user as FieldValues)?.primary_phone?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as FieldValues)?.primary_phone?.message}
                  </small>
                )}
              </div>
            )}
          />
          <div className="flex flex-row gap-2">
            <Controller
              control={control}
              name="edit_user.addr_line_1"
              render={({ field }) => (
                <div className="flex-1">
                  <Label className="text-xs">Address Line 1</Label>
                  <TextInput
                    placeholder="Address Line 1"
                    color="primary"
                    {...field}
                  />
                  {(errors?.edit_user as FieldValues)?.addr_line_1?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors?.edit_user as FieldValues)?.addr_line_1?.message}
                    </small>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="edit_user.addr_line_2"
              render={({ field }) => (
                <div className="flex-1">
                  <Label className="text-xs">Address Line 2</Label>
                  <TextInput
                    placeholder="Address Line 2"
                    color="primary"
                    {...field}
                  />
                  {(errors?.edit_user as FieldValues)?.addr_line_2?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors?.edit_user as FieldValues)?.addr_line_2?.message}
                    </small>
                  )}
                </div>
              )}
            />
          </div>
          <Controller
            control={control}
            name="edit_user.city"
            render={({ field }) => (
              <div>
                <Label className="text-xs">City</Label>
                <TextInput placeholder="City" color="primary" {...field} />
                {(errors?.edit_user as FieldValues)?.city?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as FieldValues)?.city?.message}
                  </small>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="edit_user.country"
            render={({ field }) => (
              <div>
                <Label className="text-xs">Country</Label>
                <TextInput placeholder="Country" color="primary" {...field} />
                {(errors?.edit_user as FieldValues)?.country?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as FieldValues)?.country?.message}
                  </small>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="edit_user.zip_code"
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
                {(errors?.edit_user as FieldValues)?.zip_code?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as FieldValues)?.zip_code?.message}
                  </small>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="edit_user.state_province_region"
            render={({ field }) => (
              <div>
                <Label className="text-xs">State/Province/Region</Label>
                <TextInput
                  placeholder="State/Province/Region"
                  color="primary"
                  {...field}
                />
                {(errors?.edit_user as FieldValues)?.state_province_region
                  ?.message && (
                  <small className="text-red-500 mb-1">
                    {
                      (errors?.edit_user as FieldValues)?.state_province_region
                        ?.message
                    }
                  </small>
                )}
              </div>
            )}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          color="primary"
          className="w-[150px] mx-auto"
          onClick={handleSubmit}
        >
          Update User
        </Button>
      </Modal.Footer>
    </>
  );
};
