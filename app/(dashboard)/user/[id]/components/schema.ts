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
  });
};
