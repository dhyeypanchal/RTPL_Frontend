import Breadcrumb from "./Breadcrumb"
import { Formik, Form, Field } from "formik";
import { toast } from 'react-toastify'
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { useLocation } from "react-router-dom";

function UpdateAdmin() {
    const { state } = useLocation();
    console.log(state);
    const [roledata, setRoleData] = useState([])
    const [companydata, setCompanyData] = useState([])
    const [departmentdata, setDepartmentData] = useState([])
    const [officedata, setOfficeData] = useState([])
    const [designationdata, setDesignationData] = useState([])

    const [selectedValueforRole, SetValueForRole] = useState("")
    const [selectedValueforCompany, SetValueForComapany] = useState("")
    const [selectedValueforDepartment, SetValueForDepartment] = useState("")


    useEffect(() => {
        const getData = async () => {
            try {
                const response1 = await instance.get("/api/role/getRoleList");
                const totalroledata = response1.data.employeeRoles.map((role) => ({
                    RoleId: role.roleID,
                    Role: role.role,
                }))
                setRoleData(totalroledata)
            } catch (error) {
                toast.error("error while getting roles data")
            }


            try {
                const response2 = await instance.get("/api/company/getCompanyList");
                const totalcompanydata = response2.data.data.map((company) => ({
                    CompanyId: company.companyID,
                    CompanyName: company.Name,

                }))
                setCompanyData(totalcompanydata)
            } catch (error) {
                toast.error("error while getting company data")
            }

            try {
                const response3 = await instance.get("/api/department/get_department_list");

                const totaldepartmentdata = response3.data.departments.map((departments) => ({
                    DepartmentId: departments.departmentID,
                    Department: departments.department,

                }))
                setDepartmentData(totaldepartmentdata)
            } catch (error) {
                toast.error("error while getting department data")
            }

        }
        getData()
    }, [])

    // console.log(roledata,companydata,departmentdata);


    const [selectedPhoto, setSelectedPhoto] = useState();
    const [selectedID, setSelectedID] = useState();
    const [selectedCard, setSelectedCard] = useState();
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [empcodeforcheck, setEmpCode] = useState('');
    const [formData, setFormData] = useState({
        fname: state.data.firstName,
        lname: state.data.lastName,
        ecode: state.data.emp_code,
        aadhar: state.data.aadharNumber,
        dob: state.data.birthDate,
        joining: state.data.joiningDate,
        email: state.data.email,
        phno: state.data.phone,
        password: state.data.password,
        role: state.data.role.roleID,
        company: "",
        department: "",
        designation: "",
        office: "",
        empProfileImg: null,
        empAadharCard: null,
        empIdCard: null
    });


    const [isEmployee, setIsEmployee] = useState(false)

    const handleEmployeeCheckboxChange = async (e) => {
        if (e.target.checked) {
            const empcode = prompt('Please enter your Employee Code:');
            setEmpCode(empcode);
            try {
                const response = await instance.get(`/api/employee/getEmployeeByEmpCode/${empcode}`);
                if (response.status == 200) {
                    setIsEmployee(true)
                }
                else {
                    toast.warning("Wrong Employee Code")
                }
            } catch (error) {
                toast.error("Wrong input")
            }
        }
        setAlreadyRegistered(e.target.checked);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: files[0],
        }));
    };




    // const initialValues = {
    //     fname: "",
    //     lname: "",
    //     perpose: "",
    //     cname: "",
    //     designation: "",
    //     cpName: "",
    //     cAddr: "",
    //     cNum: "",
    //     cMail: "",
    //     dob: "",
    //     aDate: "",
    // };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const res = await axios.get(`http://3.110.27.83:3000/api/employee/getEmployeeList`);//filter ? by company name
                // if (res.status === 200) {
                //     setEmployees(res.data);
                // }
            } catch (error) {
                console.error('Error fetching employee list:', error);
            }
        }
        fetchData();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(formData.empProfileImg)

        // const formDataofempproof = new FormData();
        // formDataofempproof.append('empProfileImg', formData.empProfileImg);

        // console.log(formDataofempproof);

        // const formDataofaadhar = new FormData();
        // formDataofaadhar.append('empAadharCard', formData.empAadharCard);

        // const formDataofidcard = new FormData();
        // formDataofidcard.append('empIdCard', formData.empIdCard);



        const data = new FormData();
        data.append("firstName", formData.fname);
        data.append("lastName", formData.lname);
        data.append("emp_code", formData.ecode);
        data.append("aadharNumber", formData.aadhar);
        data.append("birthDate", formData.dob);
        data.append("joiningDate", formData.joining);
        data.append("email", formData.email);
        data.append("phone", formData.phno);
        data.append("password", formData.password);
        data.append("roleID", formData.role);
        data.append("companyID", formData.company);
        data.append("departmentID", formData.department);
        data.append("designationID", formData.designation);
        data.append("officeID", formData.office);
        data.append("permissions", selectedPermissions);


        if (formData.empProfileImg) {
            data.append("empProfileImg", formData.empProfileImg)
        }
        if (formData.empIdCard) {
            data.append("empIdCard", formData.empIdCard)
        }
        if (formData.empAadharCard) {
            data.append("empAadharCard", formData.empAadharCard)
        }





        // firstName:formData.fname,
        // lastName:formData.lname,
        // emp_code: formData.ecode,
        // aadharNumber: formData.aadhar,
        // birthDate: formData.dob,
        // joiningDate: formData.joining,
        // email: formData.email,
        // phone: formData.phno,
        // password: formData.password,
        // roleID: formData.role,
        // companyID: formData.company,
        // departmentID: formData.department,
        // designationID: formData.designation,
        // officeID:formData.office,
        // empProfileImg: formDataofempproof,
        // empAadharCard: formDataofaadhar,
        // empIdCard: formDataofidcard,
        // permissions: selectedPermissions


        const token = localStorage.getItem("token")
        try {
            const res = await instance.post(`/api/admin/addAdmin`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res.data);
            if (res.status === 201) {
                toast.success("Successfully submitting the data")
            }
        } catch (error) {
            toast.error("Error while Submitting the form");
            console.error(error);
        }
    };




    const handleRoleChange = async (e) => {
        console.log(e.target.value);
        // SetValueForRole(e.target.value)
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleCompanyChange = async (e) => {
        // console.log(e.target.value);
        // SetValueForComapany(e.target.value)

        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
            office: ""
        }));

        const response4 = await instance.get(`/api/company/office/getOfficelistByCompany/${e.target.value}`);
        const totalofficedata = response4.data.data.map((office) => ({
            OfficeId: office.officeID,
            OfficeAddress: office.Address,
        }))
        setOfficeData(totalofficedata)
    }
    const handleDepartmentChange = async (e) => {
        console.log(e.target.value);
        // SetValueForDepartment(e.target.value)

        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
            designation: ""
        }));

        const response5 = await instance.get(`/api/designation/get_designation_By_DepartmentID/${e.target.value}`);
        const totaldesignationdata = response5.data.designations.map((designation) => ({
            DesignationId: designation.designationID,
            Designation: designation.designation,
        }))
        setDesignationData(totaldesignationdata)
    }
    // const handleOfficeChange= (e)=>{
    //     console.log(e.target.value);
    //     SetValueForRole(e.target.value)
    // }
    // const handledesignationChange= (e)=>{
    //     console.log(e.target.value);
    //     SetValueForRole(e.target.value)
    // }



    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const handleCheckboxChange = (val) => {
        // Check if the value is already in the array
        if (selectedPermissions.includes(val)) {
            // If it is, remove it
            setSelectedPermissions((prevPermissions) =>
                prevPermissions.filter((item) => item !== val)
            );
        } else {
            // If it's not, add it
            setSelectedPermissions((prevPermissions) => [...prevPermissions, val]);
        }
    };

    console.log(selectedPermissions);


    return (
        <>
            <div className="px-5 py-4 removepadding">
                <Breadcrumb />
            </div>
            <div className="max-w-2xl md mt-5 mx-auto p-3 bg-white rounded-lg">
                <img src="/assets/images/logo.png" width="40%" alt="Logo" className="mx-auto" />
                <h1 className="text-center mb-6 text-2xl font-bold">Update Admin Form</h1>
                <Formik onSubmit={handleSubmit}>
                    <Form onSubmit={handleSubmit}>
                        {!isEmployee ?
                            <>

                                <div className="flex flex-wrap justify-center items-center">
                                    <div className="mb-4 w-72 mr-2">
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            htmlFor="fname"
                                        >
                                            First Name:
                                        </label>
                                        <Field
                                            type="text"
                                            id="fname"
                                            name="fname"
                                            style={inputStyle}
                                            onChange={handleInputChange}
                                            value={formData.fname}
                                        />
                                    </div>

                                    <div className="mb-4 w-72 mr-2">
                                        <label htmlFor="lname" className="block mb-1 font-medium">
                                            Last Name:
                                        </label>
                                        <Field
                                            type="text"
                                            id="lname"
                                            name="lname"
                                            style={inputStyle}
                                            onChange={handleInputChange}
                                            value={formData.lname}
                                        />
                                    </div>

                                </div>

                                <div className="flex flex-wrap justify-center items-center">

                                    <div className="mb-4 w-72 mr-2">
                                        <label htmlFor="ecode" className="block mb-1 font-medium">
                                            Employee Code:
                                        </label>
                                        <Field
                                            type="text"
                                            id="ecode"
                                            name="ecode"
                                            style={inputStyle}
                                            onChange={handleInputChange}
                                            value={formData.ecode}
                                        />
                                    </div>

                                    <div className="mb-4 w-72 mr-2">
                                        <label htmlFor="aadhar" className="block mb-1 font-medium">
                                            Aadhar Number:
                                        </label>
                                        <Field
                                            type="number"
                                            id="aadhar"
                                            name="aadhar"
                                            style={inputStyle}
                                            onChange={handleInputChange}
                                            value={formData.aadhar}
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-wrap justify-center items-center">

                                    <div className="mb-4 w-72 mr-2">
                                        <label htmlFor="dob" className="block mb-1 font-medium">
                                            Date Of Birth:
                                        </label>
                                        <Field
                                            type="date"
                                            id="dob"
                                            name="dob"
                                            style={inputStyle}
                                            onChange={handleInputChange}
                                            value={formData.dob}
                                        />
                                    </div>
                                    <div className="mb-4 w-72 mr-2">
                                        <label htmlFor="joining" className="block mb-1 font-medium">
                                            Joining Date:
                                        </label>
                                        <Field
                                            type="date"
                                            id="joining"
                                            name="joining"
                                            style={inputStyle}
                                            onChange={handleInputChange}
                                            value={formData.joining}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center items-center">

                                    <div className="mb-4 w-72 mr-2">
                                        <label htmlFor="email" className="block mb-1 font-medium">
                                            Email:
                                        </label>
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            style={inputStyle}
                                            onChange={handleInputChange}
                                            value={formData.email}
                                        />
                                    </div>
                                    <div className="mb-4 w-72 mr-2">
                                        <label htmlFor="phno" className="block mb-1 font-medium">
                                            Contact Number:
                                        </label>
                                        <Field
                                            type="number"
                                            id="phno"
                                            name="phno"
                                            style={inputStyle}
                                            onChange={handleInputChange}
                                            value={formData.phno}
                                        />
                                    </div>
                                </div>

{/* from the role the code is pending */}
                                <div className="flex flex-wrap justify-center sm:mb-4">
                                    <div className="mb-4 sm:w-full sm:mx-[2rem] w-72">
                                        <label htmlFor="role" value={formData.role} className="block mb-1 font-medium">
                                            Role:
                                        </label>
                                        <Field as="select" name="role" id="role" onChange={handleRoleChange} style={inputStyle}>
                                            <option value="" hidden>
                                                Select Role
                                            </option>
                                            {roledata?.map((role, index) => {
                                                return (
                                                    <option key={index} value={role.RoleId}>{role.Role}</option>
                                                )
                                            })}
                                        </Field>
                                    </div>

                                </div>

                                <div className="flex flex-wrap justify-center items-center">



                                    <div className="mb-4 w-72 mr-2">
                                        <label htmlFor="company" value={selectedValueforCompany} className="block mb-1 font-medium">
                                            Company Name:
                                        </label>
                                        <Field as="select" name="company" id="company" onChange={handleCompanyChange} style={inputStyle}>
                                            <option value="" hidden>
                                                Select Company
                                            </option>
                                            {companydata?.map((company, index) => {
                                                return (
                                                    <option key={index} value={company.CompanyId}>{company.CompanyName}</option>
                                                )
                                            })}
                                        </Field>
                                    </div>
                                    <div className="mb-4 w-72 mr-2">
                                        <label htmlFor="department" value={selectedValueforDepartment} className="block mb-1 font-medium">
                                            Department:
                                        </label>
                                        <Field as="select" name="department" id="department" onChange={handleDepartmentChange} style={inputStyle}>
                                            <option value="" hidden>
                                                Select Department
                                            </option>
                                            {departmentdata?.map((department, index) => {
                                                return (
                                                    <option key={index} value={department.DepartmentId}>{department.Department}</option>
                                                )
                                            })}
                                        </Field>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center items-center">

                                    <div className="mb-4 w-72 mr-2">
                                        <label htmlFor="designation" className="block mb-1 font-medium">
                                            Designation:
                                        </label>
                                        <Field as="select" name="designation" id="designation" style={inputStyle} onChange={handleInputChange}>
                                            <option value="" hidden>
                                                Select Designation
                                            </option>
                                            {designationdata?.map((designation, index) => {
                                                return (
                                                    <option key={designation.DesignationId} value={designation.DesignationId}>{designation.Designation}</option>
                                                )
                                            })}
                                        </Field>
                                    </div>
                                    <div className="mb-4 w-72 mr-2">
                                        <label htmlFor="office" className="block mb-1 font-medium">
                                            Office Name:
                                        </label>
                                        <Field as="select" name="office" id="office" style={inputStyle} onChange={handleInputChange}>
                                            <option value="" hidden>
                                                Select Office
                                            </option>
                                            {officedata?.map((office, index) => {
                                                return (
                                                    <option key={office.OfficeId} value={office.OfficeId}>{office.OfficeAddress}</option>
                                                )
                                            })}
                                        </Field>
                                    </div>
                                </div>


                                <div className="flex flex-wrap justify-center items-center">

                                    <div className="mb-4 w-72 mr-2">
                                        <label
                                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            htmlFor="empProfileImg"
                                        >
                                            Employee ID Proof:
                                        </label>
                                        <input
                                            id="empProfileImg"
                                            name="empProfileImg"
                                            type="file"
                                            style={inputStyle}
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <div className="mb-4 w-72 mr-2">
                                        <label
                                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            htmlFor="empAadharCard"
                                        >
                                            Aadhaar Card:
                                        </label>
                                        <input
                                            id="empAadharCard"
                                            name="empAadharCard"
                                            type="file"
                                            style={inputStyle}
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                </div>

                                <div className="flex flex-wrap justify-center sm:mb-4">

                                    <div className="mb-4 sm:w-full sm:mx-[2rem] w-72">
                                        <label
                                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            htmlFor="empIdCard"
                                        >
                                            Upload Photo:
                                        </label>
                                        <input
                                            id="empIdCard"
                                            name="empIdCard"
                                            type="file"
                                            style={inputStyle}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            </> : ""}

                        <div className="flex flex-wrap justify-center items-center sm:mb-4">
                            <div className=" w-72">
                                <input
                                    id="checkcompany"
                                    name="checkcompany"
                                    type="checkbox"
                                    value="1"
                                    checked={selectedPermissions.includes("1")}
                                    onChange={() => handleCheckboxChange("1")}
                                    className=""
                                />
                                <label
                                    className='mb-2 mx-2 font-medium text-gray-900 dark:text-white'
                                    htmlFor="checkcompany"
                                >
                                    Company Permission
                                </label>

                            </div>
                            <div className="w-72">
                                <input
                                    id="checkconference"
                                    name="checkconference"
                                    type="checkbox"
                                    className=""
                                    value="1"
                                    checked={selectedPermissions.includes("2")}
                                    onChange={() => handleCheckboxChange("2")}
                                />
                                <label
                                    className='mb-2 mx-2 font-medium text-gray-900 dark:text-white'
                                    htmlFor="checkconference"
                                >
                                    Conference Permission
                                </label>

                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center items-center sm:mb-4">
                            <div className=" w-72">
                                <input
                                    id="checkdepartment"
                                    name="checkdepartment"
                                    type="checkbox"
                                    className=""
                                    value="1"
                                    checked={selectedPermissions.includes("3")}
                                    onChange={() => handleCheckboxChange("3")}
                                />
                                <label
                                    className='mb-4 mx-2 font-medium text-gray-900 dark:text-white'
                                    htmlFor="checkdepartment"
                                >
                                    Department Permission
                                </label>

                            </div>
                            <div className=" w-72">
                                <input
                                    id="checkdesignation"
                                    name="checkdesignation"
                                    type="checkbox"
                                    className=""
                                    value="1"
                                    checked={selectedPermissions.includes("4")}
                                    onChange={() => handleCheckboxChange("4")}
                                />
                                <label
                                    className='mb-4 mx-2 font-medium text-gray-900 dark:text-white'
                                    htmlFor="checkdesignation"
                                >
                                    Designation Permission
                                </label>

                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center items-center sm:mb-4">
                            <div className=" w-72">
                                <input
                                    id="checkrole"
                                    name="checkrole"
                                    type="checkbox"
                                    className=""
                                    value="1"
                                    checked={selectedPermissions.includes("5")}
                                    onChange={() => handleCheckboxChange("5")}
                                />
                                <label
                                    className='mb-4 mx-2 font-medium text-gray-900 dark:text-white'
                                    htmlFor="checkrole"
                                >
                                    Role Permission
                                </label>

                            </div><div className=" w-72">
                                <input
                                    id="checkmeetmode"
                                    name="checkmeetmode"
                                    type="checkbox"
                                    className=""
                                    value="1"
                                    checked={selectedPermissions.includes("7")}
                                    onChange={() => handleCheckboxChange("7")}
                                />
                                <label
                                    className='mb-4 mx-2 font-medium text-gray-900 dark:text-white'
                                    htmlFor="checkmeetmode"
                                >
                                    MeetingMode Permission
                                </label>

                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center items-center mb-4">
                            <div className=" w-72">
                                <input
                                    id="checkmeettype"
                                    name="checkmeettype"
                                    type="checkbox"
                                    className=""
                                    value="1"
                                    checked={selectedPermissions.includes("8")}
                                    onChange={() => handleCheckboxChange("8")}
                                />
                                <label
                                    className='mb-4 mx-2 font-medium text-gray-900 dark:text-white'
                                    htmlFor="checkmeettype"
                                >
                                    MeetingType Permission
                                </label>

                            </div>

                            <div className=" w-72">
                                <input
                                    id="checkoffice"
                                    name="checkoffice"
                                    type="checkbox"
                                    className=""
                                    value="1"
                                    checked={selectedPermissions.includes("9")}
                                    onChange={() => handleCheckboxChange("9")}
                                />
                                <label
                                    className='mb-4 mx-2 font-medium text-gray-900 dark:text-white'
                                    htmlFor="checkoffice"
                                >
                                    Office Permission
                                </label>

                            </div>
                        </div>





                        <div className="flex flex-wrap justify-center">

                            <button
                                type="submit"
                                className=" sm:w-full sm:mx-[2rem] w-72 mb-3 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                            >
                                Submit
                            </button>
                        </div>

                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default UpdateAdmin;
