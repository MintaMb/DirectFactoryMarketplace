import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const CreateProduct = () => {
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
  const [editProduct, seteditProduct] = useState();
  //===================  create product post api
  const productForm = async (data) => {
    try {
      let formData = new FormData();
      data = {
        ...data,
      };
      Object.keys(data)?.forEach((item) => {
        formData.append(`${item}`, data[item]);
      });
      console.log(data, "data");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/add_product${
          id ? "/" + id : ""
        }`,
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
        if (data?.errors) {
          let error = Object.keys(data?.errors)?.reverse();
          for (let i = 0; i <= error?.length; i++) {
            if (data?.errors[error[i]]?.length) {
              toast.error(data?.errors[error[i]][0], {
                autoClose: 5000,
              });
            }
          }
        }
      }
    } catch (errors) {
      console.error("An error occurred:", errors);
    }
  };
  // ================== get product list api
  const offerListing = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/product_detail${
          id ? "/" + id : ""
        }`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          method: "GET",
        }
      );

      if (response?.status === 200) {
        const data = await response.json(); // Fixed typo "response.jso" to "response.json()"
        seteditProduct(data?.data); // Assuming "data.data" is where the user details are in the API response
        // debugger
        setValue("name", data?.data?.name);
        setValue("description", data?.data?.description);
        setValue("sku", data?.data?.sku);
        setValue("unit", data?.data?.unit);
        setValue("images", data?.data?.images);
        setValue("cost", data?.data?.cost);
        setValue("sale_price", data?.data?.sale_price);
        setValue("capacity", data?.data?.capacity);
        setValue(data?.data);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    offerListing();
  }, []);
  // ==================== variation form
  const handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[idx] = {
      ...updatedRows[idx],
      [name]: value,
    };
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newItem = {
      name: "",
      mobile: "",
    };
    setRows([...rows, newItem]);
  };

  const handleRemoveRow = () => {
    setRows(rows.slice(0, -1));
  };

  const handleRemoveSpecificRow = (idx) => () => {
    const updatedRows = [...rows];
    updatedRows.splice(idx, 1);
    setRows(updatedRows);
  };
  return (
    <>
      skdkjlksj
      <div id="wrapper">
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <form className="form" onSubmit={handleSubmit(productForm)}>
                <div className="row">
                  <div className="col-12">
                    <div className="page-title-box">
                      <h4 className="page-title">Create Products</h4>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-12 mb-2">
                            <label>
                              Product Name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              {...register("name", { required: true })}
                              className="form-control product_name"
                              placeholder="Enter Product Name..."
                            />
                            {errors?.name?.type === "required" && (
                              <p role="alert" className="alert-msg text-danger">
                                Product Name is required
                              </p>
                            )}
                          </div>
                          <div className="col-lg-12 mb-2">
                            <label>
                              Product Description{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Controller
                              name="description"
                              control={control}
                              defaultValue=""
                              rules={{ required: "Description is required" }}
                              render={({ field }) => (
                                <textarea
                                  className="form-control"
                                  {...field} // Spread the field properties to the textarea
                                  placeholder="typehere" // "placeHolder" corrected to "placeholder"
                                ></textarea>
                              )}
                            />
                            {errors?.description && (
                              <p role="alert" className="alert-msg text-danger">
                                {errors?.description?.message}{" "}
                                {/* Corrected field name here */}
                              </p>
                            )}
                          </div>
                          <div className="col-lg-4 mb-2">
                            <label>
                              Product SKU <span className="text-danger">*</span>
                            </label>
                            <input
                              {...register("sku", { required: true })}
                              type="text"
                              className="form-control product_sku"
                              placeholder="Enter Product SKU..."
                            />
                            {errors?.sku?.type === "required" && (
                              <p role="alert" className="alert-msg text-danger">
                                Product SKU id required
                              </p>
                            )}
                          </div>
                          <div className="col-lg-4 mb-2">
                            <label>
                              Product Unit{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select"
                              {...register("unit", { required: true })}
                            >
                              <option value="">Select unit</option>
                              <option value="KG">KG</option>
                              <option value="GM">GM</option>
                              <option value="Lit">Lit</option>
                              <option value="Piece">Piece</option>
                            </select>
                            {errors?.unit?.type === "required" && (
                              <p role="alert" className="alert-msg text-danger">
                                Product Unit is required
                              </p>
                            )}
                          </div>
                          <div className="col-lg-4 mb-2">
                            <label>
                              Upload Product Images{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Controller
                              name="images"
                              control={control}
                              defaultValue={[]}
                              rules={{ required: "Product Images is required" }}
                              render={({ field }) => (
                                <div>
                                  <input
                                    type="file"
                                    multiple
                                    className="form-control product_image"
                                    onChange={(e) =>
                                      field.onChange(e.target.files)
                                    }
                                  />
                                </div>
                              )}
                            />
                            {errors?.images && (
                              <p role="alert" className="alert-msg text-danger">
                                {errors?.images?.message}{" "}
                                {/* Corrected field name here */}
                              </p>
                            )}
                          </div>
                          <div className="col-lg-4 mb-2">
                            <label>
                              Cost Price <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              onKeyPress={(offer) => {
                                if (!/[0-9]/.test(offer.key)) {
                                  offer.preventDefault();
                                }
                              }}
                              {...register("cost", { required: true })}
                              className="form-control cost_price"
                              placeholder="Enter Product Cost Price..."
                            />
                            {errors?.cost?.type === "required" && (
                              <p role="alert" className="alert-msg text-danger">
                                Cost Price is required
                              </p>
                            )}
                          </div>
                          <div className="col-lg-4 mb-2">
                            <label>
                              Sale Price <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              onKeyPress={(offer) => {
                                if (!/[0-9]/.test(offer.key)) {
                                  offer.preventDefault();
                                }
                              }}
                              {...register("sale_price", { required: true })}
                              className="form-control sale_price"
                              placeholder="Enter Product Sale Price..."
                            />
                            {errors?.sale_price?.type === "required" && (
                              <p role="alert" className="alert-msg text-danger">
                                Sale Price is required
                              </p>
                            )}
                          </div>
                          <div className="col-lg-4 mb-2">
                            <label>
                              Capacity <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              onKeyPress={(offer) => {
                                if (!/[0-9]/.test(offer.key)) {
                                  offer.preventDefault();
                                }
                              }}
                              {...register("capacity", { required: true })}
                              className="form-control capacity"
                              placeholder="Enter Capacity..."
                            />
                            {errors?.capacity?.type === "required" && (
                              <p role="alert" className="alert-msg text-danger">
                                Capacity is required
                              </p>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-lg-9 mb-2">
                            <h5 className="mb-0">Variations</h5>
                          </div>
                          <div className="col-lg-3 mb-2 text-end">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={handleAddRow}
                              type="button"
                            >
                              <span className="mdi mdi-plus-circle-outline"></span>
                              Add New
                            </button>
                          </div>
                          <div className="col-lg-12">
                            <table className="table table-bordered">
                              <thead className="bg-light">
                                <tr>
                                  <th>Variant</th>
                                  <th>Variant Cost Price</th>
                                  <th>Variant Sale Price</th>
                                  <th>SKU</th>
                                  <th>Remove</th>
                                </tr>
                              </thead>
                              <tbody>
                                {rows.map((item, idx) => (
                                  <tr id="addr0" key={idx}>
                                    <td>
                                      <input
                                        onChange={handleChange(idx)}
                                        value={item.name}
                                        type="text"
                                        className="form-control product_variant"
                                        placeholder="Enter Product Variant..."
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        onChange={handleChange(idx)}
                                        value={item.name}
                                        className="form-control variant_cost_price"
                                        placeholder="Enter Variant Cost Price..."
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        onChange={handleChange(idx)}
                                        value={item.name}
                                        className="form-control variant_sale_price"
                                        placeholder="Enter Variant Sale Price..."
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        onChange={handleChange(idx)}
                                        value={item.name}
                                        className="form-control product_brand"
                                        placeholder="Enter Variant SKU..."
                                      />
                                    </td>
                                    <td className="text-center">
                                      <button
                                        onClick={handleRemoveRow}
                                        type="button"
                                        className="float-right text-danger bg-transparent border-0"
                                      >
                                        {" "}
                                        <span className="mdi mdi-trash-can-outline mdi-24px pe-auto delete_button"></span>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 mx-auto">
                            <button className="btn btn-primary w-100">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default CreateProduct;
