import * as Yup from "yup";

export const schema = Yup.object().shape({
  role: Yup.lazy((value: any) => {
    if (value === "") {
      return Yup.string().required("This field is required.");
    }

    return Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.string(),
      })
      .required("This field is required.");
  }),
  photo_url: Yup.lazy((value: null) => {
    return Yup.mixed().nullable();
  }),
  first_name: Yup.string().required("This field is required."),
  last_name: Yup.string().required("This field is required."),
  middle_name: Yup.string(),
  birth_date: Yup.string().nullable(),
  preferred_name: Yup.string(),
  email: Yup.string()
    .email("Email is invalid")
    .required("This field is required."),
  primary_phone: Yup.string(),
  addr_line_1: Yup.string(),
  addr_line_2: Yup.string(),
  city: Yup.string(),
  zip_code: Yup.string(),
  country: Yup.string(),
  state_province_region: Yup.string(),
  isNetworkAdmin: Yup.boolean(),
});
