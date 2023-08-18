import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../App";
import Spinner from "../common-component/Spinner";

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
  const [eventImage, setEventImage] = useState([]);
  const { setSpinner, spinner } = useContext(GlobalContext);
  //===================  create product post api.
  const productForm = async (data) => {
    setSpinner(true);
    let userData = JSON.parse(localStorage.getItem("userData"));
    // return
    try {
      let formData = new FormData();

      id && formData.append("product_id", id);
      formData.append("name", watch()?.name ? watch()?.name : "");
      formData.append("description", watch()?.description);
      formData.append("sku", watch()?.sku);
      formData.append("unit", watch()?.unit);
      formData.append("cost", watch()?.cost);
      formData.append("sale_price", watch()?.sale_price);
      formData.append("stock", 0);
      formData.append("capacity", watch()?.capacity);
      formData.append("factory_id", userData?.factory_id);
      formData.append("is_have_variation", rows.length > 0 ? "yes" : "no");
      formData.append(
        "product_tax",
        watch()?.product_tax ? watch()?.product_tax : "0"
      );
      // Append images to formData
      // =====Event images
      if (eventImage?.length) {
        eventImage?.forEach((itm, i) => {
          if (typeof itm?.file === "object") {
            formData.append(`image[${i}]`, itm?.file);
          }
        });
      }
      // Append variations data to formData
      if (rows.length > 0) {
        formData.append("variations", JSON.stringify(rows));
      }
      const apiUrl = id
        ? `${process.env.REACT_APP_BASE_URL}/api/update_product`
        : `${process.env.REACT_APP_BASE_URL}/api/add_product`;
      const response = await fetch(
        apiUrl,
        // `${process.env.REACT_APP_BASE_URL}${id ? `/api/update_product` : `api/add_product`}`,
        // `${process.env.REACT_APP_BASE_URL}/api/add_product`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            // "Content-Type":
            //   "multipart/form-data; boundary=AaB03x" +
            //   "--AaB03x" +
            //   "Content-Disposition: file" +
            //   "Content-Type: png" +
            //   "Content-Transfer-Encoding: binary" +
            //   "...data... " +
            //   "--AaB03x--",
            // type: "formData",
          },
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response?.status === 200) {
        reset();
        setEventImage([]);
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
      if (response?.status >= 401) {
        const data = await response.json();
        toast.error(data?.message, {
          autoClose: 5000,
        });
      }
      // for error msgs
    } catch (errors) {
      console.error("An error occurred:", errors);
      setSpinner(false);
    }
    setSpinner(false);
  };
  // ================== get product list api
  const getProductListing = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/product_detail/${id}`,
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
        seteditProduct(data?.data);
        setValue("name", data?.data?.name);
        setValue("description", data?.data?.description);
        setValue("sku", data?.data?.sku);
        setValue("unit", data?.data?.unit);
        setValue("images", data?.data?.images);
        setValue("cost", data?.data?.cost);
        setValue("sale_price", data?.data?.sale_price);
        setValue("stock", 0);
        setValue("product_tax", data?.data?.product_tax);
        setValue("capacity", data?.data?.capacity);
        // Clear variations initially
        console.log(data?.data, "data?.data?.variations");
        setRows([]);
        if (data?.data?.variations && data?.data?.variations.length > 0) {
          const variations = data?.data?.variations.map((variation) => ({
            // variation_id: variation_id,
            name: variation.name,
            cost_price: variation.cost_price,
            sale_price: variation.sale_price,
            sku: variation.sku,
          }));
          setRows(variations);
        } else {
          // Add a single empty row if no variations are available
          setRows([{}]);
        }
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  useEffect(() => {
    if (id) {
      getProductListing();
    }
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
    setRows([...rows, {}]);
  };

  const handleRemoveRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  const handleRemoveSpecificRow = (idx) => () => {
    const updatedRows = [...rows];
    updatedRows.splice(idx, 1);
    setRows(updatedRows);
  };
  // =================== event multi images selector
  const handleImage = (e) => {
    const data = e.target.files;
    let totalPhotosLength = data.length + eventImage?.length;
    if (totalPhotosLength > 4) {
      toast.error("Only 4 images are accepted.");
      return;
    }
    for (let i of e.target.files) {
      if (i.size > 1e6) {
        toast.error("Image size too large, upload up to 1MB.", {
          autoClose: 3000,
        });
        return;
      } else {
        setEventImage((prev) => {
          return [...prev, { file: i }];
        });
      }
    }
  };

  const [businessLogo, setBusinessLogo] = useState(null);
  const handleLogoChange = (event) => {
    const selectedFile = event.target.files[0];
    setBusinessLogo(selectedFile);
  };
  return (
    <>
      {spinner && <Spinner />}
      <div id='wrapper'>
        <div className='content-page'>
          <div className='content'>
            <div className='container-fluid'>
              <form className='form' onSubmit={handleSubmit(productForm)}>
                <div className='row'>
                  <div className='col-12'>
                    <div className='page-title-box'>
                      <h4 className='page-title'>Create Products</h4>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='card'>
                      <div className='card-body'>
                        <div className='row'>
                          <div className='col-lg-12 mb-2'>
                            <label>
                              Product Name{" "}
                              <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='text'
                              {...register("name", { required: true })}
                              className='form-control product_name'
                              placeholder='Enter Product Name...'
                            />
                            {errors?.name?.type === "required" && (
                              <p role='alert' className='alert-msg text-danger'>
                                Product Name is required
                              </p>
                            )}
                          </div>
                          <div className='col-lg-12 mb-2'>
                            <label>
                              Product Description{" "}
                              <span className='text-danger'>*</span>
                            </label>
                            <Controller
                              name='description'
                              control={control}
                              rules={{ required: "Description is required" }}
                              render={({ field }) => (
                                <textarea
                                  className='form-control'
                                  {...field}
                                  placeholder='Product description...'
                                  defaultValue={
                                    editProduct?.description
                                  }></textarea>
                              )}
                            />
                            {errors?.description && (
                              <p role='alert' className='alert-msg text-danger'>
                                {errors?.description?.message}
                              </p>
                            )}
                          </div>

                          <div className='col-lg-4 mb-2'>
                            <label>
                              Product SKU <span className='text-danger'>*</span>
                            </label>
                            <input
                              {...register("sku", { required: true })}
                              type='text'
                              className='form-control product_sku'
                              placeholder='Enter Product SKU...'
                            />
                            {errors?.sku?.type === "required" && (
                              <p role='alert' className='alert-msg text-danger'>
                                Product SKU id required
                              </p>
                            )}
                          </div>
                          <div className='col-lg-4 mb-2'>
                            <label>
                              Product Unit{" "}
                              <span className='text-danger'>*</span>
                            </label>
                            <select
                              className='form-select'
                              {...register("unit", { required: true })}>
                              <option value=''>Select unit</option>
                              <option value='KG'>KG</option>
                              <option value='GM'>GM</option>
                              <option value='Lit'>Lit</option>
                              <option value='Piece'>Piece</option>
                            </select>
                            {errors?.unit?.type === "required" && (
                              <p role='alert' className='alert-msg text-danger'>
                                Product Unit is required
                              </p>
                            )}
                          </div>
                          <div className='col-lg-4 mb-2'>
                            <label>
                              Upload Product Images{" "}
                              <span className='text-danger'>*</span>
                            </label>
                            {/* <Controller
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
                            /> */}
                            {/* <input
                              id='eventImages'
                              onChange={(e) => handleImage(e)}
                              type='file'
                              name='files[]'
                              data-multiple-caption='{count} files selected'
                              multiple
                              accept='.jpg,.png,.jpeg '
                              className='form-control product_image'
                            /> */}
                            <input
                              type='file'
                              className='form-control'
                              accept='image/png, image/gif, image/jpeg'
                              onChange={handleLogoChange}
                            />
                            {errors?.images && (
                              <p role='alert' className='alert-msg text-danger'>
                                {errors?.images?.message}{" "}
                                {/ Corrected field name here /}
                              </p>
                            )}
                          </div>
                          <div className='col-lg-4 mb-2'>
                            <label>
                              Cost Price <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='number'
                              min='1'
                              step='any'
                              onKeyDown={(event) => {
                                if (
                                  event.key === "0" &&
                                  event.target.value === ""
                                ) {
                                  event.preventDefault();
                                }
                              }}
                              {...register("cost", { required: true })}
                              className='form-control cost_price'
                              placeholder='Enter Product Cost Price...'
                            />
                            {errors?.cost?.type === "required" && (
                              <p role='alert' className='alert-msg text-danger'>
                                Cost Price is required
                              </p>
                            )}
                          </div>
                          <div className='col-lg-4 mb-2'>
                            <label>
                              Sale Price <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='number'
                              min='1'
                              step='any'
                              {...register("sale_price", { required: true })}
                              className='form-control sale_price'
                              placeholder='Enter Product Sale Price...'
                              onKeyDown={(event) => {
                                if (
                                  event.key === "0" &&
                                  event.target.value === ""
                                ) {
                                  event.preventDefault();
                                }
                              }}
                            />
                            {errors?.sale_price?.type === "required" && (
                              <p role='alert' className='alert-msg text-danger'>
                                Sale Price is required
                              </p>
                            )}
                          </div>
                          <div className='col-lg-4 mb-2'>
                            <label>
                              Capacity <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='number'
                              onKeyDown={(event) => {
                                if (
                                  event.key === "0" &&
                                  event.target.value === ""
                                ) {
                                  event.preventDefault();
                                }
                              }}
                              {...register("capacity", { required: true })}
                              className='form-control capacity'
                              placeholder='Enter Capacity...'
                            />
                            {errors?.capacity?.type === "required" && (
                              <p role='alert' className='alert-msg text-danger'>
                                Capacity is required
                              </p>
                            )}
                          </div>
                          {/* <div className='col-lg-4 mb-2'>
                            <label>Tax</label>
                            <input
                              type='text'
                              onKeyPress={(event) => {
                                // Allow digits and a single decimal point
                                if (!/[0-9.]/.test(event.key)) {
                                  event.preventDefault();
                                }
                                // Prevent multiple decimal points
                                if (
                                  event.key === "." &&
                                  event.target.value.includes(".")
                                ) {
                                  event.preventDefault();
                                }
                              }}
                              {...register("product_tax")}
                              className='form-control'
                              placeholder='Enter Tax...'
                            />
                          </div> */}
                        </div>
                        <hr />
                        <div className='row'>
                          <div className='col-lg-9 mb-2'>
                            <h5 className='mb-0'>Variations</h5>
                          </div>
                          <div className='col-lg-3 mb-2 text-end'>
                            <button
                              className='btn btn-primary btn-sm'
                              onClick={handleAddRow}
                              type='button'>
                              <span className='mdi mdi-plus-circle-outline'></span>
                              Add New
                            </button>
                          </div>
                          <div className='col-lg-12'>
                            <table className='table table-bordered'>
                              <thead className='bg-light'>
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
                                  <tr id={`addr${idx}`} key={idx}>
                                    <td>
                                      <input
                                        name={`name`}
                                        onChange={handleChange(idx)}
                                        value={item.name || ""}
                                        type='text'
                                        className='form-control product_variant'
                                        placeholder='Enter Product Variant...'
                                      />
                                    </td>
                                    <td>
                                      <input
                                        name={`cost_price`}
                                        onChange={handleChange(idx)}
                                        value={item.cost_price || ""}
                                        type='text'
                                        className='form-control variant_cost_price'
                                        placeholder='Enter Variant Cost Price...'
                                      />
                                    </td>
                                    <td>
                                      <input
                                        name={`sale_price`}
                                        onChange={handleChange(idx)}
                                        value={item.sale_price || ""}
                                        type='text'
                                        className='form-control variant_sale_price'
                                        placeholder='Enter Variant Sale Price...'
                                      />
                                    </td>
                                    <td>
                                      <input
                                        name={`sku`}
                                        onChange={handleChange(idx)}
                                        value={item.sku || ""}
                                        type='text'
                                        className='form-control product_brand'
                                        placeholder='Enter Variant SKU...'
                                      />
                                    </td>
                                    <td className='text-center'>
                                      <button
                                        onClick={handleRemoveSpecificRow(idx)}
                                        type='button'
                                        className='float-right text-danger bg-transparent border-0'>
                                        <span className='mdi mdi-trash-can-outline mdi-24px pe-auto delete_button'></span>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-lg-3 mx-auto'>
                            <button className='btn btn-primary w-100'>
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
