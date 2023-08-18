import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import { toast } from "react-toastify";
import moment from "moment";
import NoData from "../common-component/NoData";
import Spinner from "../common-component/Spinner";

const AddOnsHistory = () => {
  const { setSpinner, spinner } = useContext(GlobalContext);
  const [serviceHistory, setServiceHistory] = useState([]);
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
        `${process.env.REACT_APP_BASE_URL}/api/client_all_purchased_services_history`,
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
        const serviceHistoryData = responseData?.data || [""];
        setServiceHistory(serviceHistoryData);
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
                  <div class='card'>
                    <div class='card-body'>
                      <h4 class='page-title'>Add-Ons Purchase History</h4>
                      <hr class='mb-0' />
                      <div class='row'>
                        <div class='table-responsive'>
                          {serviceHistory?.length > 0 ? (
                            <table
                              id='basic-datatable_wrapper'
                              class='table dt-responsive nowrap w-100 dataTable dtr-inline'>
                              <thead class='table-light'>
                                <tr>
                                  <th>SL</th>
                                  <th>Service</th>
                                  <th>Start Date</th>
                                  <th>End Date</th>
                                  <th>Status</th>
                                  <th>Payment Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {serviceHistory.map((item, index) => {
                                  return (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{item?.service_name}</td>
                                      <td>
                                        {" "}
                                        {item?.active_from
                                          ? moment(item?.active_from).format(
                                              "DD MMM YYYY"
                                            )
                                          : "-"}
                                      </td>
                                      <td>
                                        {item?.active_to
                                          ? moment(item?.active_to).format(
                                              "DD MMM YYYY"
                                            )
                                          : "-"}
                                      </td>
                                      <td>
                                        {item?.action_by === null ? (
                                          <label className='badge badge-soft-danger '>
                                            Pending
                                          </label>
                                        ) : (
                                          <label className='badge badge-soft-success'>
                                            Active
                                          </label>
                                        )}
                                      </td>
                                      <td>
                                        {item?.payment_status === "Paid" ? (
                                          <label className='badge badge-soft-success'>
                                            Success
                                          </label>
                                        ) : (
                                          <label className='badge badge-soft-danger'>
                                            Not Paid
                                          </label>
                                        )}
                                      </td>
                                      <td></td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          ) : (
                            <NoData title='No lising...' />
                          )}
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

export default AddOnsHistory;
