import * as Yup from "yup";

import { ModalContentType } from "../types";

export const schema = (
  contentType: ModalContentType,
  isPrimaryContact: boolean
) => {
  return Yup.object().shape({
    info: Yup.object().shape({
      user: Yup.object(),
      client: Yup.object(),
    }),
    dropdowns: Yup.object().shape({
      clientList: Yup.array(),
      roleList: Yup.array(),
    }),
    ...(contentType === ModalContentType.ADD && {
      add_client: Yup.object().shape({
        client_id: Yup.string().required().nullable(),
        role_ids: Yup.array(Yup.string())
          .min(1, "Please select a role to the user")
          .required("Please select a role to the user"),
      }),
    }),
    ...(contentType === ModalContentType.EDIT && {
      edit_client: Yup.object().shape({
        role_ids: Yup.array(Yup.string()).min(1),
      }),
    }),
    ...(contentType === ModalContentType.EDIT_USER && {
      edit_user: Yup.object().shape({
        photo_url: Yup.mixed(),
        first_name: Yup.string(),
        last_name: Yup.string(),
        middle_name: Yup.string(),
        preferred_name: Yup.string(),
        preferred_contact: Yup.string(),
        birth_date: Yup.string(),
        email: Yup.string().email(),
        primary_phone: isPrimaryContact
          ? Yup.string().required("This field is required")
          : Yup.string().when("preferred_contact", {
              is: (value: string) => value === "sms",
              then: () => Yup.string().required("This field is required"),
              otherwise: () => Yup.string(),
            }),
        addr_line_1: isPrimaryContact
          ? Yup.string().required("This field is required")
          : Yup.string(),
        addr_line_2: isPrimaryContact
          ? Yup.string().required("This field is required")
          : Yup.string(),
        city: isPrimaryContact
          ? Yup.string().required("This field is required")
          : Yup.string(),
        zip_code: isPrimaryContact
          ? Yup.string().required("This field is required")
          : Yup.string(),
        country: isPrimaryContact
          ? Yup.string().required("This field is required")
          : Yup.string(),
        state_province_region: isPrimaryContact
          ? Yup.string().required("This field is required")
          : Yup.string(),
      }),
    }),
  });
};
