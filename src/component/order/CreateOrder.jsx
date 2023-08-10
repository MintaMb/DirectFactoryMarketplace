import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "../../App";
import Spinner from "../common-component/Spinner";
import NoData from "../common-component/NoData";

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
  // const { id } = useParams();
  const { setSpinner, spinner } = useContext(GlobalContext);
  const [userData, setUserData] = useState([]);
  const [productData, setproductData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [gstTax, setGstTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [userShow, setUserShow] = useState(false);
  // modal show/Hide  functions
  const showUserModal = () => {
    setUserShow(true);
  };

  const hideUserModal = () => {
    setUserShow(false);
  };
  //===================  create product post api
  const orderForm = async (data) => {
    setSpinner(true);
    let clientUserData = JSON.parse(localStorage.getItem("userData"));
    let variations = [];
    if (selectedProducts.length > 0) {
      variations = selectedProducts.map((product) => ({
        product_id: product._id,
        quantity: product.quantity,
      }));
    }

    try {
      const formattedData = {
        factory_id: clientUserData?.factory_id,
        customer_id: data.customer_id,
        customer_name: userData.find((user) => user._id === data.customer_id)
          .first_name,
        customer_mobile: data["customerMobile"],
        customer_address: data["address"],
        total_order_price: calculateSubtotal(),
        gst: gstTax,
        discount,
        shipping_charges: shippingCharge,
        grand_total: calculateTotal(),
        orderItems: JSON.stringify(variations),
      };
      // Make the API request to add a new user
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/create_client_manual_order`,
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
        navigate("/order/manual-order-input");
        toast.success("Order added successfully");
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
      setSpinner(false);
    }
    setSpinner(false);
  };
  const handleCustomerChange = (customerId) => {
    const selectedCustomer = userData.find((user) => user._id === customerId);

    if (selectedCustomer) {
      setValue("customerMobile", selectedCustomer.phone || "");
      setValue("address", selectedCustomer.address || "");
    }
  };
  // ================== get user list api
  const userListing = async () => {
    setSpinner(true);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/all_client_customers`,
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
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/create_client_customer`;
      const formattedData = {
        name: data["customerName"],
        phone: data["customePhone"],
        address: data["customerAddress"],
      };

      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        method: "POST",
        body: JSON.stringify(formattedData),
      });

      if (response?.status === 200) {
        hideUserModal();
        toast.success("New user Added !");
      } else {
        const responseData = await response.json();
        console.error("Error response:", responseData);
        // ... handle error ...
        toast.error(responseData?.message || "An error occurred", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle any additional error handling here
    }
  };
  // multi add item ================
  const handleProductSelect = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = productData.find(
      (product) => product._id === selectedProductId
    );

    if (selectedProduct) {
      setSelectedProducts([...selectedProducts, selectedProduct]);

      // Remove the selected product from productData
      setproductData(
        productData.filter((product) => product._id !== selectedProductId)
      );
    }
  };
  const handleRemoveProduct = (productToRemove) => {
    const updatedProducts = selectedProducts.filter(
      (product) => product !== productToRemove
    );
    setSelectedProducts(updatedProducts);

    // Add the removed product back to productData
    setproductData([...productData, productToRemove]);
  };
  const calculateItemGrandTotal = (product) => {
    if (product?.quantity) {
      return (product?.sale_price * product?.quantity).toFixed(2);
    }
    return product?.sale_price;
  };

  const calculateSubtotal = () => {
    let total = 0;
    for (var i = 0; i < selectedProducts.length; i++) {
      selectedProducts[i].quantity
        ? (total +=
            selectedProducts[i].sale_price * selectedProducts[i].quantity)
        : (total += selectedProducts[i].sale_price * 1);
    }
    return total;
  };

  // const calculateSubtotal = useMemo(() => {
  //   return selectedProducts.reduce(
  //     (acc, product) => acc + product.sale_price,
  //     0
  //   );
  // }, [selectedProducts]);

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const total = subtotal + gstTax - discount + shippingCharge;
    return total.toFixed(2);
  };
  const handleProductQuantityChange = (e, index) => {
    setSelectedProducts();
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = parseInt(e.target.value, 10);
    setSelectedProducts(updatedProducts);
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
                    <h4 className='page-title'>Create Order</h4>
                  </div>
                </div>
              </div>
              <div class='row'>
                <div class='col-lg-12'>
                  <div class='card'>
                    <div class='card-body'>
                      <div class='row'>
                        <form
                          className='form row'
                          onSubmit={handleSubmit(orderForm)}>
                          <div className='mb-2 col-lg-6 input-group'>
                            <label for='role' className='form-label'>
                              Customer
                              <span className='text-danger'> *</span>
                            </label>
                            <div className='input-group'>
                              <select
                                className={`form-select`}
                                {...register(
                                  "customer_id"
                                  // , { required: true }
                                )}
                                // value={watch("customer_id")}
                                onChange={(e) =>
                                  handleCustomerChange(e.target.value)
                                }>
                                <option value='' className='option'>
                                  Select Customer
                                </option>
                                {userData?.map((item) => (
                                  <option value={item._id} key={item._id}>
                                    {item.first_name}
                                  </option>
                                ))}
                              </select>

                              <button
                                className='btn input-group-text btn-primary waves-effect waves-light'
                                type='button'
                                onClick={showUserModal} // Changed from data-bs-toggle and data-bs-target
                              >
                                Add New
                              </button>
                            </div>
                            {errors?.customer_id?.type === "required" && (
                              <p role='alert' className='alert-msg text-danger'>
                                Required !
                              </p>
                            )}
                          </div>
                          <div className='mb-2 col-lg-6'>
                            <label for='role' className='form-label'>
                              Mobile Number
                              <span className='text-danger'> *</span>
                            </label>
                            <input
                              {...register("customerMobile", {
                                // required: true,
                              })}
                              type='text'
                              className='form-control'
                              placeholder='Enter Mobile Number...'
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                            />
                            {errors?.customerMobile?.type === "required" && (
                              <p role='alert' className='alert-msg text-danger'>
                                Required !
                              </p>
                            )}
                          </div>
                          <div className='mb-2 col-lg-6'>
                            <label for='role' className='form-label'>
                              Address
                              <span className='text-danger'> *</span>
                            </label>

                            <input
                              {...register("address", { required: "" })}
                              type='text'
                              className='form-control'
                              placeholder='Enter Customer Address...'
                            />
                            {errors?.address?.type === "required" && (
                              <p role='alert' className='alert-msg text-danger'>
                                Required !
                              </p>
                            )}
                          </div>

                          <hr class='mt-3' />
                          <div className='col-lg-11 mx-auto'>
                            <div className='mb-2 mt-1'>
                              <select
                                className='form-select'
                                onChange={handleProductSelect}>
                                <option value=''>Select Product</option>
                                {productData.map((item) => (
                                  <option value={item._id} key={item._id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className='table-responsive'>
                              {selectedProducts?.length > 0 ? (
                                <table className='table table-bordered mt-1'>
                                  <thead className='bg-light'>
                                    <tr>
                                      <th width='60'>SL</th>
                                      <th>Item</th>
                                      <th width='105'>Qty</th>
                                      <th>Price</th>
                                      <th>Total</th>
                                      <th width='60px'>Remove</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedProducts.map((product, index) => {
                                      return (
                                        <tr key={product._id}>
                                          <td>{index + 1}</td>
                                          <td>{product.name}</td>
                                          <td>
                                            <input
                                              type='number'
                                              className='form-control'
                                              min={1} // Minimum quantity value
                                              max={9999} // Maximum quantity value
                                              defaultValue={1} // Set the default value to 1
                                              value={product.quantity}
                                              onChange={(e) => {
                                                const newValue = parseInt(
                                                  e.target.value,
                                                  10
                                                );
                                                if (newValue !== 0) {
                                                  handleProductQuantityChange(
                                                    e,
                                                    index,
                                                    product
                                                  );
                                                }
                                              }}
                                            />
                                          </td>
                                          <td>${product.sale_price}</td>
                                          <td>
                                            ${calculateItemGrandTotal(product)}
                                          </td>
                                          <td className='text-center'>
                                            <button
                                              className='btn btn-link text-danger'
                                              onClick={() =>
                                                handleRemoveProduct(product)
                                              }>
                                              <span className='mdi mdi-trash-can-outline mdi-24px'></span>
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              ) : (
                                <NoData title='Select product to show product list here.... ' />
                              )}
                            </div>
                            {selectedProducts?.length > 0 && (
                              <div className='table-responsive'>
                                <table className='table mb-0'>
                                  <tbody>
                                    <tr>
                                      <th className='text-end'>Total:</th>
                                      {/* <td width="130px">${calculateSubtotal().toFixed(2)}</td> */}
                                      <td width='130px'>
                                        $
                                        {Number(calculateSubtotal()).toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className='text-end'>GST/Tax:</th>
                                      <td>
                                        <input
                                          type='number'
                                          value={gstTax}
                                          onChange={(e) =>
                                            setGstTax(
                                              parseFloat(e.target.value)
                                            )
                                          }
                                          className='form-control'
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className='text-end'>Discount:</th>
                                      <td>
                                        <input
                                          type='number'
                                          value={discount}
                                          onChange={(e) =>
                                            setDiscount(
                                              parseFloat(e.target.value)
                                            )
                                          }
                                          className='form-control'
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className='text-end'>
                                        Shipping Charge:
                                      </th>
                                      <td>
                                        <input
                                          type='number'
                                          value={shippingCharge}
                                          onChange={(e) =>
                                            setShippingCharge(
                                              parseFloat(e.target.value)
                                            )
                                          }
                                          className='form-control'
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className='text-end'>Grand Total:</th>
                                      <td>${calculateTotal()}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            )}
                            <div className='row mb-3 mt-3'>
                              <div className='col-lg-2'></div>
                              <div className='col-lg-4'>
                                <button
                                  className='btn btn-danger w-100'
                                  // data-bs-dismiss="modal"
                                >
                                  Cancel Order
                                </button>
                              </div>
                              <div className='col-lg-4'>
                                <button className='btn btn-primary w-100'>
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

        {/* ========modal  */}
        {userShow && (
          <div
            id='create-customer-model'
            className={`modal ${userShow ? "d-flex show-modal" : ""} `}
            tabindex='-1'
            role='dialog'
            aria-hidden='true'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-body'>
                  <div className='text-center mt-2 mb-2'>
                    <div className='auth-logo'>
                      <h4 className='mt-4 text-primary text-start mb-0'>
                        Create New Customer
                      </h4>
                      <hr className='mb-0' />
                    </div>
                  </div>
                  <form className='px-3 row' onSubmit={handleSubmit(userForm)}>
                    <div className='mb-2 col-lg-12'>
                      <label for='role' className='form-label'>
                        Customer
                      </label>
                      <input
                        className='form-control'
                        {...register("customerName")}
                        type='name'
                        required=''
                        placeholder='Enter Name..'
                      />
                    </div>
                    <div className='mb-2 col-lg-6'>
                      <label for='role' className='form-label'>
                        Mobile Number
                      </label>
                      <input
                        className='form-control'
                        {...register("customePhone")}
                        type='text'
                        required=''
                        onKeyPress={(offer) => {
                          if (!/[0-9]/.test(offer.key)) {
                            offer.preventDefault();
                          }
                        }}
                        id='mobile_number'
                        placeholder='Enter Mobile Number..'
                      />
                    </div>
                    <div className='mb-2 col-lg-6'>
                      <label for='role' className='form-label'>
                        Address
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Enter Customer Address...'
                        {...register("customerAddress")}
                      />
                    </div>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-4'>
                      <button
                        className='btn btn-danger w-100 mt-3 mb-2'
                        data-bs-dismiss='modal'
                        type='button'
                        onClick={() => {
                          reset();
                          hideUserModal();
                        }}>
                        Cancel
                      </button>
                    </div>
                    <div className='col-lg-4'>
                      <button
                        className='btn btn-primary w-100 mt-3 mb-2'
                        disabled={orderForm}>
                        Add
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

export default CreateOrder;
