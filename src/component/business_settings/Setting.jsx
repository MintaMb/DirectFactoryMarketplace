import React, { useEffect, useState } from "react";
// import Header from "./dashboard_layout/Header";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Setting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  let user = JSON.parse(localStorage.getItem("userData"));

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
  useEffect(() => {
    callCountry();
  }, []);
  // console.log(countries);

  // ================================================== establishment_type

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
    callEstablishment();
  }, []);
  // console.log(establishment);

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

  useEffect(() => {
    callProduct();
  }, []);
  console.log(product);

  // ================================== Edit Business setting
  const [dataSetting, setDataSetting] = useState([]);
  const callAPI = async () => {
    try {
      const res = await fetch(
        ` ${process.env.REACT_APP_BASE_URL}/api/edit_client_business/${user.company_id}`,
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
        setDataSetting(data?.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   callAPI();
  // }, []);

  console.log(dataSetting);

  // ==================================Update Bussiness settings
  const formSubmit = async (data) => {
    console.log(data);
    console.log(user.company_id);

    try {
      let formData = new FormData();
      formData.append("client_id", user?.company_id);
      formData.append("business_name", data?.business_name);
      formData.append("phone_no", data?.phone_no);
      formData.append("email", data?.email);
      formData.append("address", data?.address);
      formData.append("director_name", data?.director_name);
      formData.append("director_phone", data?.director_phone);
      formData.append("director_email", data?.director_email);
      formData.append("contact_person_name", data?.contact_person_name);
      formData.append("contact_person_phone", data?.contact_person_phone);
      formData.append("contact_person_email", data?.contact_person_email);
      formData.append("establishment_type", data?.establishment_type);
      formData.append("product_type", data?.product_type);
      formData.append("no_of_employees", data?.no_of_employees);
      formData.append("existing_market", data?.existing_market);
      formData.append("last_year_selling", data?.last_year_selling);
      formData.append("selling_country", data?.selling_country);
      formData.append("logo", data?.logo[0]);

      console.log(formData);
      const response = await fetch(
        ` ${process.env.REACT_APP_BASE_URL}/api/update_client_business`,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
          method: "POST",
          body: formData,
        }
      );
      if (response?.status === 200) {
        let data = await response.json();

        toast.success(data?.message, {
          autoClose: 2000,
        });
      } else {
        const data = await response.json();
        toast.error(data?.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id='wrapper'>
      <div className='content-page'>
        <div className='content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='page-title-box'>&nbsp;</div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='card'>
                  <div className='card-body'>
                    <h4 className='page-title'>Business Settings</h4>
                    <hr className='mb-2' />
                    <form className='row' onSubmit={handleSubmit(formSubmit)}>
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
                        {errors?.contact_person_phone?.type === "required" && (
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
                        {errors?.contact_person_email?.type === "required" && (
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
                          })}>
                          {/* establishment listing ================================================================ */}
                          <option value=''>Select Establishment</option>
                          {establishment?.map((item, index) => {
                            return (
                              <option key={index} value={item?.name}>
                                {item?.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className='col-lg-4 mb-2'>
                        <label>
                          Types of Products
                          <span className='text-danger'>*</span>
                        </label>
                        <select
                          className='form-select'
                          {...register("product_type", { required: true })}>
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
                          {...register("last_year_selling", { required: true })}
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
                          {...register("selling_country")}>
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
                          {...register("logo", { required: true })}
                        />
                        {errors?.logo?.type === "required" && (
                          <p role='alert' className='alert-msg text-danger'>
                            Logo is required
                          </p>
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
        {/* <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6"> </div>
              <div className="col-md-6">
                © <a href>Direct Factory Marketplace</a>
              </div>
            </div>
          </div>
        </footer> */}
      </div>
    </div>
  );
};

export default Setting;
