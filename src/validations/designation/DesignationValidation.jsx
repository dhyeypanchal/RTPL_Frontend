import * as Yup from "yup";

export const DesignationValidationSchema = () =>
    Yup.object().shape({
        designation: Yup.string().trim().required("Designation is required"),
    });
