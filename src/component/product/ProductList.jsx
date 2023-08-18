import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../common-component/Spinner";
import { GlobalContext } from "../../App";
import placeholder from "../../assets/images/placeholder.png"; //placeholderimg
import NoData from "../common-component/NoData";
import { toast } from "react-toastify";

const ProductList = () => {
  const navigate = useNavigate();
  const [productData, setproductData] = useState([]);
  const { setSpinner, spinner } = useContext(GlobalContext);
  const [productId, setProductId] = useState([]);
  const [deleteShow, setDShow] = useState(false);
  // ================== get list api
  const productListing = async () => {
    setSpinner(true);
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
  // ============== delete product
  const deleteProduct = async () => {
    setSpinner(true);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/status_product/deactivate/${productId}`,
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
        productListing();
        toast.success("Product deleted");
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
                    <h4 className='page-title'>Products List</h4>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='card'>
                    <div className='card-body'>
                      <div class='row'>
                        <div className='col-lg-8 mb-2'>
                          <h5>Products</h5>
                        </div>
                        <div className='col-lg-4 text-end mb-2'>
                          <Link
                            to='/inventory/create-product'
                            className='btn btn-primary'>
                            Add New Product
                          </Link>
                          <button className='btn btn-primary mx-2'>
                            Print Report
                          </button>
                        </div>
                        <div className='col-lg-12'>
                          <div className='table-responsive'>
                            {productData?.length > 0 ? (
                              <table className='table dt-responsive nowrap w-100 dataTable dtr-inline border'>
                                <thead className='bg-light'>
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
                                  {productData?.map((item, index) => {
                                    return (
                                      <tr>
                                        <td>{index + 1} </td>
                                        <td>
                                          {item?.image ? (
                                            <img
                                              src={item?.image}
                                              alt='contact-img'
                                              title='contact-img'
                                              className='avatar-sm img-thumbnail'
                                            />
                                          ) : (
                                            <img
                                              src={placeholder}
                                              alt='contact-img'
                                              title='contact-img'
                                              className='avatar-sm img-thumbnail'
                                            />
                                          )}
                                          &nbsp;&nbsp;
                                          {item?.name ? item?.name : "-"}
                                        </td>
                                        <td>
                                          {/* {item?.cost}   */}
                                          {typeof item?.cost === "string"
                                            ? parseFloat(item?.cost).toFixed(1)
                                            : "N/A"}
                                        </td>
                                        <td>
                                          {/* { item?.sale_price} */}
                                          {typeof item?.sale_price === "string"
                                            ? parseFloat(
                                                item.sale_price
                                              ).toFixed(1)
                                            : "N/A"}
                                        </td>
                                        <td>
                                          {item?.is_approved === true ? (
                                            <label className='badge badge-soft-success'>
                                              Approved
                                            </label>
                                          ) : (
                                            <label className='badge badge-soft-danger'>
                                              Not Approved
                                            </label>
                                          )}
                                        </td>
                                        <td>
                                          {item?.status === true ? (
                                            <button className='btn btn-success btn-sm'>
                                              Active
                                            </button>
                                          ) : (
                                            <button className='btn btn-danger btn-sm'>
                                              Not Active
                                            </button>
                                          )}
                                        </td>

                                        <td width='180px'>
                                          <button
                                            onClick={() =>
                                              navigate(
                                                `/inventory/product-details/${item?._id}`,
                                                {
                                                  state: item,
                                                }
                                              )
                                            }
                                            className='btn btn-primary btn-sm mx-1'>
                                            <span className='mdi mdi-eye'></span>
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
                                            className='btn btn-primary btn-sm mx-1'>
                                            <span className='mdi mdi-square-edit-outline'></span>
                                          </button>
                                          <button
                                            className='btn btn-primary btn-sm mx-0'
                                            data-bs-toggle='modal'
                                            data-bs-target='#delete-alert-modal'
                                            onClick={() => {
                                              setDShow(true);
                                              setProductId(item?._id);
                                            }}>
                                            <span className='mdi mdi-trash-can-outline'></span>
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            ) : (
                              <NoData title='No product data..' />
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
                  Are you sure you want to delete this Product?
                </p>
                <button
                  type='button'
                  className='btn btn-light my-2'
                  data-bs-dismiss='modal'
                  onClick={() => {
                    setDShow(false);
                    deleteProduct();
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
      <div
        id='order-model'
        className='modal fade'
        tabindex='-1'
        role='dialog'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-body'>
              <div className='text-center mt-0 mb-2'>
                <div className='auth-logo'>
                  <h4 className='mt-4 text-primary text-start mb-0'>
                    Add New Stock
                  </h4>
                  <hr />
                </div>
              </div>
              <form className='px-3 ' action='#'>
                <div className='row'>
                  <div className='col-lg-12 mb-2'>
                    <label for='product_name' className='form-label'>
                      Product
                    </label>
                    <select className='form-select'>
                      <option value=''>Running Shoes</option>
                    </select>
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label for='order_price' className='form-label'>
                      Total Order Price
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Enter Total Order Price...'
                    />
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label for='order_qty' className='form-label'>
                      Order Qty.
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Enter Order Quantity...'
                    />
                  </div>
                  <div className='col-lg-12 mb-3'>
                    <label for='reception_date' className='form-label'>
                      Reception Date
                    </label>
                    <input type='date' className='form-control' />
                  </div>
                  <div className='mb-2 text-center'>
                    <button className='btn btn-primary'>Submit</button>
                    &nbsp;&nbsp;
                    <button
                      className='btn btn-outline-primary'
                      data-bs-dismiss='modal'>
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

export default ProductList;
