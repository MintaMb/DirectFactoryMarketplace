import React, { useContext, useEffect, useState } from "react";
import Header from "../dashboard_layout/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../common-component/Spinner";
import { GlobalContext } from "../../App";
import { toast } from "react-toastify";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetailData, setProductDetailData] = useState({});
  const { setSpinner, spinner } = useContext(GlobalContext);
  // ================== get list api
  console.log(useParams(), "_id");
  const productDetail = async () => {
    setSpinner(true);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/product_detail${
          id ? "/" + id : ""
        } `,
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
        console.log(data.data, "data");
        setProductDetailData(data?.data);
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
    productDetail();
  }, []);
  console.log(productDetailData, "productDetailData");
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
                    <h4 className="page-title">Products Details</h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-2">
                          <img
                            src="/assets/images/products/product-1.png"
                            className="img img-thumbnail"
                          />
                        </div>
                        <div className="col-lg-10">
                          <h4>Comic Book</h4>
                          <p className="mb-1">
                            <strong>Product Category: </strong>{" "}
                            {productDetailData?.name
                              ? productDetailData?.name
                              : "-"}
                          </p>
                          <p className="mb-1">
                            <strong>Product SKU: </strong>{" "}
                            {productDetailData?.sku
                              ? productDetailData?.sku
                              : "-"}
                          </p>
                          <p className="mb-1">
                            <strong>Product Brand: </strong>{" "}
                            {productDetailData?.brand
                              ? productDetailData?.brand
                              : "-"}
                          </p>
                          <p className="mb-1">
                            <strong>Product Unit : </strong>{" "}
                            {productDetailData?.unit
                              ? productDetailData?.unit
                              : "-"}
                          </p>
                          <p className="mb-1">
                            <strong>Total Capacity/Available Stock : </strong>{" "}
                            {productDetailData?.capacity
                              ? productDetailData?.capacity
                              : "-"}
                            /
                            {productDetailData?.stock
                              ? productDetailData?.stock
                              : "-"}
                          </p>
                        </div>

                        <p className="mb-1">
                          <strong>Product Variants : </strong>
                          {/* {productDetailData?.variations?.map((index,item)=>{
                              
                              <span>{item}</span>
                              
                            })} */}
                          <span>
                            {productDetailData?.variations?.[0]?.name
                              ? productDetailData?.variations?.[0]?.name
                              : "-"}
                          </span>
                        </p>
                        <div className="col-lg-12 mt-2">
                          <div class="table-responsive">
                            <table class="table border">
                              <thead className="bg-light">
                                <tr>
                                  <th>Variant</th>
                                  <th>SKU Code</th>
                                  <th>Cost Price</th>
                                  <th>Sale Price</th>
                                  <th>Stock</th>
                                </tr>
                              </thead>
                              <tbody>
                                {console.log(
                                  productDetailData?.variations,
                                  "item"
                                )}
                                {productDetailData?.variations?.map(
                                  (item, index) => {
                                    return (
                                      <tr>
                                        <td>Small Green</td>
                                        <td>SM-GREEN</td>
                                        <td>300</td>
                                        <td>500</td>
                                        <td>20</td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <p className="mb-1 mt-2">
                            <strong>Description: </strong>
                            &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            {productDetailData?.description
                              ? productDetailData?.description
                              : "-"}
                          </p>
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

export default ProductDetails;
