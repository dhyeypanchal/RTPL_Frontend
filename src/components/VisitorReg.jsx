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

const VisitorReg = () => {
    const { toggle } = useUserInfo()


    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedID, setSelectedID] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

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

    console.log(count);

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


    // for general
    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            const inputPhoneNumber = prompt('Please enter your phone number:');
            setPhoneNumber(inputPhoneNumber);
        }
        setAlreadyRegistered(e.target.checked);
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

    const handleFileChangeForCompanyphotoId = (e,index) => {
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
    const handleFileChangeForCompanyvisitorId = (e,index) => {
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
    const handleFileChangeForCompanyLiveImage = (e,index) => {
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


    const handleSubmitForCompany=async(e)=>{
        e.preventDefault();

        const data = new FormData();
        data.append("contactPersonName",formDataForCompany.contactPersonName)
        data.append("purposeOfMeeting",formDataForCompany.purposeOfMeeting)
        data.append("typeOfVisitor","Company")
        data.append("vCompanyAddress",formDataForCompany.vCompanyAddress)
        data.append("vCompanyContact",formDataForCompany.vCompanyContact)
        data.append("vCompanyEmail",formDataForCompany.vCompanyEmail)
        data.append("vCompanyGST",formDataForCompany.vCompanyGST)
        data.append("vCompanyIndustry",formDataForCompany.vCompanyIndustry)
        data.append("vCompanyName",formDataForCompany.vCompanyName)
        // data.append("vLiveImage",formDataForCompany.vLiveImage)
        // data.append("vPhotoID",formDataForCompany.vPhotoID)
        // data.append("vVisitorID",formDataForCompany.vVisitorID)
        // data.append("visitors",formDataForCompany.visitors)

        // console.log(formDataForCompany.visitors);

        formDataForCompany.visitors.map((visitor, index) => {
            console.log(visitor);
            data.append(`visitors[${index}][vFirstName]`, visitor.vFirstName)
            data.append(`visitors[${index}][vLastName]`, visitor.vLastName)
            data.append(`visitors[${index}][vDateOfBirth]`, visitor.vDateOfBirth)
            data.append(`visitors[${index}][vDesignation]`, visitor.vDesignation)
            data.append(`visitors[${index}][vDepartment]`, visitor.vDepartment)
        })

        formDataForCompany.vPhotoID.map((photo,index)=>{
            data.append("vPhotoID",photo.vPhotoID)
        })
        formDataForCompany.vLiveImage.map((photo,index)=>{
            data.append("vLiveImage", photo.vLiveImage)
        })
        formDataForCompany.vVisitorID.map((photo,index)=>{
            data.append("vVisitorID",photo.vVisitorID)
        })
        console.log(data.get('visitors[0].vFirstName'));
        console.log(data.get('vLiveImage'));

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
            console.log(res.data);
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

    const handleFileChangeForIndividualphotoId = (e,index) => {
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
    const handleFileChangeForIndividualvisitorId = (e,index) => {
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
    const handleFileChangeForIndividualLiveImage = (e,index) => {
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


    const handleSubmitForIndividual=async(e)=>{
        e.preventDefault();
        // Ensure the arrays are initialized
        const vPhotoID = formDataForIndividual.vPhotoID || [];
        const vLiveImage = formDataForIndividual.vLiveImage || [];
        const vVisitorID = formDataForIndividual.vVisitorID || [];
        const data = new FormData();
        data.append("contactPersonName",formDataForIndividual.contactPersonName)
        data.append("purposeOfMeeting",formDataForIndividual.purposeOfMeeting)
        data.append("typeOfVisitor","Individual")
        // data.append("visitors",formDataForIndividual.visitors)


        formDataForIndividual.visitors.map((visitor, index) => {
            console.log(visitor);
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
        console.log(formDataForIndividual);

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
            console.log(res.data);
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
        padding: '0.01rem',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
        fontSize:"0.8rem"
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

    const [selectfield,setSelect]=useState("")

    const handleSelectVisitor = (value)=>{

        if (value=="Company") {    
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
        if (value=="") {
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

    console.log(formDataForIndividual.typeOfVisitor);

    return (
        <>
            <div className="px-5 py-4 removepadding">
                <Breadcrumb />
            </div>
            <div className="max-w-lg mx-auto p-4 bg-white rounded-lg">
                {/* <img src="/assets/images/logo.png" width="40%" alt="Logo" className="mx-auto" /> */}
                <h1 className="text-center mb-6 text-2xl font-bold">Visitor Registration Form</h1>
                <div className="my-5 flex items-center w-full justify-between">
                <div>

                    <div className="flex justify-center">
                    <input
                        id="alreadyRegistered"
                        type="checkbox"
                        checked={alreadyRegistered}
                        onChange={handleCheckboxChange}
                        style={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }}
                    />

                    <label
                        className="block text-md font-medium text-gray-900 dark:text-white"
                        htmlFor="alreadyRegistered"
                        style={{ display: 'inline-block' }}
                    >
                        Already Registered?
                    </label>
                    </div>
                </div>
                    {(selectfield=="Company" || selectfield=="Individual")&&<button
                        className=" mb-3 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:ring-pink-200" onClick={() => handleSelectVisitor("")}
                        style={{ backgroundColor: "red" }}
                    >
                        Back
                    </button>}
                </div>
                {(selectfield=="")?<div className="my-5 flex items-center">
                    <button
                        className="w-full mb-3 py-2 px-4 text-white rounded-l-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-pink-200" onClick={()=>handleSelectVisitor("Individual")} style={{backgroundColor:"black"}}
                    >
                        Individual
                    </button>
                    <button
                        className="w-full mb-3 py-2 px-4 bg-orange-500 text-white rounded-r-md hover:bg-orange-400 focus:outline-none focus:ring focus:ring-pink-200" onClick={()=>handleSelectVisitor("Company")}
                        style={{backgroundColor:"orange"}}
                    >
                        Company
                    </button>
                </div>:""}

                {/* for the company */}
                {selectfield =="Company" ?
                <Formik>
                    <Form onSubmit={handleSubmitForCompany}>

                        <div className="mb-4">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="vCompanyName"
                            >
                                Company Name
                            </label>
                            <Field
                                type="text"
                                id="vCompanyName"
                                name="vCompanyName"
                                style={inputStyle}
                                onChange={handleInputChangeForCompany}
                                value={formDataForCompany.vCompanyName}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vCompanyAddress" className="block mb-1 font-medium">
                                Company Address:
                            </label>
                            <Field
                                type="text"
                                id="vCompanyAddress"
                                name="vCompanyAddress"
                                style={inputStyle}
                                onChange={handleInputChangeForCompany}
                                    value={formDataForCompany.vCompanyAddress}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vCompanyContact" className="block mb-1 font-medium">
                                Company Contact:
                            </label>
                            <Field
                                type="number"
                                id="vCompanyContact"
                                name="vCompanyContact"
                                style={inputStyle}
                                onChange={handleInputChangeForCompany}
                                    value={formDataForCompany.vCompanyContact}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vCompanyEmail" className="block mb-1 font-medium">
                                Company Email:
                            </label>
                            <Field
                                type="text"
                                id="vCompanyEmail"
                                name="vCompanyEmail"
                                style={inputStyle}
                                onChange={handleInputChangeForCompany}
                                    value={formDataForCompany.vCompanyEmail}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vCompanyGST" className="block mb-1 font-medium">
                                Company GST:
                            </label>
                            <Field
                                type="text"
                                id="vCompanyGST"
                                name="vCompanyGST"
                                style={inputStyle}
                                onChange={handleInputChangeForCompany}
                                    value={formDataForCompany.vCompanyGST}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vCompanyIndustry" className="block mb-1 font-medium">
                                Company Industry:
                            </label>
                            <Field
                                type="text"
                                id="vCompanyIndustry"
                                name="vCompanyIndustry"
                                style={inputStyle}
                                onChange={handleInputChangeForCompany}
                                    value={formDataForCompany.vCompanyIndustry}
                                required
                            />
                        </div>



                        <div className="mb-4">
                            <label htmlFor="contactPersonName" className="block mb-1 font-medium">
                                Contact Person Name:
                            </label>
                            <Field
                                type="text"
                                id="contactPersonName"
                                name="contactPersonName"
                                style={inputStyle}
                                onChange={handleInputChangeForCompany}
                                    value={formDataForCompany.contactPersonName}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="purposeOfMeeting" className="block mb-1 font-medium">
                                Purpose of visit:
                            </label>
                            <Field
                                as="textarea"
                                id="purposeOfMeeting"
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





                        {/* <div className="my-5">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="vLiveImage"
                            >
                                Upload Photo:
                            </label>
                            <input
                                id="vLiveImage"
                                type="file"
                                name="vLiveImage"
                                style={inputStyle}
                                onChange={handleFileChangeForCompany}
                            />
                        </div>

                        <div className="my-5">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="vPhotoID"
                            >
                                Upload ID Proof:
                            </label>
                            <input
                                id="vPhotoID"
                                type="file"
                                name="vPhotoID"
                                style={inputStyle}
                                onChange={handleFileChangeForCompany}
                            />
                        </div>

                        <div className="my-5">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="vVisitorID"
                            >
                                Upload Visiting Card:
                            </label>
                            <input
                                id="vVisitorID"
                                name="vVisitorID"
                                type="file"
                                style={inputStyle}
                                onChange={handleFileChangeForCompany}
                            />
                        </div> */}

                        <button
                            type="submit"
                            className="w-full mb-3 py-2 px-4 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                            style={{backgroundColor:"blue"}}
                        >
                            Submit
                        </button>
                    </Form>
                </Formik>:""}
                {(selectfield=="Company" && count <= 5) && (
                    <button
                        type="submit"
                        onClick={handleOpen}
                        className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                        style={{backgroundColor:"red"}}
                    >
                        + Add Visitors
                    </button>
                )}


                {/* for the Individual */}
                {selectfield == "Individual" ?
                    <Formik>
                        <Form onSubmit={handleSubmitForIndividual}>


                            <div className="mb-4">
                                <label htmlFor="contactPersonName" className="block mb-1 font-medium">
                                    Contact Person Name:
                                </label>
                                <Field
                                    type="text"
                                    id="contactPersonName"
                                    name="contactPersonName"
                                    style={inputStyle}
                                    onChange={handleInputChangeForIndividual}
                                    value={formDataForIndividual.contactPersonName}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="purposeOfMeeting" className="block mb-1 font-medium">
                                    Purpose of visit:
                                </label>
                                <Field
                                    as="textarea"
                                    id="purposeOfMeeting"
                                    name="purposeOfMeeting"
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


                            <button
                                type="submit"
                                className="w-full mb-3 py-2 px-4 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                                style={{ backgroundColor: "blue" }}
                            >
                                Submit
                            </button>
                        </Form>
                    </Formik> : ""}
                {(selectfield == "Individual" && count <= 5) && (
                    <button
                        type="submit"
                        onClick={handleOpenforIndividual}
                        className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                        style={{ backgroundColor: "red" }}
                    >
                        + Add Visitors
                    </button>
                )}
            </div>


            {/* for the company */}

            {(selectfield == "Company" && count <= 5) && <Dialog size="xs" open={open} handler={handleOpen} className="mt-[9vh] pt-[1rem] bg-transparent shadow-none cardmodal" style={{ width: `${!toggle ? "85%" : "100%"}`, float: `${!toggle ? "right" : ""}` }}>
                <form onSubmit={ handleDialogSubmit}>
                <Card className="mx-auto w-full max-w-[24rem] rounded-md" style={{backgroundColor:"white"}}>
                    <CardBody className="flex flex-col gap-4" >
                        <div className="">
                            <Typography className="text-center" variant="h6">Person {count}</Typography>

                            <div className="mb-4 px-2">
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    name="vFirstName"
                                    id="vFirstName"
                                    placeholder="First Name"
                                    className="mb-2"
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
                                    className="mb-2"
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
                                    className="mb-2"
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
                                    className="mb-2"
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
                                    className="mb-2"
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
                                    style={inputStyle}
                                    onChange={(e) => handleFileChangeForCompanyLiveImage(e,count -1)}
                                    required
                                />
                                <label>
                                    Upload ID Proof:
                                </label>
                                <input
                                    id="vPhotoID"
                                    type="file"
                                    name="vPhotoID"
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
                                    style={inputStyle}
                                    onChange={(e) => handleFileChangeForCompanyvisitorId(e, count - 1)}
                                    required
                                />

                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0 p-[0.5rem]">
                        <Button variant="gradient" type="submit" className="p-[0.2rem]" style={{ backgroundColor: "blue" }} fullWidth>
                            Submit
                        </Button>
                        <Button variant="gradient" className="mt-2 p-[0.2rem]" style={{ backgroundColor: "red" }} fullWidth onClick={handleOpen}>
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
                            </form>
            </Dialog>}

            {(selectfield == "Company") &&
            <div className="flex flex-wrap gap-4">
                {formDataForCompany.visitors.length!==0 && formDataForCompany.visitors.map((person, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{person.vFirstName} {person.vLastName}</h2>
                        <p className="text-gray-600">Designation: {person.vDesignation}</p>
                        <p className="text-gray-600">Date of Birth: {person.vDateOfBirth}</p>
                        <p className="text-gray-600">Department: {person.vDepartment}</p>
                    </div>
                ))}
            </div>}


            {/* now for the individual start */}
            {(selectfield == "Individual") && <Dialog size="xs" open={openforIndividual} handler={handleOpenforIndividual} className="pt-[0.2rem] bg-transparent shadow-none cardmodalForIndividual overflow-y-auto" style={{ width: `${!toggle ? "85%" : "100%"}`, float: `${!toggle ? "right" : ""}` }}>
                <form onSubmit={handleDialogSubmitForIndividual}>
                    <Card className="mx-auto w-full max-w-[24rem] rounded-md" style={{ backgroundColor: "white" }}>
                        <CardBody className="flex flex-col gap-4" >
                            <div className="">
                                <Typography className="text-center" variant="h6">Person {count}</Typography>

                                <div className="mb-2 px-2">
                                    <label style={{ fontSize: "0.8rem" }}>First Name:</label>
                                    <input
                                        type="text"
                                        name="vFirstName"
                                        id="vFirstName"
                                        placeholder="First Name"
                                        className="mb-1"
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
                                        className="mb-1"
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
                                        className="mb-1"
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
                                        className="mb-1"
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
                                        className="mb-1"
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
                                        className="mb-1"
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
                                        className="mb-1"
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
                                        className="mb-1"
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleVisitorChangeForIndividual(e, count - 1)}
                                        required
                                    />
                                    <label style={{fontSize:"0.8rem"}}>Mail ID:</label>
                                    <input
                                        type="email"
                                        name="vMailID"
                                        id="vMailID"
                                        placeholder="Mail ID"
                                        className="mb-1"
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
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleFileChangeForIndividualLiveImage(e, count - 1)}
                                        required
                                    />
                                    <label style={{ fontSize: "0.8rem" }}>
                                        Upload ID Proof:
                                    </label>
                                    <input
                                        id="vPhotoID"
                                        type="file"
                                        name="vPhotoID"
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
                                        style={inputStyleForIndividual}
                                        onChange={(e) => handleFileChangeForIndividualvisitorId(e, count - 1)}
                                        required
                                    />

                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0 p-[0.3rem]">
                            <Button variant="gradient" type="submit" className="p-[0.1rem]" style={{ backgroundColor: "blue" }} fullWidth>
                                Submit
                            </Button>
                            <Button variant="gradient" className="mt-1 p-[0.1rem]" style={{ backgroundColor: "red" }} fullWidth onClick={handleOpenforIndividual}>
                                Cancel
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>}

            {(selectfield == "Individual" && count <= 5) &&
                <div className="flex flex-wrap gap-4">
                    {formDataForIndividual.visitors.length !== 0 && formDataForIndividual.visitors.map((person, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{person.vFirstName} {person.vLastName}</h2>
                            <p className="text-gray-600">Designation: {person.vDesignation}</p>
                            <p className="text-gray-600">Date of Birth: {person.vDateOfBirth}</p>
                            <p className="text-gray-600">Department: {person.vDepartment}</p>
                        </div>
                    ))}
                </div>}

            
        </>
    );
}

export default VisitorReg;