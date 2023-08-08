import React from 'react'
import { Link } from 'react-router-dom'

const ManualOrderInput = () => {
  return (
    <div id="wrapper">
        <div className="content-page">
            <div className="content"> 
                <div className="container-fluid"> 
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box"> 
                                <h4 className="page-title">Manual Order Input</h4>
                            </div>
                        </div>
                    </div>                     
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">  
                                    <div className="row">                              
                                        <div className="col-lg-8 mb-2">
                                            <h5>Order List</h5>
                                        </div>
                                        <div className="col-lg-4 text-end mb-2">
                                            <Link className="btn btn-primary" to="/order/manual-order-input/create-order">Create New Order</Link> 
                                        </div>
                                    </div>
                                    <div className="row">      
                                        <div className="col-lg-12">      
                                            <div className="table-responsive mt-3">
                                                <table id="basic-datatable_wrapper" className="table dt-responsive nowrap w-100 dataTable dtr-inline">
                                                    <thead className="bg-light">                                                        							
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Order ID</th>
                                                            <th>Order Date</th>
                                                            <th>Customer Info</th>
                                                            <th>Total Amount</th> 
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead> 
                                                    <tbody>
                                                        <tr>
                                                            <td>1.</td>
                                                            <td><h5 className="text-primary bold">#100185</h5></td>
                                                            <td>
                                                                11 Jun 2023,<br/>
                                                                08:20 AM
                                                            </td>
                                                            <td>
                                                                Ram Kumar <br/>3239232323
                                                            </td>
                                                            <td>
                                                                $100.0<br/>
                                                                <span className="text-success">Paid</span>
                                                            </td> 
                                                            <td width="120px">
                                                                <Link to="/orders/manual-order-input/order-details" className="btn btn-primary btn-sm">
                                                                    <span className="mdi mdi-eye"></span>
                                                                </Link> 
                                                                <button className="btn btn-primary btn-sm mx-1">
                                                                    <span className="mdi mdi-download"></span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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
  )
}

export default ManualOrderInput