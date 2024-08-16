import * as Yup from "yup";

export const schema = Yup.object().shape({
  photo_url: Yup.lazy((value) => {
    if (value === null) {
      return Yup.string().required("This field is required.");
    }

    return Yup.mixed().required("This field is required.").nullable();
  }),
  first_name: Yup.string().required("This field is required."),
  last_name: Yup.string().required("This field is required."),
  middle_name: Yup.string().required("This field is required."),
  birth_date: Yup.string(),
  preferred_name: Yup.string().required("This field is required."),
  email: Yup.string()
    .required("This field is required.")
    .email("Must be a valid email address"),
  primary_phone: Yup.string().required("This field is required."),
  addr_line_1: Yup.string().required("This field is required."),
  addr_line_2: Yup.string().required("This field is required."),
  city: Yup.string().required("This field is required."),
  zip_code: Yup.string().required("This field is required."),
  country: Yup.string().required("This field is required."),
  state_province_region: Yup.string().required("This field is required."),
});
