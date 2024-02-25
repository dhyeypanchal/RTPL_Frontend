import { Formik, Form, Field } from "formik";
import { toast } from 'react-toastify'
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
import { useUserInfo } from "../context/users";
import '../css/users.css'
import Breadcrumb from "./Breadcrumb";
import instance from "../utils/axios";
import { GrNext } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";

const VisitorReg = () => {
    const { toggle } = useUserInfo()


    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedID, setSelectedID] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [alreadyRegisteredCompany, setAlreadyRegisteredCompany] = useState(false);
    const [alreadyRegisteredIndividual, setAlreadyRegisteredIndividual] = useState(false);

    // for Compnay
    const [CompanyGST, setCompanyGST] = useState('');
    // for Individual
    const [visitorPAN, setVisitorPAN] = useState('');

    const [open, setOpen] = useState(false);
    const [openforIndividual, setOpenForIndividual] = useState(false);

    const [count, setCount] = useState(1);

    const [persons, setPersons] = useState([]);
    const [personsForIndividual, setPersonsForIndividual] = useState([]);

    const [employees, setEmployees] = useState([]);
    // for the Company
    const [formDataForCompany, setFormDataForCompany] = useState({
        typeOfVisitor: "",
        vCompanyName: "",
        vCompanyAddress: "",
        vCompanyContact: "",
        vCompanyEmail: "",
        vCompanyGST: "",
        vCompanyIndustry: "",
        purposeOfMeeting: "",
        contactPersonName: "",
        visitors: [
            {
                vFirstName: "",
                vLastName: "",
                vDateOfBirth: "",
                vDesignation: "",
                vDepartment: ""
            }
        ],
        vLiveImage: [],
        vPhotoID: [],
        vVisitorID: []
    });


    // for the Individual
    const [formDataForIndividual, setFormDataForIndividual] = useState({
        typeOfVisitor: "",
        purposeOfMeeting: "",
        contactPersonName: "",
        visitors: [
            {
                vFirstName: "",
                vLastName: "",
                vDateOfBirth: "",
                vDesignation: "",
                vDepartment: "",
                vPANCard: "",
                vAddress: "",
                vContact: "",
                vMailID: ""
            }
        ],
        vLiveImage: [],
        vPhotoID: [],
        vVisitorID: []
    });

    const button = `w-fit px-5 py-2`;


    // for Company
    const handleCheckboxChangeForCompany = async (e) => {
        if (e.target.checked) {
            var inputCompanyGST = prompt('Please enter your Company GST:');
            setCompanyGST(inputCompanyGST);
        }
        if (inputCompanyGST !== null) {
            setAlreadyRegisteredCompany(e.target.checked);
            console.log(inputCompanyGST);
            try {
                console.log(inputCompanyGST);
                const token = localStorage.getItem("token")
                const res = await instance.get(`/api/visitor/get_visitor_by_company_contact`,
                    { companyGST: inputCompanyGST },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(res.data.details[0]);


            } catch (error) {
                toast.error("Error while getting data.")
            }
        }
    };


    // for Individual
    const handleCheckboxChangeForIndividual = async (e) => {
        if (e.target.checked) {
            var visitorPAN = prompt('Please enter your PAN No:');
            setVisitorPAN(visitorPAN);
        }
        if (visitorPAN !== null) {
            setAlreadyRegisteredIndividual(e.target.checked);
            try {
                const token = localStorage.getItem("token")
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ visitorPAN }),
                };
                // const res = await instance.get(`/api/visitor/get_visitor_by_company_contact`, {
                //     visitorPAN: { visitorPAN },
                //     headers: {
                //         Authorization: `Bearer ${token}`
                //     }
                // })

                const res = await fetch("http://13.234.67.131:3000/api/visitor/get_visitor_by_company_contact", options);
                const data = await res.json();


                console.log(data);


            } catch (error) {
                toast.error("Error while getting data.")
            }
        }

    };


    // for the Company
    const handleDialogSubmit = (e) => {
        e.preventDefault()
        setCount(count + 1);
        setPersons([...persons, { ...formDataForCompany.visitors }]);
        setOpen(false);
        // setFormDataForCompany(initialValuesforCompany);
    };


    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };

    const handleInputChangeForCompany = (e) => {
        const { name, value } = e.target;
        setFormDataForCompany(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleVisitorChange = (e, index) => {
        const { name, value } = e.target;

        setFormDataForCompany((prevData) => {
            const updatedVisitors = [...prevData.visitors];
            updatedVisitors[index] = {
                ...updatedVisitors[index],
                [name]: value,
            };
            return {
                ...prevData,
                visitors: updatedVisitors,
            };
        });
    };

    const handleFileChangeForCompanyphotoId = (e, index) => {
        const { name, files } = e.target;
        setFormDataForCompany(prevData => {
            const updatedImage = [...prevData.vPhotoID];
            updatedImage[index] = {
                ...updatedImage[index],
                [name]: files[0],
            };
            return {
                ...prevData,
                vPhotoID: updatedImage,
            };
        });
    };
    const handleFileChangeForCompanyvisitorId = (e, index) => {
        const { name, files } = e.target;
        setFormDataForCompany(prevData => {
            const updatedImage = [...prevData.vVisitorID];
            updatedImage[index] = {
                ...updatedImage[index],
                [name]: files[0],
            };
            return {
                ...prevData,
                vVisitorID: updatedImage,
            };
        });
    };
    const handleFileChangeForCompanyLiveImage = (e, index) => {
        const { name, files } = e.target;
        setFormDataForCompany(prevData => {
            const updatedImage = [...prevData.vLiveImage];
            updatedImage[index] = {
                ...updatedImage[index],
                [name]: files[0],
            };
            return {
                ...prevData,
                vLiveImage: updatedImage,
            };
        });
    };


    const handleSubmitForCompany = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("contactPersonName", formDataForCompany.contactPersonName)
        data.append("purposeOfMeeting", formDataForCompany.purposeOfMeeting)
        data.append("typeOfVisitor", "Company")
        data.append("vCompanyAddress", formDataForCompany.vCompanyAddress)
        data.append("vCompanyContact", formDataForCompany.vCompanyContact)
        data.append("vCompanyEmail", formDataForCompany.vCompanyEmail)
        data.append("vCompanyGST", formDataForCompany.vCompanyGST)
        data.append("vCompanyIndustry", formDataForCompany.vCompanyIndustry)
        data.append("vCompanyName", formDataForCompany.vCompanyName)
        // data.append("vLiveImage",formDataForCompany.vLiveImage)
        // data.append("vPhotoID",formDataForCompany.vPhotoID)
        // data.append("vVisitorID",formDataForCompany.vVisitorID)
        // data.append("visitors",formDataForCompany.visitors)


        formDataForCompany.visitors.map((visitor, index) => {
            data.append(`visitors[${index}][vFirstName]`, visitor.vFirstName)
            data.append(`visitors[${index}][vLastName]`, visitor.vLastName)
            data.append(`visitors[${index}][vDateOfBirth]`, visitor.vDateOfBirth)
            data.append(`visitors[${index}][vDesignation]`, visitor.vDesignation)
            data.append(`visitors[${index}][vDepartment]`, visitor.vDepartment)
        })

        formDataForCompany.vPhotoID.map((photo, index) => {
            data.append("vPhotoID", photo.vPhotoID)
        })
        formDataForCompany.vLiveImage.map((photo, index) => {
            data.append("vLiveImage", photo.vLiveImage)
        })
        formDataForCompany.vVisitorID.map((photo, index) => {
            data.append("vVisitorID", photo.vVisitorID)
        })


        const token = localStorage.getItem("token")
        try {
            const res = await instance.post(`/api/visitor/visitor_request_meeting`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (res.status === 200) {
                toast.success("Successfully submitting the data")
                setFormDataForCompany({
                    typeOfVisitor: "",
                    vCompanyName: "",
                    vCompanyAddress: "",
                    vCompanyContact: "",
                    vCompanyEmail: "",
                    vCompanyGST: "",
                    vCompanyIndustry: "",
                    purposeOfMeeting: "",
                    contactPersonName: "",
                    visitors: [
                        {
                            vFirstName: "",
                            vLastName: "",
                            vDateOfBirth: "",
                            vDesignation: "",
                            vDepartment: ""
                        }
                    ],
                    vLiveImage: [],
                    vPhotoID: [],
                    vVisitorID: []
                })
                window.location.reload()
            }
        } catch (error) {
            toast.error("Error while Submitting the form");
            console.error(error);
        }
    }



    const handleOpen = () => {
        setOpen(!open);
    }





    // for the individual

    const handleDialogSubmitForIndividual = (e) => {
        e.preventDefault()
        setCount(count + 1);
        setPersonsForIndividual([...personsForIndividual, { ...formDataForIndividual.visitors }]);
        setOpenForIndividual(false);
        // setFormDataForIndividual(initialValuesforIndividual);
    };

    const handleInputChangeForIndividual = (e) => {
        const { name, value } = e.target;
        setFormDataForIndividual(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleVisitorChangeForIndividual = (e, index) => {
        const { name, value } = e.target;

        setFormDataForIndividual((prevData) => {
            const updatedVisitors = [...prevData.visitors];
            updatedVisitors[index] = {
                ...updatedVisitors[index],
                [name]: value,
            };
            return {
                ...prevData,
                visitors: updatedVisitors,
            };
        });
    };

    const handleFileChangeForIndividualphotoId = (e, index) => {
        const { name, files } = e.target;
        setFormDataForIndividual(prevData => {
            const updatedImage = [...prevData.vPhotoID];
            updatedImage[index] = {
                ...updatedImage[index],
                [name]: files[0],
            };
            return {
                ...prevData,
                vPhotoID: updatedImage,
            };
        });
    };
    const handleFileChangeForIndividualvisitorId = (e, index) => {
        const { name, files } = e.target;
        setFormDataForIndividual(prevData => {
            const updatedImage = [...prevData.vVisitorID];
            updatedImage[index] = {
                ...updatedImage[index],
                [name]: files[0],
            };
            return {
                ...prevData,
                vVisitorID: updatedImage,
            };
        });
    };
    const handleFileChangeForIndividualLiveImage = (e, index) => {
        const { name, files } = e.target;
        setFormDataForIndividual(prevData => {
            const updatedImage = [...prevData.vLiveImage];
            updatedImage[index] = {
                ...updatedImage[index],
                [name]: files[0],
            };
            return {
                ...prevData,
                vLiveImage: updatedImage,
            };
        });
    };


    const handleSubmitForIndividual = async (e) => {
        e.preventDefault();
        // Ensure the arrays are initialized
        const vPhotoID = formDataForIndividual.vPhotoID || [];
        const vLiveImage = formDataForIndividual.vLiveImage || [];
        const vVisitorID = formDataForIndividual.vVisitorID || [];
        const data = new FormData();
        data.append("contactPersonName", formDataForIndividual.contactPersonName)
        data.append("purposeOfMeeting", formDataForIndividual.purposeOfMeeting)
        data.append("typeOfVisitor", "Individual")
        // data.append("visitors",formDataForIndividual.visitors)


        formDataForIndividual.visitors.map((visitor, index) => {
            data.append(`visitors[${index}][vAddress]`, visitor.vAddress)
            data.append(`visitors[${index}][vFirstName]`, visitor.vFirstName)
            data.append(`visitors[${index}][vLastName]`, visitor.vLastName)
            data.append(`visitors[${index}][vDateOfBirth]`, visitor.vDateOfBirth)
            data.append(`visitors[${index}][vContact]`, visitor.vContact)
            data.append(`visitors[${index}][vDepartment]`, visitor.vDepartment)
            data.append(`visitors[${index}][vDesignation]`, visitor.vDesignation)
            data.append(`visitors[${index}][vMailID]`, visitor.vMailID)
            data.append(`visitors[${index}][vPANCard]`, visitor.vPANCard)
        })

        // Append files using map function
        vPhotoID.map((photo, index) => {
            data.append(`vPhotoID`, photo.vPhotoID);
        });

        vLiveImage.map((photo, index) => {
            data.append(`vLiveImage`, photo.vLiveImage);
        });

        vVisitorID.map((photo, index) => {
            data.append(`vVisitorID`, photo.vVisitorID);
        });

        const token = localStorage.getItem("token")
        try {
            const res = await instance.post(`/api/visitor/visitor_request_meeting`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (res.status === 200) {
                toast.success("Successfully submitting the data")
                setFormDataForIndividual({
                    typeOfVisitor: "",
                    purposeOfMeeting: "",
                    contactPersonName: "",
                    visitors: [
                        {
                            vFirstName: "",
                            vLastName: "",
                            vDateOfBirth: "",
                            vDesignation: "",
                            vDepartment: "",
                            vPANCard: "",
                            vAddress: "",
                            vContact: "",
                            vMailID: ""
                        }
                    ],
                    vLiveImage: [],
                    vPhotoID: [],
                    vVisitorID: []
                })
                window.location.reload()
            }
        } catch (error) {
            toast.error("Error while Submitting the form");
            console.error(error);
        }
    }



    const handleOpenforIndividual = () => {
        setOpenForIndividual(!openforIndividual);
    }



    const initialValuesforCompany = {
        typeOfVisitor: "",
        vCompanyName: "",
        vCompanyAddress: "",
        vCompanyContact: "",
        vCompanyEmail: "",
        vCompanyGST: "",
        vCompanyIndustry: "",
        purposeOfMeeting: "",
        contactPersonName: "",
        visitors: [
            {
                vFirstName: "",
                vLastName: "",
                vDateOfBirth: "",
                vDesignation: "",
                vDepartment: ""
            }
        ],
        vLiveImage: [],
        vPhotoID: [],
        vVisitorID: []
    };


    const initialValuesforIndividual = {
        typeOfVisitor: "",
        purposeOfMeeting: "",
        contactPersonName: "",
        visitors: [
            {
                vFirstName: "",
                vLastName: "",
                vDateOfBirth: "",
                vDesignation: "",
                vDepartment: "",
                vPANCard: "",
                vAddress: "",
                vContact: "",
                vMailID: ""
            }
        ],
        vLiveImage: [],
        vPhotoID: [],
        vVisitorID: []
    };

    

    // for the Company
    const inputStyle = {
        width: '100%',
        padding: '0.2rem',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
    };

    // for the Individual
    const inputStyleForIndividual = {
        width: '100%',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
        fontSize: "0.8rem"
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://3.110.27.83:3000/api/employee/getEmployeeList`);//filter ? by company name
                if (res.status === 200) {
                    setEmployees(res.data);
                }
            } catch (error) {
                console.error('Error fetching employee list:', error);
            }
        }
        fetchData();
    }, [])


    const [selectfield, setSelect] = useState("Individual")

    const handleSelectVisitor = (value) => {

        if (value == "Company") {
            setFormDataForCompany(prevData => ({
                ...prevData,
                typeOfVisitor: value,
            }));
        }
        if (value == "Individual") {
            setFormDataForIndividual(prevData => ({
                ...prevData,
                typeOfVisitor: value,
            }));
        }
        setSelect(value)
        // here i also set the selected visitor
        if (value == "") {
            setCount(1)

            setFormDataForCompany({
                typeOfVisitor: "",
                vCompanyName: "",
                vCompanyAddress: "",
                vCompanyContact: "",
                vCompanyEmail: "",
                vCompanyGST: "",
                vCompanyIndustry: "",
                purposeOfMeeting: "",
                contactPersonName: "",
                visitors: [
                    {
                        vFirstName: "",
                        vLastName: "",
                        vDateOfBirth: "",
                        vDesignation: "",
                        vDepartment: ""
                    }
                ],
                vLiveImage: [],
                vPhotoID: [],
                vVisitorID: []
            })

            setFormDataForIndividual({
                typeOfVisitor: "",
                purposeOfMeeting: "",
                contactPersonName: "",
                visitors: [
                    {
                        vFirstName: "",
                        vLastName: "",
                        vDateOfBirth: "",
                        vDesignation: "",
                        vDepartment: "",
                        vPANCard: "",
                        vAddress: "",
                        vContact: "",
                        vMailID: ""
                    }
                ],
                vLiveImage: [],
                vPhotoID: [],
                vVisitorID: []
            })
        }
    }

    return (
        <>
            <div className="px-5 py-4 removepadding">
                <Breadcrumb />
            </div>
            <div className="max-w-screen-md mx-auto p-4 bg-white rounded-lg">
                {/* <img src="/assets/images/logo.png" width="40%" alt="Logo" className="mx-auto" /> */}
                <h1 className="text-center mb-6 text-2xl font-bold">Visitor Registration Form</h1>
                {/* {(selectfield == "") ? <div className="my-5 flex items-center">
                    <button
                        className="w-full mb-3 py-2 px-4 text-white rounded-l-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-pink-200" onClick={() => handleSelectVisitor("Individual")} style={{ backgroundColor: "black" }}
                    >
                        Individual
                    </button>
                    <button
                        className="w-full mb-3 py-2 px-4 bg-orange-500 text-white rounded-r-md hover:bg-orange-400 focus:outline-none focus:ring focus:ring-pink-200" onClick={() => handleSelectVisitor("Company")}
                        style={{ backgroundColor: "orange" }}
                    >
                        Company
                    </button>
                </div> : ""} */}

                <div className="buttons text-center">
                    <button
                        className={`bg-white  py-2 px-5 m-2 md:m-4 hover:text-black hover:border-2 hover:border-black duration-400 ${selectfield === 'Individual' ? 'text-black border-2 border-black' : 'text-gray-800 border-2 border-transparent'}  `}
                        onClick={() => handleSelectVisitor("Individual")}>
                        Individual
                    </button>
                    <button
                        className={`bg-white py-2 px-5 m-2 md:m-4 hover:text-black hover:border-2 hover:border-black duration-400 ${selectfield === 'Company' ? 'text-black border-2 border-black' : 'text-gray-800 border-2 border-transparent'}  `}
                        onClick={() => handleSelectVisitor("Company")}>
                        Company
                    </button>
                </div>

                {/* for the company */}
                {selectfield == "Company" ?
                    <>
                        <div className="my-5 flex items-center w-full justify-between">
                            <div>

                                <div className="flex justify-center">
                                    <input
                                        id="alreadyRegisteredCompany"
                                        type="checkbox"
                                        checked={alreadyRegisteredCompany}
                                        onChange={handleCheckboxChangeForCompany}
                                        className="w-[1.5em] h-[1.5em] mr-[0.5em]"
                                    />

                                    <label
                                        className="text-md font-medium text-gray-900 inline-block"
                                        htmlFor="alreadyRegisteredCompany"
                                    >
                                        Already Registered?
                                    </label>
                                </div>
                            </div>
                            {(selectfield == "Company" || selectfield == "Individual") && <button
                                className={`${button} mb-3 !bg-red-600 text-white rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:ring-pink-200`} onClick={() => handleSelectVisitor("")}

                            >
                                Back
                            </button>}
                        </div>
                        <Formik>
                            <Form onSubmit={handleSubmitForCompany} className="flex flex-col gap-4">

                                <div className="">
                                    <div className="">
                                        <label
                                            className="block font-medium text-gray-900 "
                                            htmlFor="vCompanyName"
                                        >
                                            Company Name
                                        </label>
                                        <span className="text-xs text-blue-700 font-semibold">Enter the Company Name.</span>
                                    </div>
                                    <Field
                                        type="text"
                                        id="vCompanyName"
                                        name="vCompanyName"
                                        placeholder="Company Name"
                                        style={inputStyle}
                                        onChange={handleInputChangeForCompany}
                                        value={formDataForCompany.vCompanyName}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <div>
                                        <label htmlFor="vCompanyAddress" className="block  font-medium">
                                            Company Address:
                                        </label>
                                        <span className="text-xs text-blue-700 font-semibold">Enter the Company Address.</span>
                                    </div>
                                    <Field
                                        type="text"
                                        id="vCompanyAddress"
                                        name="vCompanyAddress"
                                        placeholder="Company Address"
                                        style={inputStyle}
                                        onChange={handleInputChangeForCompany}
                                        value={formDataForCompany.vCompanyAddress}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <div>
                                        <label htmlFor="vCompanyContact" className="block  font-medium">
                                            Company Contact:
                                        </label>
                                        <span className="text-xs text-blue-700 font-semibold">Enter the Company Contact.</span>
                                    </div>
                                    <Field
                                        type="number"
                                        id="vCompanyContact"
                                        name="vCompanyContact"
                                        placeholder="Company Contact"
                                        style={inputStyle}
                                        onChange={handleInputChangeForCompany}
                                        value={formDataForCompany.vCompanyContact}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <div>
                                        <label htmlFor="vCompanyEmail" className="block  font-medium">
                                            Company Email:
                                        </label>
                                        <span className="text-xs text-blue-700 font-semibold">Enter the Company Email.</span>
                                    </div>
                                    <Field
                                        type="text"
                                        id="vCompanyEmail"
                                        name="vCompanyEmail"
                                        placeholder="Company Email"
                                        style={inputStyle}
                                        onChange={handleInputChangeForCompany}
                                        value={formDataForCompany.vCompanyEmail}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <div>
                                        <label htmlFor="vCompanyGST" className="block  font-medium">
                                            Company GST:
                                        </label>
                                        <span className="text-xs text-blue-700 font-semibold">Enter the Company GST:</span>
                                    </div>
                                    <Field
                                        type="text"
                                        id="vCompanyGST"
                                        name="vCompanyGST"
                                        placeholder="Company GST"
                                        style={inputStyle}
                                        onChange={handleInputChangeForCompany}
                                        value={formDataForCompany.vCompanyGST}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <div>
                                        <label htmlFor="vCompanyIndustry" className="block  font-medium">
                                            Company Industry:
                                        </label>
                                        <span className="text-xs text-blue-700 font-semibold">Enter the Company Industry.</span>
                                    </div>
                                    <Field
                                        type="text"
                                        id="vCompanyIndustry"
                                        name="vCompanyIndustry"
                                        placeholder="Company Industry"
                                        style={inputStyle}
                                        onChange={handleInputChangeForCompany}
                                        value={formDataForCompany.vCompanyIndustry}
                                        required
                                    />
                                </div>



                                <div className="">
                                    <div>
                                        <label htmlFor="contactPersonName" className="block  font-medium">
                                            Contact Person Name:
                                        </label>
                                        <span className="text-xs text-blue-700 font-semibold">Enter the Name of employee you want to make.</span>
                                    </div>

                                    <Field
                                        type="text"
                                        id="contactPersonName"
                                        placeholder="Contact Person Name"
                                        name="contactPersonName"
                                        style={inputStyle}
                                        onChange={handleInputChangeForCompany}
                                        value={formDataForCompany.contactPersonName}
                                        required
                                    />
                                </div>

                                <div className="">
                                    <div>
                                        <label htmlFor="purposeOfMeeting" className="block  font-medium">
                                            Purpose of visit:
                                        </label>
                                        <span className="text-xs text-blue-700 font-semibold">Please Explain the Agenda of Meeting.</span>
                                    </div>
                                    <Field
                                        as="textarea"
                                        id="purposeOfMeeting"
                                        placeholder="Purpose of Meeting"
                                        name="purposeOfMeeting"
                                        onChange={handleInputChangeForCompany}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid black',
                                            borderRadius: '0.375rem',
                                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                            outline: 'none',
                                            resize: 'vertical',
                                        }}
                                        value={formDataForCompany.purposeOfMeeting}
                                        rows={4}
                                        required
                                    />
                                </div>

                                {/* <button
                                    type="submit"
                                    className={`${button} mb-3 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200`}
                                    style={{ backgroundColor: "blue" }}
                                >
                                    Submit
                                </button> */}
                            </Form>
                        </Formik>
                    </> : ""}
                {(selectfield == "Company" && count <= 5) && (
                    <div className="flex items-center w-full justify-end mt-5">
                        <button
                            type="submit"
                            onClick={handleOpen}
                            className={`${button} flex items-center !bg-blue-600 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200`}

                        >
                            <span>Next</span> <GrNext />
                        </button>
                    </div>
                )}


                {/* for the Individual */}
                {selectfield == "Individual" ?
                    <>
                        <Formik>
                            <Form onSubmit={handleSubmitForIndividual} className="flex flex-col gap-4">
                                <div className="my-5 flex items-center w-full justify-between">
                                    <div>

                                        <div className="flex justify-center">
                                            <input
                                                id="alreadyRegisteredIndividual"
                                                type="checkbox"
                                                checked={alreadyRegisteredIndividual}
                                                onChange={handleCheckboxChangeForIndividual}
                                                className="w-[1.5em] h-[1.5em] mr-[0.5em]"
                                            />

                                            <label
                                                className="inline-block text-md font-medium text-gray-900"
                                                htmlFor="alreadyRegisteredIndividual"
                                            >
                                                Already Registered?
                                            </label>
                                        </div>
                                    </div>
                                    {(selectfield == "Company" || selectfield == "Individual") && <button
                                        className="mb-3 py-2 px-4 !bg-red-600 text-white rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:ring-pink-200" onClick={() => handleSelectVisitor("")}

                                    >
                                        Back
                                    </button>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="contactPersonName" className="block  font-medium">
                                            Contact Person Name:
                                        </label>
                                        <span className="text-xs text-blue-700 font-semibold">Enter the Name of employee you want to make.</span>
                                    </div>
                                    <Field
                                        type="text"
                                        id="contactPersonName"
                                        name="contactPersonName"
                                        placeholder="Contact Person Name"
                                        style={inputStyle}
                                        onChange={handleInputChangeForIndividual}
                                        value={formDataForIndividual.contactPersonName}
                                        required
                                    />

                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="purposeOfMeeting" className="block  font-medium">
                                            Purpose of visit:
                                        </label>
                                        <span className="text-xs text-blue-700 font-semibold">Please Explain the Agenda of Meeting.</span>
                                    </div>

                                    <Field
                                        as="textarea"
                                        id="purposeOfMeeting"
                                        name="purposeOfMeeting"
                                        placeholder="Purpose of Visit"
                                        onChange={handleInputChangeForIndividual}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid black',
                                            borderRadius: '0.375rem',
                                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                            outline: 'none',
                                            resize: 'vertical',
                                        }}
                                        value={formDataForIndividual.purposeOfMeeting}
                                        rows={4}
                                        required
                                    />
                                </div>


                                {/* <button
                                    type="submit"
                                    className="w-full mb-3 py-2 px-4 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                                    style={{ backgroundColor: "blue" }}
                                >
                                    Submit
                                </button> */}
                            </Form>
                        </Formik>
                    </> : ""}
                {(selectfield == "Individual" && count <= 5) && (
                    <div className="flex items-center w-full justify-end mt-5">
                        <button
                            type="submit"
                            onClick={handleOpenforIndividual}
                            className={`${button} flex items-center !bg-blue-600 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200`}

                        >
                            <span>Next</span> <GrNext />
                        </button>
                    </div>
                )}
            </div>


            {/* for the company */}

            {(selectfield == "Company" && count <= 5) && <Dialog size="xl" open={open} handler={handleOpen} className="bg-transparent shadow-none cardmodal overflow-y-auto">
                <form onSubmit={handleDialogSubmit}>
                    <Card className="relative p-2 lg:p-5 mx-auto w-full max-w-[24rem] lg:max-w-[30rem] xl:max-w-[35rem] rounded-md !bg-white">
                        <CardBody className="flex flex-col gap-4" >
                            <span className="absolute right-5 top-5 cursor-pointer" onClick={handleOpen}>
                                <IoMdClose />
                            </span>
                            <div className="">
                                <Typography className="text-center" variant="h6">Registration Detail {count}</Typography>

                                <div className=" px-2 flex flex-col gap-4 my-5">
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        name="vFirstName"
                                        id="vFirstName"
                                        placeholder="First Name"
                                        className=" p-2"
                                        style={inputStyle}
                                        onChange={(e) => handleVisitorChange(e, count - 1)}
                                        required
                                    />
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="vLastName"
                                        id="vLastName"
                                        placeholder="Last Name"
                                        className=" p-2"
                                        style={inputStyle}
                                        onChange={(e) => handleVisitorChange(e, count - 1)}
                                        required
                                    />
                                    <label>Designation</label>
                                    <input
                                        type="text"
                                        name="vDesignation"
                                        id="vDesignation"
                                        placeholder="Designation"
                                        className=" p-2"
                                        style={inputStyle}
                                        onChange={(e) => handleVisitorChange(e, count - 1)}
                                        required
                                    />
                                    <label>Date Of Birth:</label>
                                    <input
                                        type="date"
                                        name="vDateOfBirth"
                                        id="vDateOfBirth"
                                        placeholder="Date of Birth"
                                        className=" p-2"
                                        style={inputStyle}
                                        onChange={(e) => handleVisitorChange(e, count - 1)}
                                        required
                                    />
                                    <label>Department:</label>
                                    <input
                                        type="text"
                                        name="vDepartment"
                                        id="vDepartment"
                                        placeholder="Department"
                                        className=" p-2"
                                        style={inputStyle}
                                        onChange={(e) => handleVisitorChange(e, count - 1)}
                                        required
                                    />
                                    <label>
                                        Upload Photo:
                                    </label>
                                    <input
                                        id="vLiveImage"
                                        type="file"
                                        name="vLiveImage"
                                        className="p-2"
                                        style={inputStyle}
                                        onChange={(e) => handleFileChangeForCompanyLiveImage(e, count - 1)}
                                        required
                                    />
                                    <label>
                                        Upload Adhar Card :
                                    </label>
                                    <input
                                        id="vPhotoID"
                                        type="file"
                                        name="vPhotoID"
                                        className="p-2"
                                        style={inputStyle}
                                        onChange={(e) => handleFileChangeForCompanyphotoId(e, count - 1)}
                                        required
                                    />
                                    <label>
                                        Upload Visiting Card:
                                    </label>
                                    <input
                                        id="vVisitorID"
                                        name="vVisitorID"
                                        type="file"
                                        className="p-2"
                                        style={inputStyle}
                                        onChange={(e) => handleFileChangeForCompanyvisitorId(e, count - 1)}
                                        required
                                    />

                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className="flex gap-2">
                            <Button variant="gradient" className={`${button} !bg-green-600`}>
                                + Add Visitors
                            </Button>
                            <Button variant="gradient" type="submit" className={`${button} !bg-blue-600`}>
                                Submit
                            </Button>
                            {/* <Button variant="gradient" className={`${button} !bg-red-600`} onClick={handleOpen}>
                                Cancel
                            </Button> */}
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>}

            {(selectfield == "Company") &&
                <div className="flex justify-center">
                    <div className="flex justify-center flex-wrap gap-4 w-[80%]">
                        {formDataForCompany.visitors.length !== 0 && formDataForCompany.visitors.map((person, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold">{person.vFirstName} {person.vLastName}</h2>
                                <p className="text-gray-600">Designation: {person.vDesignation}</p>
                                <p className="text-gray-600">Date of Birth: {person.vDateOfBirth}</p>
                                <p className="text-gray-600">Department: {person.vDepartment}</p>
                            </div>
                        ))}
                    </div>
                </div>}

            {/* now for the individual start */}
            {/* {(selectfield == "Individual") && <Dialog size="xl" open={openforIndividual} handler={handleOpenforIndividual} className="pt-[0.2rem] bg-transparent shadow-none cardmodalForIndividual overflow-y-auto" style={{ width: `${!toggle ? "85%" : "100%"}`, float: `${!toggle ? "right" : ""}` }}> */}
            {(selectfield == "Individual") && <Dialog size="xl" open={openforIndividual} handler={handleOpenforIndividual} className=" bg-transparent shadow-none cardmodalForIndividual overflow-y-auto">
                <form onSubmit={handleDialogSubmitForIndividual}>
                    <Card className="relative p-2 lg:p-5 mx-auto w-full max-w-[24rem] lg:max-w-[30rem] xl:max-w-[35rem] rounded-md" style={{ backgroundColor: "white" }}>
                        <CardBody className="flex flex-col gap-4 my-5 h-full" >
                            <span className="absolute right-5 top-5 cursor-pointer" onClick={handleOpenforIndividual}>
                                <IoMdClose />
                            </span>
                            <div className="">
                                <Typography className="text-center" variant="h6">Registration Detail {count}</Typography>

                                <div className="px-2 flex flex-col gap-3">
                                    <label style={{ fontSize: "0.8rem" }}>First Name:</label>
                                    <input
                                        type="text"
                                        name="vFirstName"
                                        id="vFirstName"
                                        placeholder="First Name"
                                        className=" p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleVisitorChangeForIndividual(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }}>Last Name</label>
                                    <input
                                        type="text"
                                        name="vLastName"
                                        id="vLastName"
                                        placeholder="Last Name"
                                        className=" p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleVisitorChangeForIndividual(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }}>Designation</label>
                                    <input
                                        type="text"
                                        name="vDesignation"
                                        id="vDesignation"
                                        placeholder="Designation"
                                        className=" p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleVisitorChangeForIndividual(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }}>Date Of Birth:</label>
                                    <input
                                        type="date"
                                        name="vDateOfBirth"
                                        id="vDateOfBirth"
                                        placeholder="Date of Birth"
                                        className=" p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleVisitorChangeForIndividual(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }}>Department:</label>
                                    <input
                                        type="text"
                                        name="vDepartment"
                                        id="vDepartment"
                                        placeholder="Department"
                                        className=" p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleVisitorChangeForIndividual(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }}>PAN Card:</label>
                                    <input
                                        type="text"
                                        name="vPANCard"
                                        id="vPANCard"
                                        placeholder="PAN Card"
                                        className=" p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleVisitorChangeForIndividual(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }}>Address:</label>
                                    <input
                                        type="text"
                                        name="vAddress"
                                        id="vAddress"
                                        placeholder="Address"
                                        className=" p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleVisitorChangeForIndividual(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }} >Contact No:</label>
                                    <input
                                        type="number"
                                        name="vContact"
                                        id="vContact"
                                        placeholder="Contact No"
                                        className=" p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleVisitorChangeForIndividual(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }}>Mail ID:</label>
                                    <input
                                        type="email"
                                        name="vMailID"
                                        id="vMailID"
                                        placeholder="Mail ID"
                                        className=" p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleVisitorChangeForIndividual(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }}>
                                        Upload Photo:
                                    </label>
                                    <input
                                        id="vLiveImage"
                                        type="file"
                                        name="vLiveImage"
                                        className="p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleFileChangeForIndividualLiveImage(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }}>
                                        Upload Adhar Card :
                                    </label>
                                    <input
                                        id="vPhotoID"
                                        type="file"
                                        name="vPhotoID"
                                        className="p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleFileChangeForIndividualphotoId(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }}>
                                        Upload Visiting Card:
                                    </label>
                                    <input
                                        id="vVisitorID"
                                        name="vVisitorID"
                                        type="file"
                                        className="p-2"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleFileChangeForIndividualvisitorId(e, count - 1)}
                                        required
                                    />

                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className="flex gap-2">
                            <Button variant="gradient" className={`${button} !bg-green-500`}>
                                + Add Visitors
                            </Button>
                            <Button variant="gradient" type="submit" className={`${button} !bg-blue-600`}>
                                Submit
                            </Button>
                            {/* <Button variant="gradient" className={`${button} !bg-red-500`} onClick={handleOpenforIndividual}>
                                Cancel
                            </Button> */}
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>}

            {(selectfield == "Individual" && count <= 5) &&
                <div className="flex justify-center">
                    <div className="flex justify-center flex-wrap gap-4 w-[80%]">
                        {formDataForIndividual.visitors.length !== 0 && formDataForIndividual.visitors.map((person, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold">{person.vFirstName} {person.vLastName}</h2>
                                <p className="text-gray-600">Designation: {person.vDesignation}</p>
                                <p className="text-gray-600">Date of Birth: {person.vDateOfBirth}</p>
                                <p className="text-gray-600">Department: {person.vDepartment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }


        </>
    );
}

export default VisitorReg;