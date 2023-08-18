import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../common-component/Spinner";
import { GlobalContext } from "../../App";
import { toast } from "react-toastify";
import moment from "moment";
import NoData from "../common-component/NoData";
const Orderdetails = () => {
  const id = useParams();
  const [orderdetails, setOrderDetail] = useState([]);
  const { setSpinner, spinner } = useContext(GlobalContext);
  // ========================get order listing API =
  const orderDetail = async () => {
    setSpinner(true);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/client_customer_manual_order_detail/${id.id}`,
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
        setOrderDetail(data?.data);
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
    orderDetail();
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
                    <h4 className='page-title'>Order Details</h4>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-9'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='row mb-2'>
                        <div className='col-lg-7'>
                          <h5>
                            Order ID{" "}
                            {orderdetails?.order_sequence ? (
                              orderdetails?.order_sequence
                            ) : (
                              <span className='text-danger small'>
                                <i>: No Order id</i>
                              </span>
                            )}
                          </h5>
                        </div>
                        <div className='col-lg-5 text-end'>
                          <button
                            type='button'
                            className='btn btn-primary waves-effect waves-light'>
                            <span className='btn-label'>
                              <i className='mdi mdi-printer'></i>
                            </span>
                            Print Invoice
                          </button>
                          <button
                            type='button'
                            className='btn btn-primary waves-effect waves-light mx-1'
                            data-bs-toggle='modal'
                            data-bs-target='#cancel-order-model'>
                            <span className='btn-label'>
                              <i className='mdi mdi-cart-remove'></i>
                            </span>
                            Cancel Order
                          </button>
                        </div>
                        <div className='col-lg-9'>
                          <p>
                            <span className='mdi mdi-calendar-month-outline'></span>{" "}
                            {orderdetails?.created_at
                              ? moment(orderdetails?.created_at).format(
                                  "DD MMM YYYY  h:mm A"
                                )
                              : "-"}
                          </p>
                        </div>
                        <div className='col-lg-3 text-end'>
                          <p className='mb-0 mt-2'>
                            <strong>Status: </strong>
                            <span
                              className={`badge ${
                                orderdetails?.order_status === "Pending"
                                  ? "badge-soft-danger"
                                  : "badge-soft-success"
                              }`}>
                              {orderdetails?.order_status
                                ? orderdetails?.order_status
                                : "-"}
                            </span>
                          </p>
                          <p className='mb-0'>
                            <strong>Payment Status : </strong>{" "}
                            <span
                              className={`${
                                orderdetails?.payment_status === "Pending"
                                  ? "text-danger"
                                  : "text-success"
                              }`}>
                              {orderdetails?.payment_status
                                ? orderdetails?.payment_status
                                : "-"}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='row'>
                        {orderdetails?.order_items?.length > 0 ? (
                          <>
                            <table
                              id='basic-datatable_wrapper'
                              className='table dt-responsive nowrap w-100 dataTable dtr-inline'>
                              <thead className='bg-light'>
                                <tr>
                                  <th> SL</th>
                                  <th>Item Details</th>
                                  <th>Qty.</th>
                                  <th>Price</th>
                                  <th>Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orderdetails?.order_items?.map(
                                  (item, index) => {
                                    return (
                                      <tr>
                                        <td>{index + 1} </td>
                                        <td>{item?.product_name}</td>
                                        <td>
                                          {item?.quantity < 1
                                            ? "1"
                                            : item?.quantity}
                                        </td>
                                        <td>
                                          {item?.product_price
                                            ? item?.product_price
                                            : "-"}
                                        </td>
                                        <td>
                                          {item?.total_price
                                            ? item?.total_price
                                            : "-"}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>

                            <table className='table w-100 table-borderless'>
                              <tr>
                                <th width='40%' className='text-end'>
                                  <p className='mb-0'>
                                    <strong>Total : </strong>
                                  </p>
                                  <p className='mb-0'>
                                    <strong>Discount : </strong>
                                  </p>
                                </th>
                                <td>
                                  <p className='mb-0'>
                                    $
                                    {orderdetails?.total_order_price
                                      ? orderdetails?.total_order_price
                                      : "-"}
                                  </p>
                                  <p className='mb-0'>
                                    $
                                    {orderdetails?.discount
                                      ? orderdetails?.discount
                                      : "-"}
                                  </p>
                                </td>
                                <th className='text-end'>
                                  <p className='mb-0'>
                                    <strong>GST/TAX : </strong>
                                  </p>
                                  <p className='mb-0'>
                                    <strong>Shipping Charge : </strong>
                                  </p>
                                  <p className='mb-0'>
                                    <strong>Grand Total : </strong>
                                  </p>
                                </th>
                                <td>
                                  <p className='mb-0'>
                                    $
                                    {orderdetails?.gst
                                      ? orderdetails?.gst
                                      : "-"}
                                  </p>
                                  <p className='mb-0'>
                                    $
                                    {orderdetails?.shipping_charges
                                      ? orderdetails?.shipping_charges
                                      : "-"}
                                  </p>
                                  <p className='mb-0'>
                                    {" "}
                                    $
                                    {orderdetails?.grand_total
                                      ? orderdetails?.grand_total
                                      : "-"}
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </>
                        ) : (
                          <NoData title='No order' />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-3'>
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='mb-0 text-primary'>
                        Customer Information
                      </h5>
                      <hr className='mb-2' />
                      <p className='mb-1'>
                        <strong>Name: </strong>
                        {orderdetails?.customer_name
                          ? orderdetails?.customer_name
                          : "-"}
                      </p>
                      <p className='mb-1'>
                        <strong>Mobile Number: </strong>
                        {orderdetails?.customer_mobile
                          ? orderdetails?.customer_mobile
                          : "-"}
                      </p>
                      <p className='mb-1'>
                        <strong>Address: </strong>
                        {orderdetails?.customer_address
                          ? orderdetails?.customer_address
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id='cancel-order-model'
          class='modal fade'
          tabindex='-1'
          role='dialog'
          aria-hidden='true'>
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-body'>
                <div class='text-center mb-1'>
                  <div class='auth-logo'>
                    <h4 class='mt-4 text-primary text-start mb-0'>
                      Cancel Order
                    </h4>
                    <hr />
                  </div>
                </div>
                <form class='px-3 row' action='#'>
                  <div class='mb-3 col-lg-12'>
                    <div class='mb-2'>
                      <label>Cancel Reason</label>
                      <select class='form-select'>
                        <option>Bad quality products feedback</option>
                        <option>Delay in shipping as expected</option>
                        <option>Delay in shipping as expected</option>
                        <option>
                          Bad customer care service or representative
                        </option>
                      </select>
                    </div>
                    <div class='mb-2'>
                      <label>Write Reason</label>
                      <textarea
                        class='form-control'
                        rows='4'
                        placeholder='Write something about cancel order...'></textarea>
                    </div>
                    <div class='mb-2'>
                      <label>Bank Name</label>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Enter Bank Name...'
                      />
                    </div>
                    <div class='mb-2'>
                      <label>Account Holder Name</label>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Enter Account Holder Name...'
                      />
                    </div>
                    <div class='mb-2'>
                      <label>IFSC Code</label>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Enter IFSC Code...'
                      />
                    </div>
                    <div class='mb-2'>
                      <label>Swift Code</label>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Enter Swift Code...'
                      />
                    </div>
                  </div>
                  <div class='mb-3 col-lg-12 text-center'>
                    <button class='btn btn-primary' type='button'>
                      Submit
                    </button>
                    &nbsp;&nbsp;
                    <button
                      class='btn btn-outline-danger'
                      data-bs-dismiss='modal'>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderdetails;
