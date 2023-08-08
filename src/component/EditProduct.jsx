import React from "react";
import Header from "./dashboard_layout/Header";

const EditProduct = () => {
  return (
    <>
      as
      <div id="wrapper">
        <Header />
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box">
                    <h4 className="page-title">Edit Products</h4>
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
                            Product Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control product_name"
                            placeholder="Enter Product Name..."
                            value="Apple Air Book"
                          />
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label>
                            Product Description{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            name="product_description"
                          ></textarea>
                        </div>
                        <div className="col-lg-4 mb-2">
                          <label>
                            Product SKU <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control product_sku"
                            placeholder="Enter Product SKU..."
                          />
                        </div>
                        <div className="col-lg-4 mb-2">
                          <label>
                            Product Unit <span className="text-danger">*</span>
                          </label>
                          <select className="form-select">
                            <option value="KG">KG</option>
                            <option value="GM">GM</option>
                            <option value="Lit">Lit</option>
                            <option value="Piece">Piece</option>
                          </select>
                        </div>
                        <div className="col-lg-4 mb-2">
                          <label>
                            Upload Product Images{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control product_image"
                          />
                        </div>
                        <div className="col-lg-4 mb-2">
                          <label>
                            Cost Price <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control cost_price"
                            placeholder="Enter Product Cost Price..."
                          />
                        </div>
                        <div className="col-lg-4 mb-2">
                          <label>
                            Sale Price <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control sale_price"
                            placeholder="Enter Product Sale Price..."
                          />
                        </div>
                        <div className="col-lg-4 mb-2">
                          <label>
                            Capacity <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control capacity"
                            placeholder="Enter Capacity..."
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-lg-9 mb-2">
                          <h5 className="mb-0">Variations</h5>
                        </div>
                        <div className="col-lg-3 mb-2 text-end">
                          <a className="btn btn-primary btn-sm">
                            <span className="mdi mdi-plus-circle-outline"></span>{" "}
                            Add New
                          </a>
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
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control product_variant"
                                    placeholder="Enter Product Variant..."
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control variant_cost_price"
                                    placeholder="Enter Variant Cost Price..."
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control variant_sale_price"
                                    placeholder="Enter Variant Sale Price..."
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control product_brand"
                                    placeholder="Enter Variant SKU..."
                                  />
                                </td>
                                <td className="text-center">
                                  <a className="text-danger">
                                    <span className="mdi mdi-trash-can-outline mdi-24px pe-auto delete_button"></span>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control product_variant"
                                    placeholder="Enter Product Variant..."
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control variant_cost_price"
                                    placeholder="Enter Variant Cost Price..."
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control variant_sale_price"
                                    placeholder="Enter Variant Sale Price..."
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control product_brand"
                                    placeholder="Enter Variant SKU..."
                                  />
                                </td>
                                <td className="text-center">
                                  <a className="text-danger">
                                    <span className="mdi mdi-trash-can-outline mdi-24px pe-auto delete_button"></span>
                                  </a>
                                </td>
                              </tr>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
