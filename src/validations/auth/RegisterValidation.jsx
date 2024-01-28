import * as Yup from "yup";
import {
  ConfirmPasswordValidation,
  CreatePasswordValidation,
} from "./PasswordValidation";
import { DOCUMENT_SUPPORTED_FORMATS } from "../../utils/commonConstants";

export const RegisterValidationSchema = (ispassword = true) =>
  Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .matches(/^\S*$/, `Whitespace is not allowed in First Name`)
      .max(255, `Maximum 255 Characters allowed`)
      .required(`First Name is required`),
    lastName: Yup.string()
      .trim()
      .matches(/^\S*$/, `Whitespace is not allowed in Last Name`)
      .max(255, `Maximum 255 Characters allowed`)
      .required(`Last Name is required`),
    email: Yup.string()
      .email(`Email is invalid`)
      .max(255, `Maximum 255 Characters allowed`)
      .required(`Email is required`)
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, `Email is invalid`),
    birthdate: Yup.string()
      .required(`Birthdate is required`)
      .test("age", `Age must be greater than 18`,
        (val) => {
          const today = new Date();
          const birthDate = new Date(val);

          // Check if the birthDate is a valid Date object
          if (isNaN(birthDate.getTime())) {
            return false; // Invalid date
          }

          // Calculate the user's age
          const age = today.getFullYear() - birthDate.getFullYear();

          // Check if the user's birthday has already occurred this year
          if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
          ) {
            return age - 1 > 18; // Check if age is less than 18 if birthday hasn't occurred yet
          }

          return age > 18; // Check if age is less than 18
        }),
    joiningDate: Yup.string().required(`Joining Date is required`),
    // joiningDate: Yup.string().required(`Joining Date is required`),
    password: ispassword ? CreatePasswordValidation() : Yup.string(),
    confirmPassword: ispassword ? ConfirmPasswordValidation() : Yup.string(),
    mobileNo: Yup.string()
      .nullable()
      .required(`Phone Number is required`)
      .test("len", `Phone Number is not valid`, (val) => val > "0000000000")
      .matches(/^[0-9]\d{9}$/, {
        message: `Phone number must be numbers only with 10 digit`,
        excludeEmptyString: false,
      }),
    empCode: Yup.string()
      .trim()
      .matches(/^\S*$/, `Whitespace is not allowed in Employee code`)
      .max(255, `Maximum 255 Characters allowed`)
      .required(`Employee is required`),
    departmentID: Yup.string()
      .trim()
      .matches(/^\S*$/, `Whitespace is not allowed in Department`)
      .required(`Department is required`),
    designationID: Yup.string()
      .trim()
      .matches(/^\S*$/, `Whitespace is not allowed in Designation`)
      .required(`Designation is required`),
    companyID: Yup.string().required(`Company Name is required`),
    officeID: Yup.string().required(`Office address is required`),
    roleId: Yup.string().required(`Role is required`),
    aadharNumber: Yup.string()
      .trim()
      .matches(/^\S*$/, `Whitespace is not allowed in Adhar Number`)
      .max(12, `Maximum 12 Characters allowed`)
      .min(12, `At Least 12 Characters`)
      .required(`Adhar Number is required`),
    termsAndCondition: ispassword ? Yup.bool().oneOf([true], 'Please allow terms and condition') : Yup.bool(),
    // empIDCard: Yup.mixed()
    //   .required("Id Card is required")
    //   .test('fileType', "Only document files are allowed!", (value: any) => {
    //     if (value?.type) {
    //       return DOCUMENT_SUPPORTED_FORMATS.includes(value.type)
    //     } else {
    //       return true;
    //     }
    //   }
    //   ),
    // empAadharCard: Yup.mixed()
    //   .required("Adhar Card is required")
    //   .test('fileType', "Only document files are allowed!", (value: any) => {
    //     if (value?.type) {
    //       return DOCUMENT_SUPPORTED_FORMATS.includes(value.type)
    //     } else {
    //       return true;
    //     }
    //   }
    //   ),
    // empProfileIMg: Yup.mixed()
    //   .required("Profile Image is required")
    //   .test('fileType', "Only document files are allowed!", (value: any) => {
    //     if (value?.type) {
    //       return DOCUMENT_SUPPORTED_FORMATS.includes(value.type)
    //     } else {
    //       return true;
    //     }
    //   }
    //   ),
  });
