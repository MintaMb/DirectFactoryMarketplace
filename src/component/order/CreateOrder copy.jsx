import React from 'react' 
import { Link } from 'react-router-dom'

const CreateOrder = () => {
  return (
    
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
                                        <form className="px-3 row" action="#">
                                            <div className="mb-2 col-lg-6 input-group">
                                                <label for="role" className="form-label">Customer</label>
                                                <div className="input-group">
                                                    <select class="form-select">
                                                        <option value="">Select Customer</option>
                                                        <option value="1">Asad Baig</option>
                                                        <option value="2">Alex Newton</option>
                                                        <option value="3">John Martin</option>
                                                    </select>
                                                    <button className="btn input-group-text btn-primary waves-effect waves-light" type="button" data-bs-toggle="modal" data-bs-target="#create-customer-model">Add New</button>
                                                </div>
                                            </div>
                                            <div className="mb-2 col-lg-6">
                                                <label for="role" className="form-label">Mobile Number</label>
                                                <input type="text" className="form-control" placeholder="Enter Mobile Number..."/>
                                            </div>
                                            <div className="mb-2 col-lg-6">
                                                <label for="role" className="form-label">Address</label>
                                                <input type="text" className="form-control" placeholder="Enter Customer Address..."/>
                                            </div><hr class="mt-3"/>
                                            <div className="col-lg-11 mx-auto">
                                                <div className="mb-2 mt-1"> 
                                                    <select className="form-select">
                                                        <option value="">Select Product</option>
                                                        <option value="iPhone 9">iPhone 9</option>
                                                        <option value="iPhone X">iPhone X</option>
                                                        <option value="Huawei P30">Huawei P30</option>
                                                        <option value="HP Pavilion 15-DK1056WM">HP Pavilion 15-DK1056WM</option>
                                                        <option value="Fog Scent Xpressio Perfume">Fog Scent Xpressio Perfume</option>
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
                                                            <tr>
                                                                <td>1. </td>
                                                                <td>iPhone 9</td>
                                                                <td><input type="number" className="form-control" value="2"/></td>
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
                                                                <td><input type="number" className="form-control" value="2"/></td>
                                                                <td>$500.44 </td>
                                                                <td>$1,000.88 </td>
                                                                <td className="text-center">
                                                                    <a href="" className="text-danger">
                                                                        <span className="mdi mdi-trash-can-outline mdi-24px"></span>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <th className="text-end">Total :</th>
                                                                <td width="130px">$1571.19</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="text-end">GST/TAX : </th>
                                                                <td><input type="number" value="500" className="form-control"/></td>
                                                            </tr>
                                                            <tr>
                                                                <th className="text-end">Discount : </th>
                                                                <td><input type="number" value="40" className="form-control"/></td>
                                                            </tr>
                                                            <tr>
                                                                <th className="text-end">Shipping Charge : </th>
                                                                <td><input type="number" value="25" className="form-control"/></td>
                                                            </tr>
                                                            <tr>
                                                                <th className="text-end">Grand Total :</th>
                                                                <th>$1458.3</th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div> 
                                                <div className="row mb-3 mt-3">
                                                    <div className="col-lg-2"></div>
                                                    <div className="col-lg-4">
                                                        <button className="btn btn-danger w-100" data-bs-dismiss="modal">Cancel Order</button>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <button className="btn btn-primary w-100">Confirm Order</button>
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
        <div id="create-customer-model" className="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="text-center mt-2 mb-2">
                            <div className="auth-logo">
                                <h4 className="mt-4 text-primary text-start mb-0">Create New Customer</h4><hr className="mb-0"/>
                            </div>
                        </div>
                        <form className="px-3 row" action="#">
                            <div className="mb-2 col-lg-12">
                                <label for="role" className="form-label">Customer</label>
                                <input type="text" className="form-control" placeholder="Enter Customer Name..."/>
                            </div>
                            <div className="mb-2 col-lg-6">
                                <label for="role" className="form-label">Mobile Number</label>
                                <input type="text" className="form-control" placeholder="Enter Mobile Number..."/>
                            </div>
                            <div className="mb-2 col-lg-6">
                                <label for="role" className="form-label">Address</label>
                                <input type="text" className="form-control" placeholder="Enter Customer Address..."/>
                            </div>  
                            <div className="col-lg-2"></div>
                            <div className="col-lg-4">
                                <button className="btn btn-danger w-100 mt-3 mb-2" data-bs-dismiss="modal">Cancel Order</button>
                            </div>
                            <div className="col-lg-4">
                                <button className="btn btn-primary w-100 mt-3 mb-2">Confirm Order</button>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateOrder