import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../common-component/Spinner";
import { GlobalContext } from "../../App";
import { toast } from "react-toastify";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import { useForm } from "react-hook-form";

const User = () => {
  const [userData, setUserData] = useState([]);
  const id = useParams();
  const navigate = useNavigate();
  const { setSpinner, spinner } = useContext(GlobalContext);
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
    watch,
    handleSubmit,
    reset,
    setValue,
    control,
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
  useEffect(() => {
    userListing();
  }, []);
  console.log(userData, "userData");
  // ==================== add new user
  const userForm = async (data) => {
    try {
      const formattedPermissions = JSON.stringify(data.permissions); // Convert the permissions array to a JSON string
      const formattedPermissionsString = formattedPermissions.replace(
        /"/g,
        "'"
      ); // Replace double quotes with single quotes

      const formattedData = {
        first_name: data.first_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        permissions: formattedPermissionsString,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(formattedData));
      console.log(data, "data");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/add_client_user`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          method: "POST",
          body: formData,
        }
      );
      if (response?.status === 200) {
        reset();
        toast.success(
          `${id ? "User Updated successfully" : "User added successfully"}`
        );
      }
      if (response?.status === 401) {
        localStorage.clear();
        toast.success(`Session expired !`);
        navigate("/");
      }
      // for error msgs
      else {
        const data = await response.json();
        toast.error(data?.message, {
          autoClose: 5000,
        });
      }
    } catch (errors) {
      console.error("An error occurred:", errors);
    }
  };

  return (
    <>
      {spinner && <Spinner />}
      <div id="wrapper">
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box">
                    <h4 className="page-title">Users</h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <div className="row">
                          <div className="col-12">
                            <div className="page-title-box">
                              <div className="page-title-right">
                                <button
                                  type="button"
                                  className="btn btn-primary waves-effect waves-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#create-user-model"
                                >
                                  <span className="btn-label">
                                    <i className="mdi mdi-account-plus"></i>
                                  </span>
                                  Assign New User
                                </button>
                              </div>
                              <h4 className="page-title">Active Users</h4>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <table className="table dt-responsive nowrap w-100 dataTable dtr-inline border">
                              <thead className="bg-light">
                                <tr>
                                  <th>SL</th>
                                  <th>Name</th>
                                  <th>Mobile Number</th>
                                  <th>Email ID</th>
                                  <th>Permissions</th>
                                  <th width="20%">Action</th>
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
                                              .replace(/"/g, "") // Remove double quotes
                                              .replace(/^\[|\]$/g, "") // Remove square brackets
                                              .split(",") // Split into an array
                                              .map((permission) =>
                                                permission.trim()
                                              ) // Remove spaces around each element
                                              .join(", ")
                                          : "-"}
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-primary btn-sm"
                                          data-bs-toggle="modal"
                                          data-bs-target="#delete-alert-modal"
                                        >
                                          <span className="mdi mdi-trash-can-outline"></span>{" "}
                                          Delete
                                        </button>
                                        <button
                                          className="btn btn-primary btn-sm mx-1"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit-user-model"
                                        >
                                          <span className="mdi mdi-square-edit-outline"></span>{" "}
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
        id="delete-alert-modal"
        className="modal fade"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content modal-filled bg-danger">
            <div className="modal-body p-4">
              <div className="text-center">
                <i className="mdi mdi-trash-can-outline h1 text-white"></i>
                <h4 className="mt-2 text-white">Delete!</h4>
                <p className="mt-3 text-white">
                  Are you sure you want to delete this User?
                </p>
                <button
                  type="button"
                  className="btn btn-light my-2"
                  data-bs-dismiss="modal"
                >
                  Confirm
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-danger border-white my-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="create-user-model"
        className="modal fade"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center mt-2 mb-4">
                <div className="auth-logo">
                  <h4 className="mt-2 text-primary">Assign New User</h4>
                </div>
              </div>
              <form className="px-3 row" onSubmit={handleSubmit(userForm)}>
                <div className="mb-2 col-lg-6">
                  <label for="name" className="form-label">
                    Name
                  </label>
                  <input
                    className="form-control"
                    {...register("first_name")}
                    type="name"
                    id="name"
                    required=""
                    placeholder="Enter Name.."
                  />
                </div>
                <div className="mb-2 col-lg-6">
                  <label for="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    {...register("email")}
                    id="email"
                    required=""
                    placeholder="Enter Email Address.."
                  />
                </div>
                <div className="mb-2 col-lg-6">
                  <label for="mobile_number" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    className="form-control"
                    type="mobile_number"
                    {...register("phone")}
                    required=""
                    onKeyPress={(offer) => {
                      if (!/[0-9]/.test(offer.key)) {
                        offer.preventDefault();
                      }
                    }}
                    id="mobile_number"
                    placeholder="Enter Mobile Number.."
                  />
                </div>
                <div className="mb-2 col-lg-6">
                  <label for="password" className="form-label">
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    {...register("password")}
                    required=""
                    id="password"
                    placeholder="Enter your Password"
                  />
                </div>
                <div className="mb-1 col-lg-12">
                  <label>Select Permissions</label>
                </div>

                {permissions.map((permission) => (
                  <div className="mb-1 col-lg-4" key={permission}>
                    {/* <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedPermissions.includes(permission)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPermissions((prevPermissions) => [
                            ...prevPermissions,
                            permission,
                          ]);
                        } else {
                          setSelectedPermissions((prevPermissions) =>
                            prevPermissions.filter((p) => p !== permission)
                          );
                        }
                      }}
                    /> */}
                    <input
                      type="checkbox"
                      className="form-check-input"
                      {...register("permissions")}
                      value={permission?.value} // Capture the selected permission value
                    />
                    &nbsp;&nbsp;{permission?.name}
                  </div>
                ))}
                {/* <div className="mb-1 col-lg-4" key={permission}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("{permission}")}
                  />
                  &nbsp;&nbsp;Inventory
                </div>
                <div className="mb-1 col-lg-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("loss-profit")}
                  />
                  &nbsp;&nbsp;Loss Profit
                </div>
                <div className="mb-1 col-lg-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("add-on")}
                  />
                  &nbsp;&nbsp;Add-Ons
                </div>
                <div className="mb-1 col-lg-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("message")}
                  />
                  &nbsp;&nbsp;Messages
                </div>
                <div className="mb-1 col-lg-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("order")}
                  />
                  &nbsp;&nbsp;Order
                </div>
                <div className="mb-1 col-lg-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("user")}
                  />
                  &nbsp;&nbsp;User
                </div>
                <div className="mb-1 col-lg-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("setting")}
                  />
                  &nbsp;&nbsp;Settings
                </div> */}
                <div className="mt-2 col-lg-12 text-center">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-outline-danger"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        id="edit-user-model"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="text-center mt-2 mb-4">
                <div class="auth-logo">
                  <h4 class="mt-2 text-primary">Update User</h4>
                </div>
              </div>
              <form class="px-3 row" action="#">
                <div class="mb-3 col-lg-6">
                  <label for="name" class="form-label">
                    Name
                  </label>
                  <input
                    class="form-control"
                    type="email"
                    id="name"
                    required=""
                    placeholder="Enter Name.."
                    value="Alex Newton"
                  />
                </div>
                <div class="mb-3 col-lg-6">
                  <label for="email" class="form-label">
                    Email Address
                  </label>
                  <input
                    class="form-control"
                    type="email"
                    id="email"
                    required=""
                    placeholder="Enter Email Address.."
                    value="alexnewton@gmail.com"
                  />
                </div>
                <div class="mb-3 col-lg-6">
                  <label for="mobile_number" class="form-label">
                    Mobile Number
                  </label>
                  <input
                    class="form-control"
                    type="mobile_number"
                    required=""
                    id="mobile_number"
                    placeholder="Enter Mobile Number.."
                    value="1234567890"
                  />
                </div>
                <div class="mb-3 col-lg-6">
                  <label for="password" class="form-label">
                    Password
                  </label>
                  <input
                    class="form-control"
                    type="password"
                    required=""
                    id="password"
                    placeholder="Enter your Password"
                    value="Alex Newton"
                  />
                </div>
                <div class="mb-1 col-lg-12">
                  <label>Select Permissions</label>
                </div>
                <div class="mb-1 col-lg-4">
                  <input type="checkbox" class="form-check-input" checked />{" "}
                  &nbsp;&nbsp;Inventory
                </div>
                <div class="mb-1 col-lg-4">
                  <input type="checkbox" class="form-check-input" checked />{" "}
                  &nbsp;&nbsp;Loss Profit
                </div>
                <div class="mb-1 col-lg-4">
                  <input type="checkbox" class="form-check-input" checked />{" "}
                  &nbsp;&nbsp;Add-Ons
                </div>
                <div class="mb-1 col-lg-4">
                  <input type="checkbox" class="form-check-input" checked />{" "}
                  &nbsp;&nbsp;Messages
                </div>
                <div class="mb-1 col-lg-4">
                  <input type="checkbox" class="form-check-input" />{" "}
                  &nbsp;&nbsp;Order
                </div>
                <div class="mb-1 col-lg-4">
                  <input type="checkbox" class="form-check-input" />{" "}
                  &nbsp;&nbsp;User
                </div>
                <div class="mb-1 col-lg-4">
                  <input type="checkbox" class="form-check-input" />{" "}
                  &nbsp;&nbsp;Settings
                </div>
                <div class="mt-2 mb-2 col-lg-12 text-center">
                  <button class="btn btn-primary" type="submit">
                    Save Changes
                  </button>
                  &nbsp;&nbsp;
                  <button
                    class="btn btn-outline-danger"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
