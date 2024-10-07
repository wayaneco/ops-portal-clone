import * as Yup from "yup";

import { REGEX_EMAIL } from "@/app/constant";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("This field is required.")
    .matches(REGEX_EMAIL, "Invalid email address."),
});

export default schema;
