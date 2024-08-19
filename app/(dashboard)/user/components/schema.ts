import * as Yup from "yup";

export const schema = Yup.object().shape({
  photo_url: Yup.lazy((value: null) => {
    return Yup.mixed().nullable();
  }),
  first_name: Yup.string(),
  last_name: Yup.string(),
  middle_name: Yup.string(),
  birth_date: Yup.string(),
  preferred_name: Yup.string().required("This field is required."),
  email: Yup.string()
    .email("Must be a valid email address"),
  primary_phone: Yup.string(),
  addr_line_1: Yup.string(),
  addr_line_2: Yup.string(),
  city: Yup.string(),
  zip_code: Yup.string().required('This field is required'),
  country: Yup.string(),
  state_province_region: Yup.string(),
});
