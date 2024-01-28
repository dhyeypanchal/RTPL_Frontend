import * as Yup from "yup";

export const UserValidationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    roleId: Yup.number().required("Role is required"),
    password: Yup.string()
      .min(6)
      .test("regex", "Please enter valid Password", (value) => {
        if (value && value != "") {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])*/;
          return regex.test(value);
        }
        return true;
      }),
    timezone: Yup.string().required("Timezone is required"),
    permissions: Yup.array()
      .of(Yup.number())
      .min(1, "Permissions field must have at least 1 items")
      .required("Permission is required"),
  });
