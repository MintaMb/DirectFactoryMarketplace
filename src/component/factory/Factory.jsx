import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../common-component/Spinner";
import { GlobalContext } from "../../App";
import placeholder from "../../assets/images/placeholder.png"; //placeholderimg
import NoData from "../common-component/NoData";
import { toast } from "react-toastify";
import moment from "moment/moment";

const Factory = () => {

    const navigate = useNavigate();
    const [factories, setFactories] = useState([]);
    const [deleteShow, setDShow] = useState(false);
    const [productId, setProductId] = useState([]);
    const { setSpinner, spinner } = useContext(GlobalContext);
    // ================== get list api
    const FactoryListing = async () => {
      setSpinner(true);
      let token = localStorage.getItem("Token");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/client_all_factories/64b38d453c5d9e4143a95b0e`,
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
          console.log(data);
          setFactories(data?.data);
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
        FactoryListing();
    }, []);

    return (
    <>
    <div id="wrapper"> 
        <div className="content-page">
            <div className="content"> 
                <div className="container-fluid"> 
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box"> 
                                <h4 className="page-title">Factory</h4>
                            </div>
                        </div>
                    </div>                    
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-8 mb-2">
                                            <h5>Factory List</h5>
                                        </div>
                                        <div className="col-lg-4 text-end mb-2"> 
                                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create-factory-model">Add New</button>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="table-responsive">
                                                {factories?.length > 0 ? (
                                                <>
                                                    <table className="table dt-responsive nowrap w-100 dataTable dtr-inline border">
                                                    <thead className="bg-light">
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Factory ID</th>
                                                            <th>Country</th>
                                                            <th>Establishment Type</th>
                                                            <th>Date</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                            </tr>
                                                    </thead>
                                                    <tbody>
                                                        {factories?.map((item, index) => {
                                                        return (
                                                        <>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                            FN-{item?.factory_id
                                                                ? item?.factory_id
                                                                : "-"}
                                                            </td>
                                                            <td>
                                                            {" "}
                                                            {item?.country_id
                                                                ? item?.country_id
                                                                : "-"}
                                                            </td>
                                                            <td>
                                                            {" "}
                                                            {item?.establishment_type
                                                                ? item?.establishment_type
                                                                : "-"}
                                                            </td>
                                                            <td>
                                                            {" "}
                                                            {item?.created_at
                                                                ? moment(
                                                                    item?.created_at
                                                                ).format("DD MMM YYYY")
                                                                : "-"}
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
                                                        </>
                                                    );
                                                    })}
                                                </tbody>
                                                </table>
                                            </>
                                            ) : (
                                            <NoData title="No stock history here.." />
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
        <div id="create-factory-model" className="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="text-center mt-2 mb-2">
                            <div className="auth-logo">
                                <h4 className="mt-4 text-primary text-start mb-0">Add New Factory</h4><hr className="mb-0"/>
                            </div>
                        </div>
                        <form className="px-3 row" action="#">
                            <div className="mb-2 col-lg-12">
                                <label for="role" className="form-label">Establishment Type</label>
                                <select className="form-select">
                                    <option>Select Establishment Type</option>
                                </select>
                            </div>
                            <div className="mb-2 col-lg-12">
                                <label for="role" className="form-label">Country</label>
                                <select className="form-select">
                                    <option>Select Country</option>
                                </select>
                            </div>
                            <div className="col-lg-4 mx-auto">
                                <button className="btn btn-primary w-100 mt-3 mb-2">Submit</button>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}

export default Factory