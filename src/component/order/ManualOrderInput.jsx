import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import { toast } from "react-toastify";
import moment from "moment";
import Spinner from "../common-component/Spinner";

const ManualOrderInput = () => {
  const navigate = useNavigate();
  const [orderListing, setOrderListing] = useState([]);
  const { setSpinner, spinner } = useContext(GlobalContext);
  // ========================get order listing API =
  const orderData = async () => {
    setSpinner(true);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/client_all_manual_orders`,
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
        setOrderListing(data?.data);
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
  useEffect(() => {
   orderData();
  }, []);
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
                  <h4 className="page-title">Manual Order Input</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-8 mb-2">
                        <h5>Order List</h5>
                      </div>
                      <div className="col-lg-4 text-end mb-2">
                        <Link
                          className="btn btn-primary"
                          to="/order/manual-order-input/create-order"
                        >
                          Create New Order
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="table-responsive mt-3">
                          <table
                            id="basic-datatable_wrapper"
                            className="table dt-responsive nowrap w-100 dataTable dtr-inline"
                          >
                            <thead className="bg-light">
                              <tr>
                                <th>SL</th>
                                <th>Order ID</th>
                                <th>Order Date</th>
                                <th>Customer Info</th>
                                <th>Total Amount</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                             <tbody>
                                {orderListing?.map((item, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                      <h5 className="text-primary bold">
                                        {item?.order_sequence
                                          ? item?.order_sequence
                                          : "-"}
                                      </h5>
                                    </td>
                                    <td>
                                      {item?.created_at
                                        ? moment(item?.created_at).format(
                                            "DD MMM YYYY | h:mm A"
                                          )
                                        : "-"}
                                    </td>
                                    <td>
                                      {item?.customer_name
                                        ? item?.customer_name
                                        : "-"}
                                      <br />
                                      {item?.customer_mobile
                                        ? item?.customer_mobile
                                        : "-"}
                                    </td>
                                    <td>
                                      $
                                      {item?.grand_total
                                        ? item?.grand_total
                                        : "0"}
                                      <br />
                                      <span
                                        className={`${
                                          item?.payment_status === "Pending"
                                            ? "text-danger"
                                            : "text-success"
                                        }`}
                                      >
                                        {item?.payment_status
                                          ? item?.payment_status
                                          : "-"}
                                      </span>
                                    </td>
                                    <td width="120px">
                                      <button
                                        onClick={() =>
                                          navigate(
                                            `/order/manual-order-input/order-details/${item?._id}`,
                                            {
                                              state: item,
                                            }
                                          )
                                        }
                                        className="btn btn-primary btn-sm mx-1"
                                      >
                                        {" "}
                                        <span className="mdi mdi-eye"></span>
                                      </button>
                                      <button className="btn btn-primary btn-sm mx-1">
                                        <span className="mdi mdi-download"></span>
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
    </div></>
  );
};

export default ManualOrderInput;
