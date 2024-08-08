import * as Yup from "yup";

export const schema = Yup.object().shape({
  name: Yup.string().required(),
  longitude: Yup.string(),
  latitude: Yup.string(),
  is_enabled: Yup.boolean(),
  web_address: Yup.string().required(),
  tags: Yup.array().min(1).required(),
  provider_type: Yup.array().min(1).required(),
  provisioning_status: Yup.string(),
});
