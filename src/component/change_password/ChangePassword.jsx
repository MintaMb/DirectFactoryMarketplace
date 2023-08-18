import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "../../App";
import viewPassword from "../../assets/images/view.svg"; //pass icon
import heidePassword from "../../assets/images/hide-pass.svg"; //pass icon

const ChangePassword = () => {
  const { spinner, setSpinner } = useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  // hide show old
  const [hidepassword, showPassword] = useState(false);
  const showpassword = () => [showPassword(!hidepassword)];
  // hide show new
  const [hideNewPassword, showNewPassword] = useState(false);
  const showHideNewPassword = () => [showNewPassword(!hideNewPassword)];
  // hide show confirm
  //   const [hideConfPassword, showConfPassword] = useState(false);
  //   const showHideConfPassword = () => [showConfPassword(!hideConfPassword)];
  const onSubmit = async (data) => {
    setSpinner(true);
    try {
      const requestData = {
        old_password: data?.old_password,
        new_password: data?.new_password,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify(requestData),
      };

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/update_password`,
        requestOptions
      );

      if (response?.status === 200) {
        setSpinner(false);
        toast.success("Password changed please log in again");
        localStorage.clear();
        navigate("/");
      } else {
        const responseData = await response.json();
        toast.error(responseData?.message);
        setSpinner(false);
      }
    } catch (error) {
      console.error("Error while updating password:", error);
      setSpinner(false);
    }
  };
  const new_password = watch("new_password");
  const password_confirmation = watch("password_confirmation");
  const passwordMatch = new_password === password_confirmation;

  const validatePassword = (value) => {
    const trimmedValue = value?.trim();
    if (trimmedValue?.length === 0) {
      return "New Password is required";
    } else if (trimmedValue?.length < 6) {
      return "New Password should be at least 6 characters long";
    }
    return true;
  };

  return (
    <>
      <div id='wrapper'>
        <div className='content-page'>
          <div className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12'>
                  <div className='page-title-box'>
                    <h4 className='page-title'>Change Password</h4>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                  <div className='col-lg-7 mx-auto'>
                    <div class='card'>
                      <div class='card-body'>
                        <h4 class='page-title'>Change Password</h4>
                        <hr class='mb-2' />
                        <div class='row'>
                          <div class='col-lg-12 mb-2 position-relative'>
                            <label>Old Password</label>
                            <input
                              type={hidepassword ? "text" : "password"}
                              {...register("old_password", {
                                required: true,
                                validate: (value) =>
                                  value.trim().length > 0 ||
                                  "Old Password is required",
                              })}
                              class='form-control'
                              placeholder='Enter Old Password'
                              autocomplete='old_password'
                            />
                            <div
                              className='form-group-append '
                              onClick={showpassword}>
                              {hidepassword ? (
                                <img src={viewPassword} alt='view eye' />
                              ) : (
                                <img src={heidePassword} alt='eye' />
                              )}
                            </div>
                            {watch("old_password")?.length < 6 &&
                              watch("old_password")?.length >= 1 && (
                                <p className='alert-msg text-danger'>
                                  Password should be at least 6 characters
                                </p>
                              )}
                          </div>
                          <div class='col-lg-12 mb-2 position-relative'>
                            <label>New Password</label>
                            <input
                              type={hideNewPassword ? "text" : "password"}
                              {...register("new_password", {
                                required: true,
                                validate: validatePassword,
                              })}
                              class='form-control'
                              placeholder='Enter New Password'
                              autocomplete='new_password'
                            />
                            <div
                              className='form-group-append '
                              onClick={showHideNewPassword}>
                              {hideNewPassword ? (
                                <img src={viewPassword} alt='view eye' />
                              ) : (
                                <img src={heidePassword} alt='eye' />
                              )}
                            </div>
                            {errors.new_password &&
                              errors.new_password.message && (
                                <p className='alert-msg text-danger'>
                                  {errors.new_password.message}
                                </p>
                              )}
                          </div>
                          {/* <div class='col-lg-12 mb-2 position-relative'>
                            <label>Confirm Password</label>
                            <input
                              type={hideConfPassword ? "text" : "password"}
                              {...register("password_confirmation", {
                                required: true,
                                validate: (value) =>
                                  value?.trim() === new_password?.trim() ||
                                  "Passwords do not match",
                              })}
                              class='form-control'
                              placeholder='Enter Confirm Password'
                            />
                            <div
                              className='form-group-append '
                              onClick={showHideConfPassword}>
                              {hideConfPassword ? (
                                <img src={viewPassword} alt='view eye' />
                              ) : (
                                <img src={heidePassword} alt='eye' />
                              )}
                            </div>
                            {errors.password_confirmation &&
                              errors.password_confirmation.message && (
                                <p className='alert-msg text-danger'>
                                  {errors.password_confirmation.message}
                                </p>
                              )}
                          </div> */}
                          <div class='col-lg-12 mb-2 text-center'>
                            <button class='btn btn-primary'>Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
