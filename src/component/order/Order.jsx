import React from 'react'
import { Link } from 'react-router-dom'

const Order = () => {
  return (
    <div id="wrapper">
        <div className="content-page">
            <div className="content"> 
                <div className="container-fluid"> 
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box"> 
                                <h4 className="page-title">Order</h4>
                            </div>
                        </div>
                    </div> 
                    <div className="row">                             
                        <div className="col-lg-12">                            
                            <div className="card">
                                <div className="card-body">
                                    <div className="row"> 
                                        <div className="col-lg-3"></div>
                                        <div className="col-lg-3">
                                            <div className="card border-primary border mb-3">
                                            <Link to="/website-order" className="text-primary"><h4 className="p-4 text-center text-primary">Order from Website</h4></Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="card border-primary border mb-3">
                                                <Link to="/order/manual-order-input" className="text-primary"><h4 className="p-4 text-center text-primary">Manual Order Input</h4></Link>
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

export default Order