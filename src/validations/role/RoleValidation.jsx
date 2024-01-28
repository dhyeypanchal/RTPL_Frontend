import * as Yup from "yup";

export const RoleValidationSchema = () =>
    Yup.object().shape({
        role: Yup.string().trim().required("Role is required"),
    });
