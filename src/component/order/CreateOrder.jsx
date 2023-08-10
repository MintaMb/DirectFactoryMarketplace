import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "../../App";
import Spinner from "../common-component/Spinner";

const CreateOrder = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const { id } = useParams();
  const [rows, setRows] = useState([{}]);
  const { setSpinner, spinner } = useContext(GlobalContext);
  const [userData, setUserData] = useState([]);
  const [productData, setproductData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [gstTax, setGstTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [userShow, setUserShow] = useState(false);
  //===================  create product post api
  const orderForm = async (data) => {
    try {
      let formData = new FormData();
      formData.append("customer_id", watch()?.customer_id);
      formData.append("customer_mobile", watch()?.customer_mobile);
      formData.append("customer_address", watch()?.customer_address);

      // Append variations data to formData
      if (selectedProducts.length > 0) {
        const variations = selectedProducts.map((product) => ({
          product_id: product._id,
          quantity: product.quantity,
        }));
        formData.append("variations", JSON.stringify(variations));
      }

      const apiUrl = id
        ? `${process.env.REACT_APP_BASE_URL}/api/update_product`
        : `${process.env.REACT_APP_BASE_URL}/api/create_client_manual_order`;

      const response = await fetch(apiUrl, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        method: "POST",
        body: formData,
      });

      if (response?.status === 200) {
        reset();
        navigate("/order");
        toast.success(
          `${
            id ? "Product Updated successfully" : "Product created successfully"
          }`
        );
      } else if (response?.status === 401) {
        localStorage.clear();
        toast.success(`Session expired !`);
        navigate("/");
      } else if (response?.status >= 400) {
        const data = await response.json();
        toast.error(data?.message, {
          autoClose: 5000,
        });
      }
    } catch (errors) {
      console.error("An error occurred:", errors);
    }
  };
  // ================== get user list api
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
      }
    } catch (error) {
      setSpinner(false);
    }
  };
  useEffect(() => {
    userListing();
  }, []);
  // ================== get product list api
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

  // Function to add a new user
    const userForm = async (data) => {
      
    try {
      // Convert the permissions array to a JSON string and replace double quotes with single quotes
      const formattedPermissions = JSON.stringify(data.permissions).replace(
        /"/g,
        "'"
      );

      // Prepare the data to be sent in the request body
        const formattedData = {
        first_name: data.first_name,
        email: data.email,
        customer_mobile: data.customer_mobile,
        customer_address: data.customer_address,
      };
            debugger;

      // Make the API request to add a new user
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/create_client_customer`,
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
        setUserShow(false);
        toast.success(
          `${id ? "User Updated successfully" : "User added successfully"}`
        );
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
      }
  };
      console.log(watch(),"kkok");
  // multi add item ================
  const handleProductSelect = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = productData.find(
      (product) => product._id === selectedProductId
    );
    if (selectedProduct) {
      setSelectedProducts([...selectedProducts, selectedProduct]);
    }
  };

  const handleRemoveProduct = (productToRemove) => {
    const updatedProducts = selectedProducts.filter(
      (product) => product !== productToRemove
    );
    setSelectedProducts(updatedProducts);
  };

  const calculateSubtotal = () => {
    return selectedProducts.reduce(
      (acc, product) => acc + product.product_price,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const total = subtotal + gstTax - discount + shippingCharge;
    return total.toFixed(2);
  };
  const handleProductQuantityChange = (e, index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = parseInt(e.target.value, 10);
    setSelectedProducts(updatedProducts);
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
                    <h4 className="page-title">Create Order</h4>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div class="row">
                        <form
                          className="form"
                          onSubmit={handleSubmit(orderForm)}
                        >
                          <div className="mb-2 col-lg-6 input-group">
                            <label for="role" className="form-label">
                              Customer
                            </label>
                            <div className="input-group">
                              <select
                                className={` form-select }`}
                                {...register("customer_id")}
                                value={watch()?.customer_id}
                              >
                                <option value="" className="option">
                                  Select Product
                                </option>
                                {userData?.map((item, index) => {
                                  return (
                                    <option value={item?._id} key={index + 1}>
                                      {item?.first_name}
                                    </option>
                                  );
                                })}
                              </select>
                              <button
                                className="btn input-group-text btn-primary waves-effect waves-light"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#create-customer-model"
                              >
                                Add New
                              </button>
                            </div>
                          </div>
                          <div className="mb-2 col-lg-6">
                            <label for="role" className="form-label">
                              Mobile Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Mobile Number..."
                              onKeyPress={(offer) => {
                                if (!/[0-9]/.test(offer.key)) {
                                  offer.preventDefault();
                                }
                              }}
                              {...register("customer_mobile")}
                            />
                          </div>
                          <div className="mb-2 col-lg-6">
                            <label for="role" className="form-label">
                              Address
                            </label>
                            <input
                              {...register("customer_address")}
                              type="text"
                              className="form-control"
                              placeholder="Enter Customer Address..."
                            />
                          </div>
                          <hr class="mt-3" />
                          <div className="col-lg-11 mx-auto">
                            <div className="mb-2 mt-1">
                              {/* <select
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
                              </select> */}
                              <select
                                className="form-select"
                                onChange={handleProductSelect}
                              >
                                <option value="">Select Product</option>
                                {productData.map((item) => (
                                  <option value={item._id} key={item._id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="table-responsive">
                              <table className="table table-bordered mt-1">
                                <thead className="bg-light">
                                  <tr>
                                    <th width="60">SL</th>
                                    <th>Item</th>
                                    <th width="105">Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th width="60px">Remove</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedProducts.map((product, index) => {
                                    return (
                                      <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        {console.log(
                                          product.product_price *
                                            product.quantity,
                                          "kkk"
                                        )}
                                        <td>
                                          <input
                                            type="number"
                                            className="form-control"
                                            value={product.quantity}
                                            onChange={(e) =>
                                              handleProductQuantityChange(
                                                e,
                                                index
                                              )
                                            }
                                          />
                                        </td>
                                        <td>${product.sale_price}</td>
                                        <td>
                                          $
                                          {(
                                            product.product_price *
                                            product.quantity
                                          ).toFixed(2)}
                                        </td>
                                        <td className="text-center">
                                          <button
                                            className="btn btn-link text-danger"
                                            onClick={() =>
                                              handleRemoveProduct(product)
                                            }
                                          >
                                            <span className="mdi mdi-trash-can-outline mdi-24px"></span>
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                                {/* <tbody>
                                  <tr>
                                    <td>1. </td>
                                    <td>iPhone 9</td>
                                    <td>
                                      <input
                                        type="number"
                                        className="form-control"
                                        value="2"
                                      />
                                    </td>
                                    <td>$500.44 </td>
                                    <td>$1,000.88 </td>
                                    <td className="text-center">
                                      <a href="" className="text-danger">
                                        <span className="mdi mdi-trash-can-outline mdi-24px"></span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2. </td>
                                    <td>Huawei P30</td>
                                    <td>
                                      <input
                                        type="number"
                                        className="form-control"
                                        value="2"
                                      />
                                    </td>
                                    <td>$500.44 </td>
                                    <td>$1,000.88 </td>
                                    <td className="text-center">
                                      <a href="" className="text-danger">
                                        <span className="mdi mdi-trash-can-outline mdi-24px"></span>
                                      </a>
                                    </td>
                                  </tr>
                                </tbody> */}
                              </table>
                            </div>
                            <div className="table-responsive">
                              <table className="table mb-0">
                                <tbody>
                                  <tr>
                                    <th className="text-end">Total:</th>
                                    <td>${calculateSubtotal().toFixed(2)}</td>
                                  </tr>
                                  <tr>
                                    <th className="text-end">GST/Tax:</th>
                                    <td>
                                      <input
                                        type="number"
                                        value={gstTax}
                                        onChange={(e) =>
                                          setGstTax(parseFloat(e.target.value))
                                        }
                                        className="form-control"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="text-end">Discount:</th>
                                    <td>
                                      <input
                                        type="number"
                                        value={discount}
                                        onChange={(e) =>
                                          setDiscount(
                                            parseFloat(e.target.value)
                                          )
                                        }
                                        className="form-control"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="text-end">
                                      Shipping Charge:
                                    </th>
                                    <td>
                                      <input
                                        type="number"
                                        value={shippingCharge}
                                        onChange={(e) =>
                                          setShippingCharge(
                                            parseFloat(e.target.value)
                                          )
                                        }
                                        className="form-control"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="text-end">Grand Total:</th>
                                    <td>${calculateTotal()}</td>
                                  </tr>
                                </tbody>
                                {/* <tbody>
                                  <tr>
                                    <th className="text-end">Total :</th>
                                    <td width="130px">$1571.19</td>
                                  </tr>
                                  <tr>
                                    <th className="text-end">GST/TAX : </th>
                                    <td>
                                      <input
                                        type="number"
                                        value="500"
                                        className="form-control"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="text-end">Discount : </th>
                                    <td>
                                      <input
                                        type="number"
                                        value="40"
                                        className="form-control"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="text-end">
                                      Shipping Charge :{" "}
                                    </th>
                                    <td>
                                      <input
                                        type="number"
                                        value="25"
                                        className="form-control"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="text-end">Grand Total :</th>
                                    <th>$1458.3</th>
                                  </tr>
                                </tbody> */}
                              </table>
                            </div>
                            <div className="row mb-3 mt-3">
                              <div className="col-lg-2"></div>
                              <div className="col-lg-4">
                                <button
                                  className="btn btn-danger w-100"
                                  data-bs-dismiss="modal"
                                >
                                  Cancel Order
                                </button>
                              </div>
                              <div className="col-lg-4">
                                <button className="btn btn-primary w-100">
                                  Confirm Order
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="create-customer-model"
          className="modal fade"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center mt-2 mb-2">
                  <div className="auth-logo">
                    <h4 className="mt-4 text-primary text-start mb-0">
                      Create New Customer
                    </h4>
                    <hr className="mb-0" />
                  </div>
                </div>
                <form className="px-3 row" onSubmit={handleSubmit(userForm)}>
                  <div className="mb-2 col-lg-12">
                    <label for="role" className="form-label">
                      Customer
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
                    <label for="role" className="form-label">
                      Mobile Number
                    </label>

                    <input
                      className="form-control"
                      type="mobile_number"
                      {...register("customer_mobile")}
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
                    <label for="role" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Customer Address..."
                      {...register("customer_address")}
                    />
                  </div>
                  <div className="col-lg-2"></div>
                  <div className="col-lg-4">
                    <button
                      className="btn btn-danger w-100 mt-3 mb-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel Order
                    </button>
                  </div>
                  <div className="col-lg-4">
                    <button className="btn btn-primary w-100 mt-3 mb-2">
                      Confirm Order
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

export default CreateOrder;
