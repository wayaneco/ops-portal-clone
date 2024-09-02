import { useState, useRef, ChangeEvent, LegacyRef } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import {
  Modal,
  TextInput,
  Spinner,
  Select,
  Button,
  Label,
  Datepicker,
} from "flowbite-react";

import { useUserDetailFormContext } from "./user-detail-form";
import { updateUserInfo } from "@/app/actions/user/update-user";
import moment from "moment";
import { useSupabaseSessionContext } from "@/app/components/Context/SupabaseSessionProvider";
import { CustomTextInput } from "@/app/components/TextInput";
import { CustomerDatepicker } from "@/app/components/Datepicker";

export const EditUser = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    control,
    watch,
    getValues,
    formState: { errors, isDirty },
    trigger,
  } = useFormContext();
  const { setToast, closeDialog } = useUserDetailFormContext();
  const { userInfo } = useSupabaseSessionContext();

  const { user } = watch("info");
  const watchUserEmail = watch("edit_user.email");

  const isSelfService = userInfo?.user_id === user?.user_id;

  const handleSubmit = async () => {
    const isFieldsValid = await trigger("edit_user");

    if (!isFieldsValid) return;

    try {
      setIsSubmitting(true);
      const isEmailChanged = watchUserEmail !== user?.email;

      const response = await updateUserInfo({
        ...getValues("edit_user"),
        user_id: user?.user_id,
        photo_url: user?.photo_url,
        staff_id: userInfo?.user_id,
        isEmailChanged,
      })
        .then(() => {
          setToast(<div>User updated successfully!</div>);
          closeDialog();
        })
        .catch(() => {
          throw response;
        });
    } catch (error: any) {
      setIsSubmitting(false);
      setToast(<div>{error?.message}</div>, true);
    }
  };

  return (
    <>
      <Modal.Header>
        {isSelfService ? "Update Profile" : "Update User"}
      </Modal.Header>
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
            <div className="flex-1">
              <Controller
                control={control}
                name="edit_user.first_name"
                render={({ field, fieldState: { error } }) => (
                  <CustomTextInput
                    error={error?.message}
                    label="First Name"
                    placeholder="First Name"
                    {...field}
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="edit_user.middle_name"
              render={({ field, fieldState: { error } }) => (
                <CustomTextInput
                  error={error?.message}
                  label="Middle Name"
                  placeholder="Middle Name"
                  {...field}
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="edit_user.last_name"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                error={error?.message}
                label="Last Name"
                placeholder="Last Name"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="edit_user.preferred_name"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                error={error?.message}
                label="Preferred Name"
                placeholder="Preferred Name"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="edit_user.birth_date"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomerDatepicker
                error={error?.message}
                label="Birth Date"
                placeholder="Birth Date"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="edit_user.email"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                disabled
                error={error?.message}
                label="Email"
                placeholder="Email"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="edit_user.primary_phone"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                error={error?.message}
                label="Phone Number"
                placeholder="Phone Number"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="edit_user.addr_line_1"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                error={error?.message}
                label="Address Line 1"
                placeholder="Address Line 1"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="edit_user.addr_line_2"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                error={error?.message}
                label="Address Line 2"
                placeholder="Address Line 2"
                {...field}
              />
            )}
          />
          <div className="flex gap-x-2">
            <Controller
              control={control}
              name="edit_user.city"
              render={({ field, fieldState: { error } }) => (
                <CustomTextInput
                  error={error?.message}
                  label="City"
                  placeholder="City"
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="edit_user.state_province_region"
              render={({ field, fieldState: { error } }) => (
                <CustomTextInput
                  error={error?.message}
                  label="State/Province/Region"
                  placeholder="State/Province/Region"
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="edit_user.zip_code"
              render={({ field, fieldState: { error } }) => (
                <CustomTextInput
                  error={error?.message}
                  label="Zip Code"
                  placeholder="Zip Code"
                  {...field}
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="edit_user.country"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                error={error?.message}
                label="Country"
                placeholder="Country"
                {...field}
              />
            )}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          color="primary"
          className="w-[150px] mx-auto"
          disabled={!isDirty}
          onClick={handleSubmit}
        >
          Update
        </Button>
      </Modal.Footer>
    </>
  );
};
