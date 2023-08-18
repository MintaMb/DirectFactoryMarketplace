import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "../../App";
import Spinner from "../common-component/Spinner";

const Profile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [userData, setUserData] = useState({});
  const { spinner, setSpinner } = useContext(GlobalContext);

  const userForm = async (data) => {
    setSpinner(true);
    try {
      const formattedData = {
        first_name: data.first_name,
        email: data.email,
        phone: data.phone,
      };

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/update_profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          method: "POST",
          body: JSON.stringify(formattedData),
        }
      );

      if (response?.status === 200) {
        // Handle success
        let data = await response.json();
        localStorage.setItem("Token", data?.data?.auth_token);
        localStorage.setItem("userData", JSON.stringify(data?.data));
        window.location.reload();
        toast.success("Profile Updated successfully");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setSpinner(false);
  };
  useEffect(() => {
    // Fetch prefilled user data from local storage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
      // Prefill form fields with stored user data
      setValue("first_name", storedUserData.first_name);
      setValue("email", storedUserData.email);
      setValue("phone", storedUserData.phone);
    }
  }, [setValue]);
  return (
    <>
      {spinner && <Spinner />}
      <div id='wrapper'>
        <div className='content-page'>
          <div className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12'>
                  <div className='page-title-box'>
                    <h4 className='page-title'>Profile</h4>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-7 mx-auto'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='page-title'>My Profile</h4>
                      <hr className='mb-2' />
                      <form
                        className='px-3 row'
                        onSubmit={handleSubmit(userForm)}>
                        <div className='row'>
                          <div className='col-lg-12 mb-2'>
                            <label>Name</label>

                            <input
                              className='form-control'
                              {...register("first_name")}
                              type='name'
                              id='name'
                              required=''
                              placeholder='Enter Name..'
                            />
                          </div>
                          <div className='col-lg-12 mb-2'>
                            <label>Mobile Number</label>
                            <input
                              className='form-control'
                              type='mobile_number'
                              maxLength={15}
                              {...register("phone")}
                              required=''
                              onKeyPress={(offer) => {
                                if (!/[0-9]/.test(offer.key)) {
                                  offer.preventDefault();
                                }
                              }}
                              id='mobile_number'
                              placeholder='Enter Mobile Number..'
                            />
                          </div>
                          <div className='col-lg-12 mb-2'>
                            <label>Email ID</label>

                            <input
                              className='form-control'
                              type='email'
                              {...register("email")}
                              id='email'
                              required=''
                              placeholder='Enter Email Address..'
                            />
                          </div>
                          <div className='col-lg-12 mb-2 text-center'>
                            <button className='btn btn-primary'>
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
