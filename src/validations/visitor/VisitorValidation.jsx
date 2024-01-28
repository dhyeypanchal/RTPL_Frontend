import * as Yup from "yup";
import { DOCUMENT_SUPPORTED_FORMATS } from "../../utils/commonConstants";

export const VisitorValidationSchema = () =>
    Yup.object().shape({
        purpose: Yup.string().required("Purpose is required"),
        visitors: Yup.array().of(
            Yup.object().shape({
                vFirstName: Yup.string()
                    .max(255, "First name is Maximum 255 Characters allowed")
                    .required("First name is required"),
                vLastName: Yup.string()
                    .max(255, "Last name is Maximum 255 Characters allowed")
                    .required("Last name is required"),
                vDesignation: Yup.string()
                    .max(255, "Last name is Maximum 255 Characters allowed")
                    .required("Last name is required"),
                vImage: Yup.mixed()
                    .required("Image is required")
                    .test('fileType', "Only image files are allowed!", (value) => {
                        if (value?.type) {
                            return DOCUMENT_SUPPORTED_FORMATS.includes(value.type)
                        } else {
                            return true;
                        }
                    }
                    ),
                vIDDoc: Yup.mixed()
                    .required("Document is required")
                    .test('fileType', "Only document files are allowed!", (value) => {
                        if (value?.type) {
                            return DOCUMENT_SUPPORTED_FORMATS.includes(value.type)
                        } else {
                            return true;
                        }
                    }
                    ),

            })
        ),
        company: Yup.object().shape({
            vCompanyName: Yup.string()
                .max(255, "Company name is Maximum 255 Characters allowed")
                .required("Company name is required"),
            vCompanyAddress: Yup.string()
                .required("Company address is required"),
            vCompanyContact: Yup.string()
                .nullable()
                .required("Phone Number is required")
                .matches(/^[0-9]\d{9}$/, {
                    message: "Phone number must be numbers only with 10 digit",
                    excludeEmptyString: false,
                }),
            vCompanyEmployee: Yup.string()
                .required("Company employee is required"),
            vCompanyEmail: Yup.string()
                .email("Email is invalid")
                .max(255, "Maximum 255 Characters allowed")
                .required("Email is required")
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Email is invalid")
        })
    });
