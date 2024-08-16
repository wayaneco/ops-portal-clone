import * as Yup from "yup";

export const schema = Yup.object().shape({
  logo: Yup.mixed().nullable(),
  name: Yup.string().required(),
  longitude: Yup.string(),
  latitude: Yup.string(),
  is_enabled: Yup.boolean(),
  web_address: Yup.string().required(),
  service_provided: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("This field is required."),
      type: Yup.string(),
    })
  ),
  tags: Yup.array().of(
    Yup.object().shape({
      label: Yup.string(),
    })
  ),
  provider_types: Yup.array().of(
    Yup.object().shape({
      label: Yup.string(),
    })
  ),
  provisioning_status: Yup.string(),
});
