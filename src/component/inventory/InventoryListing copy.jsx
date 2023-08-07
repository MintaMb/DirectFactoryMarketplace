import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../common-component/Spinner";
import { GlobalContext } from "../../App";
import placeholder from "../../assets/images/placeholder.png"; //placeholderimg
import NoData from "../common-component/NoData";
import { toast } from "react-toastify";

const InventoryListing = () => {
  const navigate = useNavigate();
  const [inventoryData, setinventoryData] = useState([]);
  const { setSpinner, spinner } = useContext(GlobalContext);
  // ================== get list api
  const inventoryListing = async () => {
    setSpinner(true);
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
              <form className="px-3 " action="#">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label for="product_name" className="form-label">
                      Product
                    </label>
                    <select className="form-select">
                      <option value="">Running Shoes</option>
                    </select>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <label for="order_price" className="form-label">
                      Total Order Price
                    </label>
                    <input
                      type="number"
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
                      placeholder="Enter Order Quantity..."
                    />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <label for="reception_date" className="form-label">
                      Reception Date
                    </label>
                    <input type="date" className="form-control" />
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

export default InventoryListing;
