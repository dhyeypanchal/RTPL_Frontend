import * as Yup from "yup";

export const PasswordValidation = () =>
  Yup.string()
    .trim()
    .required("Password is required")
    .matches(
      /(?=.*[A-Z])/,
      "Password needs to have at least one capital letter"
    )
    .matches(
      /(?=.*[!@#$%^&()*])/,
      "Password needs to have at least one special character"
    )
    .matches(
      /(?=.*[a-z])/,
      "Password needs to have at least one lower case character"
    )
    .matches(/(?=.*[0-9])/, "Password needs to have at least one number")
    .min(8, "Password must contain minimum 8 letters without space")
    .max(15);

export const PasswordValidationNullable = () =>
  Yup.string()
    .trim()
    .transform((value) => (!value ? null : value))
    .nullable()
    .matches(
      /(?=.*[A-Z])/,
      `Password needs to have at least one capital letter`
    )
    .matches(
      /(?=.*[!@#$%^&*])/,
      `Password needs to have at least one special character`
    )
    .matches(
      /(?=.*[a-z])/,
      `Password needs to have at least one lower case character`
    )
    .matches(/(?=.*[0-9])/, `Password needs to have at least one number`)
    .min(8, `Password must contain minimum 8 letters without space`)
    .max(15);

export const OldPasswordValidation = () =>
  Yup.string()
    .trim()
    .required("Old Password is required")
    .matches(
      /(?=.*[A-Z])/,
      "Password needs to have at least one capital letter"
    )
    .matches(
      /(?=.*[!@#$%^&*])/,
      "Password needs to have at least one special character"
    )
    .matches(
      /(?=.*[a-z])/,
      "Password needs to have at least one lower case character"
    )
    .matches(/(?=.*[0-9])/, "Password needs to have at least one number")
    .min(8, "Password must contain minimum 8 letters without space")
    .max(15);

export const CreatePasswordValidation = () =>
  Yup.string()
    .trim()
    .required(`Create Password is required`)
    .matches(/^\S*$/, `Whitespace is not allowed in Password`)
    .matches(
      /(?=.*[A-Z])/,
      `Password needs to have at least one capital letter`
    )
    .matches(
      /(?=.*[!@#$%^&*])/,
      `Password needs to have at least one special character`
    )
    .matches(
      /(?=.*[a-z])/,
      `Password needs to have at least one lower case character`
    )
    .matches(/(?=.*[0-9])/, `Password needs to have at least one number`)
    .min(8, `Password must contain minimum 8 letters without space`)
    .max(15);

export const NewPasswordValidation = () =>
  Yup.string()
    .trim()
    .required("New Password is required")
    .matches(
      /(?=.*[A-Z])/,
      "Password needs to have at least one capital letter"
    )
    .matches(
      /(?=.*[!@#$%^&*])/,
      "Password needs to have at least one special character"
    )
    .matches(
      /(?=.*[a-z])/,
      "Password needs to have at least one lower case character"
    )
    .matches(/(?=.*[0-9])/, "Password needs to have at least one number")
    .min(8, "Password must contain minimum 8 letters without space")
    .max(15);

export const ConfirmPasswordValidation = () =>
  Yup.string()
    .label("confirm password")
    .required("Confirm Password is required")
    .oneOf(
      [Yup.ref("password") || null],
      "Confirm password must match with New Password"
    );
