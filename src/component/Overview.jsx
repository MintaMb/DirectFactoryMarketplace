import React, { useContext, useState } from "react";
import Header from "./dashboard_layout/Header";
import { Controller, useForm } from "react-hook-form";
import { GlobalContext } from "../App";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Overview = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });
  const { setSpinner } = useContext(GlobalContext);
  const [dashboardData, setDashboardData] = useState({});
  //===================  suggestions post api.

  const postSuggestion = async (data, id) => {
    setSpinner(true);
    let userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const formattedData = {
        factory_id: userData?.factory_id,
        client_id: userData?.company_id,
        suggestion_message: data.suggestion_message,
      };
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/add_suggestion`,
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
        reset(); // Define the reset() function
        toast.success("Your suggestions has been submitted successfully!");
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

  //----Dashboaard-----//
  const restApiGetDasboardData = async () => {
    setSpinner(true);
    let userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const formattedData = {
        factory_id: userData?.factory_id,
        client_id: userData?.company_id,
      };
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/client_dashboard_detail`,
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
        const overviewData = responseData.data || [""];
        reset(); // Define the reset() function
        setDashboardData(overviewData);
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
    restApiGetDasboardData();
  }, []);
  return (
    <>
      <div id='wrapper'>
        <Header />
        <div className='content-page'>
          <div className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12'>
                  <div className='page-title-box'>
                    <h4 className='page-title'>Overview</h4>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6 col-xl-4'>
                  <div className='card' id='tooltip-container'>
                    <div className='card-body'>
                      <i className='mdi mdi-chart-areaspline text-muted float-end text-primary mdi-48px'></i>
                      <h4 className='mt-0 font-20'>Total Sales</h4>
                      <h2 className='text-primary my-3'>
                        $
                        <span data-plugin='counterup'>
                          {dashboardData?.total_sales
                            ? dashboardData?.total_sales
                            : "0"}
                        </span>
                      </h2>
                      <p className='text-muted mb-0'>
                        <span className='badge bg-soft-primary text-primary'>
                          7.4%
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 col-xl-4'>
                  <div className='card' id='tooltip-container1'>
                    <div className='card-body'>
                      <i className='mdi mdi-wallet text-muted float-end text-primary mdi-48px'></i>
                      <h4 className='mt-0 font-20'>Total Expenses</h4>
                      <h2 className='text-primary my-3'>
                        $
                        <span data-plugin='counterup'>
                          {dashboardData?.total_expenses
                            ? dashboardData?.total_expenses
                            : "0"}
                        </span>
                      </h2>
                      <p className='text-muted mb-0'>
                        <span className='badge bg-soft-primary text-primary'>
                          3.4%
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 col-xl-2'>
                  <div className='widget-rounded-circle card'>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-12'>
                          <div className='text-start'>
                            <h4 className='mb-2 font-20'>Last Payout</h4>
                            <p className='mb-2'>10 June 2023</p>
                            <button className='btn btn-primary waves-effect waves-light btn-sm float-end mb-2'>
                              See details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 col-xl-2'>
                  <div className='widget-rounded-circle card'>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-12'>
                          <div className='text-start'>
                            <h4 className='mb-2 mt-2 font-20'>Next Payout</h4>
                            <p className='mb-4'>8 Days to go</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-8'>
                  <div className='card'>
                    <div className='card-body pb-2'>
                      <div className='float-end d-none d-md-inline-block'>
                        <div className='btn-group mb-2'>
                          <button
                            type='button'
                            className='btn btn-xs btn-light'>
                            Today
                          </button>
                          <button
                            type='button'
                            className='btn btn-xs btn-light'>
                            Weekly
                          </button>
                          <button
                            type='button'
                            className='btn btn-xs btn-secondary'>
                            Monthly
                          </button>
                        </div>
                      </div>
                      <h4 className='header-title mb-3'>Revenue Analytics</h4>
                      <div dir='ltr'>
                        <div
                          id='sales-analytics'
                          className='mt-4 mb-1'
                          data-colors='#1abc9c,#4a81d4'
                        />
                        <div className='row'>
                          <div className='col-lg-12'>
                            <img
                              className='w-100'
                              src='/assets/images/others/overview-client.png'
                              alt=''
                            />
                          </div>
                          <div className='col-lg-4 text-center'>
                            <strong>$12,253</strong>
                            <br />
                            This Month
                          </div>
                          <div className='col-lg-4 text-center'>
                            <strong>$34,254</strong>
                            <br />
                            This Year
                          </div>
                          <div className='col-lg-4 text-center'>
                            <strong>$32,695</strong>
                            <br />
                            Previous Year
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4'>
                  <div className='row'>
                    <div className='col-md-6 col-xl-6'>
                      <div className='widget-rounded-circle card'>
                        <div className='card-body'>
                          <h4 className='mb-0'>Net Position</h4>
                          <p className='mb-2 text-end'>
                            {" "}
                            {dashboardData?.net_position?.client_rank
                              ? dashboardData?.net_position?.client_rank
                              : "0"}
                          </p>
                          <button className='btn btn-primary waves-effect waves-light btn-sm float-end mb-3'>
                            See details
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6 col-xl-6'>
                      <div className='widget-rounded-circle card'>
                        <div className='card-body'>
                          <h4 className='mb-1'>Reputation Gain</h4>
                          <p className='mb-1 text-end'>4545</p>
                          <button className='btn btn-primary waves-effect waves-light btn-sm float-end'>
                            See details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12 col-xl-12'>
                      <div className='widget-rounded-circle card'>
                        <div className='card-body'>
                          <form onSubmit={handleSubmit(postSuggestion)}>
                            <Controller
                              name='suggestion_message'
                              control={control}
                              defaultValue=''
                              rules={{ required: "Message is required." }}
                              render={({ field }) => (
                                <>
                                  <textarea
                                    {...field}
                                    className='form-control'
                                    rows={4}
                                    placeholder='Have a Suggetions ? Type here...'
                                  />
                                  {errors.suggestion_message && (
                                    <p className='text-danger'>Required!</p>
                                  )}
                                </>
                              )}
                            />
                            <button className='btn btn-primary waves-effect waves-light float-end mt-2'>
                              Submit
                            </button>
                          </form>
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
    </>
  );
};

export default Overview;
