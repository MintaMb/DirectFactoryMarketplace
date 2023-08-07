import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "./common-component/Spinner";
import { GlobalContext } from "../App";
import { toast } from "react-toastify";
import placeholder from "../assets/images/placeholder.png"; //placeholderimg
import NoData from "./common-component/NoData";
import { useForm } from "react-hook-form";
import moment from "moment";
const Inventory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inventoryData, setInventoryData] = useState([]);
  const { setSpinner, spinner } = useContext(GlobalContext);
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
  const inventoryListing = async () => {
    setSpinner(false);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/get_all_inventory`,
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
        setInventoryData(data?.data);
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
    inventoryListing();
  }, []);
  // ================== get product list api
  const [productData, setproductData] = useState([]);
  const productListing = async () => {
    setSpinner(false);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/all_products`,
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
        setproductData(data?.data);
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
    productListing();
  }, []);
  // ========== add inventory api
  const inventoryForm = async (data) => {
    try {
      const formattedData = {
        product_id: data.product_id,
        reception_date: data.reception_date,
        quantity: data.quantity,
        total_price: data.total_price,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(formattedData));
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/add_stock_history
        ${id ? "/" + id : ""}`,
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
        setTimeout(() => {}, 500);
        navigate("/inventory");
        toast.success(
          `${
            id ? "Product Updated successfully" : "Product created successfully"
          }`
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

  // ============== delete product
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
                    <h4 className="page-title">Inventory</h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-8 mb-2">
                          <h5>Products</h5>
                        </div>
                        <div className="col-lg-4 text-end mb-2">
                          <Link
                            to="/inventory/create-product"
                            className="btn btn-primary"
                          >
                            Add New Product
                          </Link>
                          <button className="btn btn-primary mx-2">
                            Print Report
                          </button>
                        </div>
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            {inventoryData?.products?.length > 0 ? (
                              <>
                                <table className="table dt-responsive nowrap w-100 dataTable dtr-inline border">
                                  <thead className="bg-light">
                                    <tr>
                                      <th>SL</th>
                                      <th>Product Name</th>
                                      <th>Purchase Price</th>
                                      <th>Selling Price</th>
                                      <th>Verify Status</th>
                                      <th>Active Status</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {inventoryData?.products?.map(
                                      (item, index) => {
                                        return (
                                          <tr>
                                            <td>{index + 1} </td>
                                            <td>
                                              {item?.image ? (
                                                <img
                                                  src={item?.image}
                                                  alt="contact-img"
                                                  title="contact-img"
                                                  className="avatar-sm img-thumbnail"
                                                />
                                              ) : (
                                                <img
                                                  src={placeholder}
                                                  alt="contact-img"
                                                  title="contact-img"
                                                  className="avatar-sm img-thumbnail"
                                                />
                                              )}
                                              &nbsp;&nbsp;
                                              {item?.name ? item?.name : "-"}
                                            </td>
                                            <td>
                                              {item?.cost ? item?.cost : "-"}
                                            </td>
                                            <td>
                                              {item?.sale_price
                                                ? item?.sale_price
                                                : "-"}
                                            </td>
                                            <td>
                                              {item?.is_approved === true ? (
                                                <label className="badge badge-soft-success">
                                                  Approved
                                                </label>
                                              ) : (
                                                <label className="badge badge-soft-danger">
                                                  Not Approved
                                                </label>
                                              )}
                                            </td>
                                            <td>
                                              {item?.status === true ? (
                                                <button className="btn btn-success btn-sm">
                                                  Active
                                                </button>
                                              ) : (
                                                <button className="btn btn-danger btn-sm">
                                                  Not Active
                                                </button>
                                              )}
                                            </td>
                                            <td width="180px">
                                              <button
                                                onClick={() =>
                                                  navigate(
                                                    `/inventory/product-details/${item?._id}`,
                                                    {
                                                      state: item,
                                                    }
                                                  )
                                                }
                                                className="btn btn-primary btn-sm mx-1"
                                              >
                                                {console.log(
                                                  item?._id,
                                                  "item?._id"
                                                )}
                                                <span className="mdi mdi-eye"></span>
                                              </button>
                                              <button
                                                onClick={() =>
                                                  navigate(
                                                    `/inventory/edit-product/${item?._id}`,
                                                    {
                                                      state: item,
                                                    }
                                                  )
                                                }
                                                className="btn btn-primary btn-sm mx-1"
                                              >
                                                <span className="mdi mdi-square-edit-outline"></span>
                                              </button>
                                              <button
                                                className="btn btn-primary btn-sm mx-0"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete-alert-modal"
                                              >
                                                <span className="mdi mdi-trash-can-outline"></span>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                                <Link
                                  to="product-list"
                                  className="btn btn-primary btn-sm float-end"
                                >
                                  View All...
                                </Link>
                              </>
                            ) : (
                              <NoData title="No product here.." />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-8 mb-2">
                          <h5>Inventory</h5>
                        </div>
                        <div className="col-lg-4 text-end mb-2">
                          <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#order-model"
                          >
                            Add New Stock
                          </button>
                          <button className="btn btn-primary mx-2">
                            Print Report
                          </button>
                        </div>
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            {inventoryData?.inventory?.length > 0 ? (
                              <>
                                <table className="table dt-responsive nowrap w-100 dataTable dtr-inline border">
                                  <thead className="bg-light">
                                    <tr>
                                      <th>SL</th>
                                      <th>Product Name</th>
                                      <th>Total Capacity</th>
                                      <th>Available Stock</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {inventoryData?.inventory?.map(
                                      (item, index) => {
                                        return (
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>
                                              {item?.name ? item?.name : "-"}
                                            </td>
                                            <td>
                                              {item?.capacity
                                                ? item?.capacity
                                                : "-"}
                                            </td>
                                            <td>
                                              {item?.stock ? item?.stock : "-"}
                                            </td>
                                            <td width="180px">
                                              <button
                                                className="btn btn-primary btn-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target="#order-model"
                                              >
                                                Order More
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                                <Link
                                  to="inventory-list"
                                  className="btn btn-primary btn-sm float-end"
                                >
                                  View All...
                                </Link>
                              </>
                            ) : (
                              <NoData title="No inventory here.." />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-8 mb-2">
                          <h5>Stock Order History</h5>
                        </div>
                        <div className="col-lg-4 text-end mb-2">
                          <button className="btn btn-primary">
                            Print Report
                          </button>
                        </div>
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            {inventoryData?.stock_histories?.length > 0 ? (
                              <>
                                <table className="table dt-responsive nowrap w-100 dataTable dtr-inline border">
                                  <thead className="bg-light">
                                    <tr>
                                      <th>SL</th>
                                      <th>Product</th>
                                      <th>Order Date</th>
                                      <th>Reception Date</th>
                                      <th>Order Qty.</th>
                                      <th>Price</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {inventoryData?.stock_histories?.map(
                                      (item, index) => {
                                        return (
                                          <>
                                            <tr>
                                              <td>{index + 1}</td>
                                              <td>
                                                {item?.product_name
                                                  ? item?.product_name
                                                  : "-"}
                                              </td>
                                              <td>
                                                {" "}
                                                {item?.created_at
                                                  ? moment(
                                                      item?.created_at
                                                    ).format("DD MMM YYYY")
                                                  : "-"}
                                              </td>
                                              <td>
                                                {" "}
                                                {item?.reception_date
                                                  ? moment(
                                                      item?.reception_date
                                                    ).format("DD MMM YYYY")
                                                  : "-"}
                                              </td>
                                              <td>
                                                {" "}
                                                {item?.quantity
                                                  ? item?.quantity
                                                  : "-"}
                                              </td>
                                              <td>
                                                {" "}
                                                {item?.total_price
                                                  ? "$" +
                                                    " " +
                                                    item?.total_price
                                                  : "-"}
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                                <Link
                                  to="stock-order-history"
                                  className="btn btn-primary btn-sm float-end"
                                >
                                  View All...
                                </Link>
                              </>
                            ) : (
                              <NoData title="No stock history here.." />
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
                  Are you sure you want to delete this Product?
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
        id="order-model"
        className="modal fade"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center mt-0 mb-2">
                <div className="auth-logo">
                  <h4 className="mt-4 text-primary text-start mb-0">
                    Add New Stock
                  </h4>
                  <hr />
                </div>
              </div>
              <form className="px-3 " onSubmit={handleSubmit(inventoryForm)}>
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label for="product_name" className="form-label">
                      Product
                    </label>
                    <select
                      className={` form-select                         }`}
                      {...register("product_id")}
                      value={watch()?.product_id}
                    >
                      <option value="" className="option">
                        Select Product
                      </option>
                      {productData?.map((item, index) => {
                        return (
                          <option value={item?.id} key={index + 1}>
                            {item?.name}
                          </option>
                        );
                      })}
                    </select>
                    {/* <select
                      className={` form-select                         }`}
                      {...register("product_id")}
                      value={watch()?.product_id}
                    >
                      <option value="" className="option">
                        Select Product
                      </option>
                      <option value="product 1" className="option">
                        Product 1
                      </option>
                    </select> */}
                  </div>
                  <div className="col-lg-6 mb-2">
                    <label for="order_price" className="form-label">
                      Total Order Price
                    </label>
                    <input
                      type="number"
                      {...register("total_price")}
                      className="form-control"
                      placeholder="Enter Total Order Price..."
                    />
                  </div>
                  <div className="col-lg-6 mb-2">
                    <label for="order_qty" className="form-label">
                      Order Qty.
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      {...register("quantity")}
                      placeholder="Enter Order Quantity..."
                    />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <label for="reception_date" className="form-label">
                      Reception Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      {...register("reception_date")}
                    />
                  </div>
                  <div className="mb-2 text-center">
                    <button className="btn btn-primary">Submit</button>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-outline-primary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
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

export default Inventory;
