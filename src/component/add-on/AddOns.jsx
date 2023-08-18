import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../App";
import { toast } from "react-toastify";
import moment from "moment";
import NoData from "../common-component/NoData";
import Spinner from "../common-component/Spinner";

const AddOns = () => {
  const navigate = useNavigate();
  const { spinner, setSpinner } = useContext(GlobalContext);
  const [services, SetServicesList] = useState([]);
  const [serviceListing, setServiceListing] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  // modal show/Hide  functions
  const [modalShow, setShowModal] = useState(false);
  const showModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  //========================== Service List api
  const Formservices = async () => {
    setSpinner(true);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/all_services`,
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
        SetServicesList(data?.data);
        setSpinner(false);
      } else {
        const data = await response.json();
        toast.error(data?.message, {
          autoClose: 5000,
        });
        setSpinner(false);
      }
    } catch (errors) {
      setSpinner(false);
    }
    setSpinner(false);
  };
  // ========================= add new service
  const addService = async (data) => {
    let clientUserData = JSON.parse(localStorage.getItem("userData"));
    setSpinner(true);
    try {
      // Filter the selected services and map them to the desired format
      const selectedServices = Object.keys(data.services)
        .filter((serviceId) => data.services[serviceId].selected)
        .map((serviceId) => ({
          service_id: serviceId,
          offer_price: data.services[serviceId].offer_price,
        }));

      const formattedData = {
        client_id: "64b38d453c5d9e4143a95b0e", // Replace with your actual client_id
        factory_id: clientUserData?.factory_id,
        services: JSON.stringify(selectedServices),
      };
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/purchase_services`,
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type header
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          method: "POST",
          body: JSON.stringify(formattedData), // Send formatted data as JSON
        }
      );
      if (response?.status === 200) {
        reset(); // Define the reset() function
        hideModal();
        toast.success("Service added");
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
  useEffect(() => {
    Formservices();
  }, []);
  // ============= all services
  const restApiAllServices = async () => {
    setSpinner(true);
    let userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const formattedData = {
        factory_id: userData?.factory_id,
        client_id: userData?.company_id,
      };
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/client_all_purchased_services`,
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type header
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          method: "POST",
          body: JSON.stringify(formattedData),
        }
      );
      const responseData = await response.json(); // Always parse the response data as JSON
      if (response.status === 200) {
        const purchasedServices = responseData?.data || [""];
        reset(); // Define the reset() function
        setServiceListing(purchasedServices);
      } else {
        toast.error(responseData?.message || "An error occurred", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle any additional error handling here
    }
    setSpinner(false);
  };
  useEffect(() => {
    restApiAllServices();
  }, []);
  // ====================Renew service
  const [serviceId, setServiceId] = useState([]);
  const renewedService = async () => {
    setSpinner(true);
    let userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const formattedData = {
        factory_id: userData.factory_id,
        client_id: userData.company_id,
        service_id: serviceId,
      };

      const token = localStorage.getItem("Token");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/renew_client_subscription`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: JSON.stringify(formattedData),
        }
      );

      const responseData = await response.json();
      if (response.status === 200) {
        toast.success(responseData.message);
      } else if (response.status === 401) {
        localStorage.clear();
        toast.error("Session expired !");
        navigate("/"); // Redirect to the login page
      } else {
        const responseData = await response.json();
        if (responseData.message) {
          toast.error(responseData.message, {
            autoClose: 5000,
          });
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
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
                    <h4 className='page-title'>Add-Ons</h4>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-12'>
                          <div className='page-title-box'>
                            <div className='page-title-right'>
                              <button
                                type='button'
                                className='btn btn-primary waves-effect waves-light'
                                onClick={() => {
                                  showModal();
                                }}>
                                <span className='btn-label'>
                                  <i className='mdi mdi-account-plus'></i>
                                </span>
                                Buy New Service
                              </button>
                            </div>
                            <h4 className='page-title'>Service List</h4>
                          </div>
                        </div>
                      </div>
                      <hr className='mb-0' />
                      <div className='row'>
                        <div className='table-responsive'>
                          {serviceListing?.length > 0 ? (
                            <table
                              id='basic-datatable_wrapper'
                              className='table dt-responsive nowrap w-100 dataTable dtr-inline'>
                              <thead className='table-light'>
                                <tr>
                                  <th>SL</th>
                                  <th>Service</th>
                                  <th>Start Date</th>
                                  <th>Renewal Date</th>
                                  <th>Status</th>
                                  <th width='250px'>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {serviceListing.map((item, index) => {
                                  return (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{item?.name}</td>
                                      <td>
                                        {" "}
                                        {item?.created_at
                                          ? moment(item?.created_at).format(
                                              "DD MMM YYYY"
                                            )
                                          : "-"}
                                      </td>
                                      <td>
                                        {item?.modified_at
                                          ? moment(item?.modified_at).format(
                                              "DD MMM YYYY"
                                            )
                                          : "-"}
                                      </td>
                                      <td>
                                        {item?.status === true ? (
                                          <label className='badge badge-soft-success'>
                                            Active
                                          </label>
                                        ) : (
                                          <label className='badge badge-soft-danger'>
                                            Not Active
                                          </label>
                                        )}
                                      </td>
                                      <td>
                                        <button
                                          className='btn btn-primary btn-sm'
                                          data-bs-toggle='modal'
                                          data-bs-target='#renew-service-modal'
                                          onClick={() => {
                                            setServiceId(item?._id);
                                          }}>
                                          Renew
                                        </button>
                                        <button
                                          className='btn btn-primary btn-sm mx-1'
                                          data-bs-toggle='modal'
                                          data-bs-target='#cancel-service-modal'>
                                          Cancel Service
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          ) : (
                            <NoData title='No lising...' />
                          )}
                          <Link
                            to='add-ons-history'
                            className='btn btn-primary float-end btn-sm'>
                            Add-Ons History
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ============ cancel modal */}
        <div
          id='cancel-service-modal'
          className='modal fade'
          tabindex='-1'
          role='dialog'
          aria-hidden='true'>
          <div className='modal-dialog modal-sm'>
            <div className='modal-content modal-filled bg-danger'>
              <div className='modal-body p-4'>
                <div className='text-center'>
                  <i className='mdi mdi-briefcase-remove-outline h1 text-white'></i>
                  <h4 className='mt-2 text-white'>Cancel!</h4>
                  <p className='mt-3 text-white'>
                    Are you sure you want to Cancel this Service
                  </p>
                  <button
                    type='button'
                    className='btn btn-light my-2'
                    data-bs-dismiss='modal'>
                    Confirm
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    type='button'
                    className='btn btn-danger my-2 border-white'
                    data-bs-dismiss='modal'>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* renew modal  */}
        <div
          id='renew-service-modal'
          className='modal fade'
          tabindex='-1'
          role='dialog'
          aria-hidden='true'>
          <div className='modal-dialog modal-sm'>
            <div className='modal-content modal-filled bg-success'>
              <div className='modal-body p-4'>
                <div className='text-center'>
                  <i className='mdi mdi-briefcase-check h1 text-white'></i>
                  <h4 className='mt-2 text-white'>Renew!</h4>
                  <p className='mt-3 text-white'>
                    Are you sure you want to Renew this Serivce
                  </p>
                  <button
                    type='button'
                    className='btn btn-light my-2'
                    data-bs-dismiss='modal'
                    onClick={() => renewedService()}>
                    Confirm
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    type='button'
                    className='btn btn-success my-2 border-white'
                    data-bs-dismiss='modal'>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* =============== modal  */}
        {modalShow && (
          <div
            id='create-customer-model'
            className={`modal ${showModal ? "d-flex show-modal" : ""} `}
            tabindex='-1'
            role='dialog'
            aria-hidden='true'>
            <div className='modal-dialog modal-lg'>
              <div className='modal-content'>
                <div className='modal-body'>
                  <div className='text-center mt-2 mb-4'>
                    <div className='auth-logo'>
                      <h4 className='mt-4 text-primary text-start mb-0'>
                        Add New Service
                      </h4>
                      <hr />
                    </div>
                  </div>
                  <form className='px-3' onSubmit={handleSubmit(addService)}>
                    <div className='mb-3 row'>
                      {services?.map((service) => (
                        <div
                          className='mb-1 col-lg-4 text-end d-flex justify-content-end'
                          key={service._id}>
                          <div className='modal-input-label'>
                            {service?.name}
                          </div>
                          <div className='modal-checkbox  d-flex'>
                            <div class='tooltip'>
                              <i className='mdi mdi-progress-question text-danger'></i>
                              <span class='tooltiptext text-now'>
                                ${service?.offer_price}
                              </span>
                            </div>

                            <input
                              type='checkbox'
                              className='form-check-input mx-1'
                              {...register(`services.${service._id}.selected`)}
                            />
                            {service?.offer_price && (
                              <input
                                type='text'
                                className='form-control d-none'
                                placeholder='Offer Price'
                                defaultValue={service?.offer_price} // Use the offer price from the service object
                                {...register(
                                  `services.${service._id}.offer_price`
                                )}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='mb-3 col-lg-12 text-center'>
                      <button className='btn btn-primary'>
                        Submit for Approval
                      </button>
                      &nbsp;&nbsp;
                      <button
                        className='btn btn-outline-danger'
                        onClick={() => {
                          reset();
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
      </div>
    </>
  );
};

export default AddOns;
