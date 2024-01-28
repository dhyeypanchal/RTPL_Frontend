import { Formik, Form } from "formik";
import { LoginValidationSchema } from "../validations/auth/LoginValidation";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../css/login.css'



function ForgotPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const defaultInitialValues = {
        email: "",
        password: "",
    };

    const handleSubmit = (e) => {
        navigate("/reset-password")
    }
    return (
        <div className="flex justify-center items-center w-screen h-screen reslogin">
            <div>
                <h1 className="text-5xl mb-4 login text-center">Enter Email for Generating New Password</h1>
                <div className="flex justify-center items-center w-full h-full responsive">
                    <div className="m-3 resmargin">
                        <img className="w-full h-full object-contain" src="/assets/images/loginimg.jpg" alt="login" />
                    </div>
                    <div className="w-1/2 m-3 reswidth">
                        <Formik
                            initialValues={defaultInitialValues}
                            validationSchema={LoginValidationSchema()}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form className="w-full" onSubmit={handleSubmit}>
                                    <div className=" mb-3">
                                        <div className="text-left text-gray-400 text-md">
                                            <label htmlFor="email" className='text-left'>Email</label>
                                        </div>
                                        <div className="text-left">
                                            <input
                                                type={"text"}
                                                name="email"
                                                id="email"
                                                placeholder="Enter Your Email"
                                                className=' text-lg border-[2px] rounded-md p-1.5 w-full'
                                            />
                                        </div>
                                    </div>

                                    <div className="forgot-pass mt-10px text-right mb-5">
                                        <Link
                                            to="/login"
                                            className="text-orange-600 font-semibold inline-block"
                                        >
                                            Back to Login
                                        </Link>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-lg border-0 submit p-1 rounded-md text-white" style={{ outline: "none" }}>
                                        Submit
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
