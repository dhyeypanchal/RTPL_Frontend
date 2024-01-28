import { Formik, Form, Field } from "formik";
import { toast  } from 'react-toastify'
import { useEffect, useState } from "react";
import {
    Dialog,
    Card,
    CardBody,
    Typography,
    CardFooter,
    Button
} from "@material-tailwind/react";
import axios from "axios";

const RegisterDetails = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedID, setSelectedID] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(1);
    const [persons, setPersons] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        anniversaryDate: "",
        designation: "",
        photo: null,
        aadhar: null,
    });

    const handleDialogSubmit = () => {
        setCount(count + 1);
        setPersons([...persons, { ...formData }]);
        setOpen(false);
        setFormData({
            firstName: "",
            lastName: "",
            dob: "",
            anniversaryDate: "",
            designation: "",
            photo: null,
            aadhar: null,
        });
    };

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            const inputPhoneNumber = prompt('Please enter your phone number:');
            setPhoneNumber(inputPhoneNumber);
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


    const handleOpen = () => {
        setOpen(!open);
    }

    const initialValues = {
        fname: "",
        lname: "",
        perpose: "",
        cname: "",
        designation: "",
        cpName: "",
        cAddr: "",
        cNum: "",
        cMail: "",
        dob: "",
        aDate: "",
    };

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

    const handleSubmit = async (values) => {
        try {
            console.log({
                "photo": selectedPhoto,
                "Id": selectedID,
                "card": selectedCard
            })
            console.log(values);
            console.log(phoneNumber);
            toast.success("Store Added successfully");
        } catch (error) {
            toast.error("Error");
            console.error(error);
        }
    };

    return (
        <>
            <div className="max-w-md mt-5 mx-auto p-4 bg-white rounded-lg">
                <img src="/assets/images/logo.png" width="50%" alt="Logo" className="mx-auto mb-4" />
                <h1 className="text-center mb-6 text-2xl font-bold">Visitor Registration Form</h1>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <div className="my-5">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="fname"
                            >
                                First Name
                            </label>
                            <Field
                                type="text"
                                id="fname"
                                name="fname"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="lname" className="block mb-1 font-medium">
                                Last Name:
                            </label>
                            <Field
                                type="text"
                                id="lname"
                                name="lname"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="ecode" className="block mb-1 font-medium">
                                Employee Code:
                            </label>
                            <Field
                                type="number"
                                id="ecode"
                                name="ecode"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phno" className="block mb-1 font-medium">
                                Contact Number:
                            </label>
                            <Field
                                type="number"
                                id="phno"
                                name="phno"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1 font-medium">
                                Email:
                            </label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dob" className="block mb-1 font-medium">
                                Date Of Birth:
                            </label>
                            <Field
                                type="date"
                                id="dob"
                                name="dob"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="aDate" className="block mb-1 font-medium">
                                Anniversery Date:
                            </label>
                            <Field
                                type="date"
                                id="aDate"
                                name="aDate"
                                style={inputStyle}
                            />
                        </div>


                        <div className="mb-4">
                            <label htmlFor="cname" className="block mb-1 font-medium">
                                Company Name:
                            </label>
                            <Field
                                type="text"
                                id="cname"
                                name="cname"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="department" className="block mb-1 font-medium">
                                Department:
                            </label>
                            <Field
                                type="text"
                                id="department"
                                name="department"
                                style={inputStyle}
                            >
                            </Field>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="designation" className="block mb-1 font-medium">
                                Designation:
                            </label>
                            <Field
                                type="text"
                                id="designation"
                                name="designation"
                                style={inputStyle}
                            >
                            </Field>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="office_address" className="block mb-1 font-medium">
                                Office Address:
                            </label>
                            <Field
                                type="text"
                                id="office_address"
                                name="office_address"
                                style={inputStyle}
                            >
                            </Field>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="role" className="block mb-1 font-medium">
                                Role:
                            </label>
                            <Field
                                type="text"
                                id="role"
                                name="role"
                                style={inputStyle}
                            >
                            </Field>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="aadhaar" className="block mb-1 font-medium">
                                Aadhaar Number:
                            </label>
                            <Field
                                type="text"
                                id="aadhaar"
                                name="aadhaar"
                                style={inputStyle}
                            >
                            </Field>
                        </div>

                       
                        <div className="my-5">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="storeFile"
                            >
                                Employee ID Proof:
                            </label>
                            <input
                                id="storeFile"
                                type="file"
                                style={inputStyle}
                                onChange={(event) => setSelectedID(event.target.files[0])}
                            />
                        </div>
                     
                        <div className="my-5">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="storeFile"
                            >
                                Aadhaar Card:
                            </label>
                            <input
                                id="storeFile"
                                type="file"
                                style={inputStyle}
                                onChange={(event) => setSelectedCard(event.target.files[0])}
                            />
                        </div>

                        <div className="my-5">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="photoFile"
                            >
                                Upload Photo:
                            </label>
                            <input
                                id="storeFile"
                                type="file"
                                style={inputStyle}
                                onChange={(event) => setSelectedPhoto(event.target.files[0])}
                            />
                        </div>


{/* 
                        <button
                            type="submit"
                            className="w-full mb-3 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                        >
                            Submit
                        </button> */}
                    </Form>
                </Formik>
            </div>
            {/* <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <div className="mb-4">
                            <Typography className="text-center" variant="h6">Person {count}</Typography>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="mb-2"
                                    style={inputStyle}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="mb-2"
                                    style={inputStyle}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="designation"
                                    placeholder="Designation"
                                    className="mb-2"
                                    style={inputStyle}
                                    onChange={handleInputChange}
                                />
                                <label>Date Of Birth:</label>
                                <input
                                    type="date"
                                    name="dob"
                                    placeholder="Date of Birth"
                                    className="mb-2"
                                    style={inputStyle}
                                    onChange={handleInputChange}
                                />
                                <label>Anniversary Date:</label>
                                <input
                                    type="date"
                                    name="anniversaryDate"
                                    className="mb-2"
                                    style={inputStyle}
                                    onChange={handleInputChange}
                                />
                                <label>Aadhar Card:</label>
                                <input
                                    type="file"
                                    name="aadhar"
                                    className="mb-2"
                                    style={inputStyle}
                                    onChange={handleFileChange}
                                />
                                <label>Photo:</label>
                                <input
                                    type="file"
                                    name="photo"
                                    style={inputStyle}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleDialogSubmit} fullWidth>
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog> */}
        </>
    );
}

export default RegisterDetails;