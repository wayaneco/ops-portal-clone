import * as Yup from "yup";

import { ModalContentType } from "../types";

export const schema = (contentType: ModalContentType) => {
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
        birth_date: Yup.string(),
        email: Yup.string().email().required("This field is required."),
        primary_phone: Yup.string().required("This field is required."),
        addr_line_1: Yup.string(),
        addr_line_2: Yup.string(),
        city: Yup.string(),
        zip_code: Yup.string(),
        country: Yup.string(),
        state_province_region: Yup.string(),
      }),
    }),
  });
};
