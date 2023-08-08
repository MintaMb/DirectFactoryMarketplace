import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../common-component/Spinner";
import { GlobalContext } from "../../App";
import placeholder from "../../assets/images/placeholder.png"; //placeholderimg
import NoData from "../common-component/NoData";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const InventoryListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventoryData, setinventoryData] = useState([]);
  const [productData, setproductData] = useState([]);
  const [prduct, setProduct] = useState();
  const { setSpinner, spinner } = useContext(GlobalContext);
  const [inventoryShow, setInventoryShow] = useState(false);
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
    setSpinner(true);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/view_all_inventories`,
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
        setinventoryData(data?.data);
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
const inventoryForm = async (data, id) => {
  try {
    const formattedData = {
      product_id: data.product_id,
      reception_date: data.reception_date,
      quantity: data.quantity,
      total_price: data.total_price,
    };

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/add_stock_history`,
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
      setTimeout(() => {
        // You might want to do something here
      }, 500);
      setProduct(); // Define the setProduct() function
      toast.success(
        `${id ? "Stock Updated successfully" : "Stock created successfully"}`
      );
    } else if (response.status === 401) {
      localStorage.clear();
      toast.error(`Session expired !`);
      navigate("/"); // Redirect to the login page
    } else {
      toast.error(responseData?.message || "An error occurred", {
        autoClose: 5000,
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle any additional error handling here
  }
};
  useEffect(() => {
    if (prduct) {
      setValue("product_id", prduct._id);
      setValue("total_price", prduct.total_price);
      setValue("quantity", prduct.quantity);
      setValue("reception_date", prduct.reception_date);
    }
  }, [prduct]);

  return (
    <>
      {spinner && <Spinner />}
      <div id="wrapper">
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              {/* <div className="row">
                <div className="col-12">
                  <div className="page-title-box">
                    <h4 className="page-title">Products List</h4>
                  </div>
                </div>
              </div> */}
              <div className="row mt-4">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div class="row">
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
                            {inventoryData?.length > 0 ? (
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
                                    {inventoryData?.map((item, index) => {
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
                                            {item?.stock}
                                          </td>
                                          <td width="180px">
                                            <button
                                              className="btn btn-primary btn-sm"
                                              data-bs-toggle="modal"
                                              data-bs-target="#order-model"
                                              onClick={() => {
                                                setInventoryShow(true);
                                                setProduct(item);
                                              }}
                                            >
                                              Order More
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </>
                            ) : (
                              <NoData title="No product data.." />
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

      {/* ==== inventory modal */}
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
                      className={` form-select }`}
                      {...register("product_id")}
                      value={watch()?.product_id}
                    >
                      <option value="" className="option">
                        Select Product
                      </option>
                      {productData?.map((item, index) => {
                        return (
                          <option value={item?._id} key={index + 1}>
                            {item?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <label for="order_price" className="form-label">
                      Total Order Price
                    </label>
                    <input
                      type="number"
                      {...register("total_price")}
                      // value={prduct?.total_price || ""}
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
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setInventoryShow(false);
                      }}
                    >
                      Submit
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-bs-dismiss="modal"
                      onClick={() => reset()}
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

export default InventoryListing;
