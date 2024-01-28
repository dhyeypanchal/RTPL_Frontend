import { Formik, Form } from "formik";
import { LoginValidationSchema } from "../validations/auth/LoginValidation";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../css/login.css'



function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const defaultInitialValues = {
        email: "",
        password: "",
    };

    const handleSubmit = (e) => {
        navigate("/login")
    }
    return (
        <div className="flex justify-center items-center w-screen h-screen reslogin">
            <div>
                <h1 className="text-5xl mb-4 login text-center">Reset Your Password</h1>
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
                                    <div className="">
                                        <div className="text-left text-gray-400 text-md">
                                            <label htmlFor="password" className='text-left'>New Password</label>
                                        </div>
                                        <div className="text-left">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                label="Password"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                className="text-lg border-[2px] rounded-md p-1.5 w-full"
                                            />
                                            <div
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="relative cursor-pointer"
                                                style={{ right: "-90%", bottom: "2.1rem", width: "1.3rem" }}
                                            >
                                                {showPassword ? <i className="fa-regular fa-eye text-gray-400"></i> : <i className="fa-regular fa-eye-slash text-gray-400"></i>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="forgot-pass text-right mb-5">
                                        <Link
                                            to="/forgot-password"
                                            className="text-orange-600 font-semibold inline-block"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full mt-2 text-lg border-0 submit p-1 rounded-md text-white" style={{ outline: "none" }}>
                                        Reset Password
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

export default ResetPassword;
