import { Formik, Form } from "formik";
import { LoginValidationSchema } from "../validations/auth/LoginValidation";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../css/login.css'
import { toast } from "react-toastify";
import instance from "../utils/axios";



function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const [logValue, setLogValue] = useState({
    email: "",
    password: "",
    emp_code:"QWERTY"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post("/api/auth/login", {
        email: logValue.email,
        password: logValue.password,
        emp_code: logValue.emp_code
      });
      console.log(response.data.employeeDetails);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("permissions", response.data.employeeDetails.permissions);
      toast.success("Successfully Login");
      e.preventDefault();
      navigate("/admin/users/requests");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen reslogin">
      <div>
        <h1 className="text-5xl mb-4 login text-center">Login to Rise and Glow Portal</h1>
        <div className="flex justify-center items-center w-full h-full responsive">
          <div className="m-3 resmargin">
            <img className="w-full h-full object-contain" src="/assets/images/loginimg.jpg" alt="login" />
          </div>
          <div className="w-1/2 m-3 reswidth">
            <Formik
              initialValues={logValue}
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-left text-gray-400 text-md">
                      <label htmlFor="password" className='text-left'>Password</label>
                    </div>
                    <div className="text-left">
                      <input
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="text-lg border-[2px] rounded-md p-1.5 w-full"
                        onChange={handleChange}
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

                  <div className="forgot-pass mt-10px text-right mb-5">
                    <Link
                      to="/forgot-password"
                      className="text-orange-600 font-semibold inline-block"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-lg border-0 submit p-1 rounded-md text-white" style={{ outline: "none" }}>
                    Login
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

export default Login
