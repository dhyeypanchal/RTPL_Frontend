import * as Yup from "yup";

export const DepartmentValidationSchema = () =>
    Yup.object().shape({
        department: Yup.string().trim().required("Department is required"),
    });
