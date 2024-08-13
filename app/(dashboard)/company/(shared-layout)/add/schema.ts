import * as Yup from "yup";

export const schema = Yup.object().shape({
  logo: Yup.mixed(),
  name: Yup.string().required(),
  longitude: Yup.string(),
  latitude: Yup.string(),
  is_enabled: Yup.boolean(),
  web_address: Yup.string().required(),
  service_provided: Yup.array().min(1),
  tags: Yup.array().min(1).required(),
  provider_types: Yup.array().min(1).required(),
  provisioning_status: Yup.string(),
});
