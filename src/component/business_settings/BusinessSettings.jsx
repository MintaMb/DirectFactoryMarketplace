import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../App";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Spinner from "../common-component/Spinner";

const BusinessSettings = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });
  const id = useParams();
  const { spinner, setSpinner } = useContext(GlobalContext);
  const [businessLogo, setBusinessLogo] = useState(null);
  const [existingLogoUrl, setExistingLogoUrl] = useState(null); // Updated

  // ================== update business detail api
  const editBusinessData = async (data) => {
    setSpinner(true);
    let userData = JSON.parse(localStorage.getItem("userData"));
    let token = localStorage.getItem("Token");
    let formData = new FormData();
    data = {
      ...data,
      client_id: userData.company_id,
    };
    Object.keys(data)?.forEach((item) => {
      formData.append(`${item}`, data[item]);
    });
    if (businessLogo) {
      formData.append("logo", businessLogo);
    }
    console.log(formData, "formData");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/update_client_business`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: formData,
        }
      );
      if (response?.status === 200) {
        setSpinner(false);
        window.reload();
        toast.success("Business detail updated successfully");
      } else if (response?.status >= 401) {
        const data = await response.json();
        toast.error(data?.message, {
          autoClose: 5000,
        });
      }
    } catch (error) {
      setSpinner(false);
    }
    setSpinner(false);
  };
  const handleLogoChange = (event) => {
    const selectedFile = event.target.files[0];
    setBusinessLogo(selectedFile);
    setValue("logo", undefined);
  };

  // ================== get  list api
  const updateFormValues = (data, setValue) => {
    Object.keys(data).forEach((key) => {
      setValue(key, data[key]);
    });
    if (existingLogoUrl) {
      setValue("logo", existingLogoUrl);
    }
  };
  const getBusinessDetail = async () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/edit_client_business/${userData.company_id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          method: "GET",
        }
      );
      if (response?.status === 200) {
        const data = await response.json();
        updateFormValues(data?.data, setValue);
        setExistingLogoUrl(data?.data.logo);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  // ================================================== establishment_typex`
  const [establishment, setEstablishment] = useState([]);
  const callEstablishment = async () => {
    try {
      const res = await fetch(
        ` ${process.env.REACT_APP_BASE_URL}/admin/establishment_types`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          method: "GET",
        }
      );
      if (res?.status === 200) {
        const data = await res.json();
        setEstablishment(data?.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getBusinessDetail();
    }
    callEstablishment();
    callCountry();
    callProduct();
  }, []);

  // ========================================= product_type
  const [product, setProduct] = useState([]);
  const callProduct = async () => {
    try {
      const res = await fetch(
        ` ${process.env.REACT_APP_BASE_URL}/admin/type_of_products`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          method: "GET",
        }
      );
      if (res?.status === 200) {
        const data = await res.json();
        setProduct(data?.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //===============================================All cuntries
  const [countries, setCountries] = useState([]);
  const callCountry = async () => {
    try {
      const res = await fetch(
        ` ${process.env.REACT_APP_BASE_URL}/admin/all_countries`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          method: "GET",
        }
      );
      if (res?.status === 200) {
        const data = await res.json();
        setCountries(data?.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
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
                <div className='col-lg-12'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='page-title'>Business Settings</h4>
                      <hr className='mb-2' />

                      <form
                        className='row'
                        onSubmit={handleSubmit(editBusinessData)}>
                        <div className='col-lg-4 mb-2'>
                          <label>Business Name </label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Business Name'
                            {...register("business_name", { required: true })}
                          />
                          {errors?.business_name?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Business Name is required
                            </p>
                          )}
                        </div>

                        <div className='col-lg-4 mb-2'>
                          <label>Phone Number </label>
                          <input
                            type='number'
                            className='form-control'
                            placeholder='Phone Number '
                            {...register("phone_no", {
                              required: true,
                            })}
                          />
                          {errors?.phone_no?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Phone number is required
                            </p>
                          )}
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Email ID </label>
                          <input
                            type='email'
                            className='form-control'
                            placeholder=' Email ID'
                            {...register("email", { required: true })}
                          />

                          {errors?.email?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Email is required
                            </p>
                          )}
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Address </label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Address'
                            {...register("address", { required: true })}
                          />
                          {errors?.address?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Address is required
                            </p>
                          )}
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Contact Person Name</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Contact Person Name'
                            {...register("contact_person_name", {
                              required: true,
                            })}
                          />
                          {errors?.contact_person_name?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Contact Person Name is required
                            </p>
                          )}
                        </div>

                        <div className='col-lg-4 mb-2'>
                          <label>Contact Person Mobile Number </label>
                          <input
                            type='number'
                            className='form-control'
                            placeholder='Contact Person Mobile Number '
                            {...register("contact_person_phone", {
                              required: true,
                            })}
                          />
                          {errors?.contact_person_phone?.type ===
                            "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Contact Person Phone is required
                            </p>
                          )}
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Contact Person Email </label>
                          <input
                            type='email'
                            className='form-control'
                            placeholder='business@gmail.com'
                            {...register("contact_person_email", {
                              required: true,
                            })}
                          />
                          {errors?.contact_person_email?.type ===
                            "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Contact Person Email is required
                            </p>
                          )}
                        </div>

                        <div className='col-lg-4 mb-2'>
                          <label>Director Name </label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Director Name'
                            {...register("director_name", {
                              required: true,
                            })}
                          />
                          {errors?.director_name?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Director Name is required
                            </p>
                          )}
                        </div>

                        <div className='col-lg-4 mb-2'>
                          <label>Director Mobile Number </label>
                          <input
                            type='number'
                            className='form-control'
                            placeholder='Director Mobile Number '
                            {...register("director_phone", { required: true })}
                          />
                          {errors?.director_phone?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Director Phone is required
                            </p>
                          )}
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Director Email ID </label>
                          <input
                            type='email'
                            className='form-control'
                            placeholder='Director Email ID'
                            {...register("director_email", { required: true })}
                          />

                          {errors?.director_email?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Director Email is required
                            </p>
                          )}
                        </div>

                        <div className='col-lg-4 mb-2'>
                          <label>
                            Types of Establishment
                            <span className='text-danger'>*</span>
                          </label>
                          <select
                            className='form-select'
                            {...register("establishment_type", {
                              required: true,
                            })}
                            value={watch("establishment_type")}>
                            <option value=''>Select Establishment</option>
                            {establishment.map((item) => (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>
                            Types of Products
                            <span className='text-danger'>*</span>
                          </label>
                          <select
                            className='form-select'
                            {...register("product_type", { required: true })}
                            value={watch("product_type")}>
                            {/* product listing ====================================================================== */}
                            <option value=''>Select Products</option>
                            {product?.map((item, index) => {
                              return (
                                <option key={index} value={item?.name}>
                                  {item?.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Number of Employee </label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Number of Employee'
                            {...register("no_of_employees", { required: true })}
                          />
                          {errors?.no_of_employees?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Number of Employee is required
                            </p>
                          )}
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Existing Market </label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Existing Market'
                            {...register("existing_market", { required: true })}
                          />
                          {errors?.existing_market?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Existing market is required
                            </p>
                          )}
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Selling Last Year </label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Selling Last Year'
                            {...register("last_year_selling", {
                              required: true,
                            })}
                          />
                          {errors?.last_year_selling?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Last year selling is required
                            </p>
                          )}
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>
                            Country
                            <span className='text-danger'>*</span>
                          </label>
                          <select
                            className='form-select'
                            {...register("selling_country")}
                            value={watch("selling_country")}>
                            {/* country Listing ===================================================================  */}
                            <option value=''>Select Country</option>
                            {countries?.map((item, index) => {
                              return (
                                <option key={index} value={item?.name}>
                                  {item?.name}
                                </option>
                              );
                            })}
                          </select>
                          {errors?.selling_country?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              country is required
                            </p>
                          )}
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Logo </label>
                          <input
                            type='file'
                            className='form-control'
                            {...register("logo", {
                              required: !existingLogoUrl, // Only required if no existing logo
                            })}
                            onChange={handleLogoChange}
                            accept='image/png, image/gif, image/jpeg'
                          />
                          {errors?.logo?.type === "required" && (
                            <p role='alert' className='alert-msg text-danger'>
                              Logo is required
                            </p>
                          )}
                        </div>
                        <div className='col-lg-4'>
                          {existingLogoUrl && (
                            <img
                              src={existingLogoUrl}
                              alt='Existing Logo'
                              style={{ maxWidth: "100px" }} // Adjust as needed
                            />
                          )}
                        </div>
                        <div className='col-lg-12 mb-2 text-center mt-2'>
                          <button className='btn btn-primary'>
                            Save Changes
                          </button>
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
    </>
  );
};

export default BusinessSettings;
