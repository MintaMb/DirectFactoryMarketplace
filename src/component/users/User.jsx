import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../common-component/Spinner";
import { GlobalContext } from "../../App";
import { toast } from "react-toastify";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import { useForm } from "react-hook-form";

const User = () => {
  const [userData, setUserData] = useState([]);
  // const id = useParams();
  const navigate = useNavigate();
  const [postModal, setPostModal] = useState(false);
  const { setSpinner, spinner } = useContext(GlobalContext);
  const [deleteShow, setDShow] = useState(false);
  // modal show/Hide  functions
  const [modalShow, setShowModal] = useState(false);
  const showModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };
  const permissions = [
    { name: "Inventory", value: "inventory" },
    { name: "Order", value: "order" },
    { name: "Message", value: "message" },
    { name: "Loss Profit", value: "loss-profit" },
    { name: "Add-Ons", value: "add-on" },
    { name: "User", value: "user" },
    { name: "Setting", value: "setting" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });
  // ================== get list api
  const userListing = async () => {
    setSpinner(true);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/all_client_user`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      if (response?.status === 200) {
        const data = await response.json();
        setUserData(data?.data);
        setSpinner(false);
      } else {
        const data = await response.json();
        toast.error(data?.message, {
          autoClose: 5000,
        });
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
    }
  };
  // Function to add a new user
  const [id, setId] = useState();
  const userForm = async (data) => {
    setSpinner(true);
    try {
      // Convert the permissions array to a JSON string and replace double quotes with single quotes
      const formattedPermissions = JSON.stringify(data.permissions).replace(
        /"/g,
        "'"
      );
      // Prepare the data to be sent in the request body
      const formattedData = {
        first_name: data.first_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        permissions: formattedPermissions,
      };

      // Make the API request to add a new user
      const apiUrl = id
        ? `${process.env.REACT_APP_BASE_URL}/api/update_client_user`
        : `${process.env.REACT_APP_BASE_URL}/api/add_client_user`;
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json", // Set Content-Type header
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        method: "POST",
        body: JSON.stringify(formattedData), // Send formatted data as JSON
      });

      if (response?.status === 200) {
        reset(); // Define the reset() function
        hideModal();
        userListing();
        toast.success(
          `${id ? "User Updated successfully" : "User added successfully"}`
        );
      } else if (response?.status === 401) {
        localStorage.clear();
        toast.error(`Session expired !`);
        navigate("/"); // Redirect to the login page
      } else {
        const responseData = await response.json();
        toast.error(responseData?.message || "An error occurred", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle any additional error handling here
      setSpinner(false);
    }

    setSpinner(false);
  };
  // ====== edit user
  const [getUserData, setGetUserData] = useState();
  const editUser = async (id) => {
    setSpinner(true);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/edit_client_user/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      if (response?.status === 200) {
        reset();
        const data = await response.json();
        const formattedPermissions = JSON.stringify(data?.data?.permissions); // Convert the permissions array to a JSON string
        setGetUserData(data?.data);
        setValue("first_name", data?.data?.first_name);
        setValue("email", data?.data?.email);
        setValue("phone", data?.data?.phone);
        setValue("password", data?.data?.password);
        setValue("permissions", JSON.parse(data?.data?.permissions));

        setSpinner(false);
      } else {
        const data = await response.json();
        toast.error(data?.message, {
          autoClose: 5000,
        });
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
    }
  };
  useEffect(() => {
    userListing();
  }, []);

  // ============== delete user
  const [userId, setUserId] = useState([]);
  const deleteUser = async () => {
    setSpinner(true);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/status_client_user/delete/${userId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      if (response?.status === 200) {
        const data = await response.json();
        toast.success("User deleted");
        userListing();
        setSpinner(false);
      } else {
        const data = await response.json();
        toast.error(data?.message, {
          autoClose: 5000,
        });
      }
    } catch (error) {
      setSpinner(false);
    }
  };
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
                    <h4 className='page-title'>Users</h4>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='table-responsive'>
                        <div className='row'>
                          <div className='col-12'>
                            <div className='page-title-box'>
                              <div className='page-title-right'>
                                <button
                                  type='button'
                                  className='btn btn-primary waves-effect waves-light'
                                  onClick={() => {
                                    showModal();
                                    // setProduct(item);
                                  }}>
                                  <span className='btn-label'>
                                    <i className='mdi mdi-account-plus'></i>
                                  </span>
                                  Assign New User
                                </button>
                              </div>
                              <h4 className='page-title'>Active Users</h4>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-12'>
                            <table className='table dt-responsive nowrap w-100 dataTable dtr-inline border'>
                              <thead className='bg-light'>
                                <tr>
                                  <th>SL</th>
                                  <th>Name</th>
                                  <th>Mobile Number</th>
                                  <th>Email ID</th>
                                  <th>Permissions</th>
                                  <th width='20%'>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {userData?.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {item?.first_name
                                          ? item?.first_name
                                          : "-"}
                                      </td>
                                      <td>{item?.phone ? item?.phone : "-"}</td>
                                      <td>{item?.email ? item?.email : "-"}</td>
                                      <td>
                                        {item?.permissions
                                          ? item.permissions
                                              .map((permission) =>
                                                permission.trim()
                                              ) // Remove spaces around each element
                                              .join(", ")
                                          : "-"}
                                      </td>
                                      <td>
                                        <button
                                          className='btn btn-primary btn-sm'
                                          data-bs-toggle='modal'
                                          data-bs-target='#delete-alert-modal'
                                          onClick={() => {
                                            setDShow(true);
                                            setUserId(item?._id);
                                          }}>
                                          <span className='mdi mdi-trash-can-outline'></span>{" "}
                                          Delete
                                        </button>
                                        <button
                                          className='btn btn-primary btn-sm mx-1'
                                          // data-bs-toggle='modal'
                                          // data-bs-target='#create-user-model'
                                          onClick={() => {
                                            setPostModal(true);
                                            editUser(item?._id);
                                            setId(item?._id);
                                            showModal();
                                          }}>
                                          <span className='mdi mdi-square-edit-outline'></span>{" "}
                                          Edit
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id='delete-alert-modal'
        className='modal fade'
        tabindex='-1'
        role='dialog'
        aria-hidden='true'>
        <div className='modal-dialog modal-sm'>
          <div className='modal-content modal-filled bg-danger'>
            <div className='modal-body p-4'>
              <div className='text-center'>
                <i className='mdi mdi-trash-can-outline h1 text-white'></i>
                <h4 className='mt-2 text-white'>Delete!</h4>
                <p className='mt-3 text-white'>
                  Are you sure you want to delete this User?
                </p>
                <button
                  type='button'
                  className='btn btn-light my-2'
                  data-bs-dismiss='modal'
                  onClick={() => {
                    setDShow(false);
                    deleteUser();
                  }}>
                  Confirm
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  type='button'
                  className='btn btn-danger border-white my-2'
                  data-bs-dismiss='modal'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ========= user moal  */}
      {modalShow && (
        <div
          id='create-customer-model'
          className={`modal ${modalShow ? "d-flex show-modal" : ""} `}
          tabindex='-1'
          role='dialog'
          aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-body'>
                <div className='text-center mt-2 mb-4'>
                  <div className='auth-logo'>
                    <h4 className='mt-2 text-primary'>Assign New User</h4>
                  </div>
                </div>
                <form className='px-3 row' onSubmit={handleSubmit(userForm)}>
                  <div className='mb-2 col-lg-6'>
                    <label for='name' className='form-label'>
                      Name
                    </label>
                    <input
                      className='form-control'
                      {...register("first_name")}
                      type='name'
                      id='name'
                      required=''
                      placeholder='Enter Name..'
                    />
                  </div>
                  <div className='mb-2 col-lg-6'>
                    <label for='email' className='form-label'>
                      Email Address
                    </label>
                    <input
                      className='form-control'
                      type='email'
                      {...register("email")}
                      id='email'
                      required=''
                      placeholder='Enter Email Address..'
                    />
                  </div>
                  <div className='mb-2 col-lg-6'>
                    <label for='mobile_number' className='form-label'>
                      Mobile Number
                    </label>
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
                  <div className='mb-2 col-lg-6'>
                    <label for='password' className='form-label'>
                      Password
                    </label>
                    <input
                      className='form-control'
                      type='password'
                      {...register("password")}
                      required=''
                      id='password'
                      placeholder='Enter your Password'
                    />
                  </div>
                  <div className='mb-1 col-lg-12'>
                    <label>Select Permissions</label>
                  </div>
                  {permissions.map((permission) => (
                    <div className='mb-1 col-lg-4' key={permission}>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        {...register("permissions")}
                        value={permission?.value} // Capture the selected permission value
                      />
                      &nbsp;&nbsp;{permission?.name}
                    </div>
                  ))}
                  <div className='mt-2 col-lg-12 text-center'>
                    <button
                      className='btn btn-primary'
                      onClick={() => {
                        showModal();
                      }}>
                      Submit
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className='btn btn-outline-danger'
                      data-bs-dismiss='modal'
                      type='button'
                      onClick={() => {
                        reset();
                        setId();
                        hideModal();
                      }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
