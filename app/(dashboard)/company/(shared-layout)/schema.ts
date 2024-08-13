import * as Yup from "yup";

export const schema = Yup.object().shape({
  logo: Yup.mixed(),
  name: Yup.string().required(),
  longitude: Yup.string(),
  latitude: Yup.string(),
  is_enabled: Yup.boolean(),
  web_address: Yup.string().required(),
  service_provided: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("This field is required."),
      type: Yup.string().required("This field is required."),
    })
  ),
  tags: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("This field is required."),
      type: Yup.string().required("This field is required."),
    })
  ),
  provider_types: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("This field is required."),
      type: Yup.string().required("This field is required."),
    })
  ),
  provisioning_status: Yup.string(),
});
