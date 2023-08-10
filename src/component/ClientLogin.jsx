import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "../App";
import Spinner from "./common-component/Spinner";
const ClientLogin = () => {
  const navigate = useNavigate();
  const [password, showPassword] = useState(false);
  const showpassword = () => [showPassword(!password)];
  // const { setSpinner, spinner } = useContext(GlobalContext);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usernameEmail: "",
      password: "",
    },
  });
  // ====== login api
  const login = async (data, e) => {
    // setSpinner(true)
    e.preventDefault();
    try {
      const response = await fetch(
        ` ${process.env.REACT_APP_BASE_URL}/api/login`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (response?.status === 200) {
        let data = await response.json();
        localStorage.setItem("Token", data?.data?.auth_token);
        localStorage.setItem("userData", JSON.stringify(data?.data));
        toast.success("Login successful");
        // window.location.reload()
        // navigate("/overview");
        window.location.href = "/";
        // setSpinner(false);
      } else {
        const data = await response.json();
        toast.error(data?.message, {
          autoClose: 5000,
        });
      }
      // setSpinner(false);
    } catch (error) {
      // setSpinner(false);
      console.error("Error while logging in:", error);
    }
    // If rememberMe is checked, store the user's credentials in local storage
    if (rememberMe) {
      localStorage.setItem("rememberedUser", JSON.stringify(data));
    } else {
      // If rememberMe is not checked, remove any previously stored credentials
      localStorage.removeItem("rememberedUser");
    }
  };
  return (
    <>
      {/* {spinner && <Spinner />} */}
      <div className='account-pages mt-5 mb-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6 col-xl-4'>
              <div className='card bg-pattern'>
                <div className='card-body p-4'>
                  <div className='text-center w-75 m-auto'>
                    <div className='auth-logo'>
                      <Link to='/' className='logo logo-dark text-center'>
                        <span className='logo-lg'>
                          <img
                            src='/assets/images/dark-logo.png'
                            alt=''
                            height='70'
                          />
                        </span>
                      </Link>
                      <Link to='/' className='logo logo-light text-center'>
                        <span className='logo-lg'>
                          <img
                            src='/assets/images/dark-logo.png'
                            alt=''
                            height='70'
                          />
                        </span>
                      </Link>
                    </div>
                    <p className='text-muted mb-2'>&nbsp;</p>
                  </div>
                  <form className='form' onSubmit={handleSubmit(login)}>
                    <div className='mb-3'>
                      <label for='emailaddress' className='form-label'>
                        Email address
                      </label>
                      <input
                        type='email'
                        className='input_control form-control'
                        {...register("usernameEmail", { required: true })}
                        placeholder='Enter your email'
                      />
                      {errors.usernameEmail?.type === "required" && (
                        <p role='alert' className='alert-msg text-danger'>
                          Email is required
                        </p>
                      )}
                    </div>
                    <div className='mb-3'>
                      <label for='password' className='form-label'>
                        Password
                      </label>
                      <div className='input-group input-group-merge'>
                        <input
                          type={password ? "text" : "password"}
                          className='form-control input_control '
                          {...register("password")}
                          placeholder='Enter Password'
                        />
                      </div>
                    </div>
                    <div className='mb-3'>
                      <div className='form-check'>
                        <input
                          type='checkbox'
                          className='form-check-input'
                          id='checkbox-signin'
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label
                          className='form-check-label'
                          for='checkbox-signin'>
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className='text-center d-grid'>
                      <button type='submit' className='btn btn-primary'>
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col-12 text-center'>
                  <p>
                    {" "}
                    <Link to='' className='text-white-50 ms-1'>
                      Forgot your password?
                    </Link>
                  </p>
                  <p className='text-white-50'>
                    Don't have an account?{" "}
                    <Link to='' className='text-white ms-1'>
                      <b>Sign Up</b>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientLogin;
