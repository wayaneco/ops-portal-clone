import * as Yup from "yup";

import { REGEX_WEB_ADDRESS_FIELD } from "@/app/constant";

export const schema = Yup.object().shape({
  logo: Yup.mixed().nullable(),
  name: Yup.string().required(),
  longitude: Yup.string(),
  latitude: Yup.string(),
  is_enabled: Yup.boolean(),
  time_zone: Yup.string(),
  web_address: Yup.string()
    .required("This field is required.")
    .matches(REGEX_WEB_ADDRESS_FIELD, "Invalid input value"),
  service_provided: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("This field is required."),
      type: Yup.string(),
    })
  ),
  tags: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("This field is required."),
    })
  ),
  provider_types: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("This field is required."),
    })
  ),
  provisioning_status: Yup.string(),
  isUpdate: Yup.boolean(),
  isWebAddressValid: Yup.boolean(),
  isDirty: Yup.boolean(),
});
