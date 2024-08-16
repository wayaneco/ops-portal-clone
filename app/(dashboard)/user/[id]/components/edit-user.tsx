import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
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

export const EditUser = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    control,
    getValues,
    formState: { errors },
    trigger,
  } = useFormContext();
  const { setToast, closeDialog } = useUserDetailFormContext();

  const handleSubmit = async () => {
    const isFieldsValid = await trigger("edit_user");

    if (!isFieldsValid) return;

    try {
      setIsSubmitting(true);

      const response = await updateUserInfo({ ...getValues("edit_user") });
      console.log(response);
      setToast(<div>User information update successfully!</div>);
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
          <div className="flex flex-row gap-2">
            <Controller
              control={control}
              name="edit_user.first_name"
              render={({ field }) => (
                <div className="flex-1">
                  <Label className="text-xs">First Name</Label>
                  <TextInput
                    placeholder="First Name"
                    color="primary"
                    {...field}
                  />
                  {(errors?.edit_user as any)?.first_name?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors?.edit_user as any)?.first_name?.message}
                    </small>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="edit_user.middle_name"
              render={({ field }) => (
                <div className="w-1/3">
                  <Label className="text-xs">Middle Name</Label>
                  <TextInput
                    placeholder="Middle Name"
                    color="primary"
                    {...field}
                  />
                  {(errors?.edit_user as any)?.middle_name?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors?.edit_user as any)?.middle_name?.message}
                    </small>
                  )}
                </div>
              )}
            />
          </div>
          <Controller
            control={control}
            name="edit_user.last_name"
            render={({ field }) => (
              <div>
                <Label className="text-xs">Last Name</Label>
                <TextInput placeholder="Last Name" color="primary" {...field} />
                {(errors?.edit_user as any)?.last_name?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as any)?.last_name?.message}
                  </small>
                )}
              </div>
            )}
          />
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
                {(errors?.edit_user as any)?.preferred_name?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as any)?.preferred_name?.message}
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
                {(errors?.edit_user as any)?.email?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as any)?.email?.message}
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
                {(errors?.edit_user as any)?.primary_phone?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as any)?.primary_phone?.message}
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
                  {(errors?.edit_user as any)?.addr_line_1?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors?.edit_user as any)?.addr_line_1?.message}
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
                  {(errors?.edit_user as any)?.addr_line_2?.message && (
                    <small className="text-red-500 mb-1">
                      {(errors?.edit_user as any)?.addr_line_2?.message}
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
                {(errors?.edit_user as any)?.city?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as any)?.city?.message}
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
                {(errors?.edit_user as any)?.zip_code?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as any)?.zip_code?.message}
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
                {(errors?.edit_user as any)?.state_province_region?.message && (
                  <small className="text-red-500 mb-1">
                    {(errors?.edit_user as any)?.state_province_region?.message}
                  </small>
                )}
              </div>
            )}
          />
        </div>
        {/* {(errors?.add_client as any)?.client_id?.message && (
          <small className="text-red-500 mb-1">
            {(errors?.add_client as any)?.client_id?.message}
          </small>
        )} */}
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
