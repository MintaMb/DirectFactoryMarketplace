import React from 'react'
import Header from './Header' 
import { Link } from 'react-router-dom'

const LossProfit = () => {
  return (
    <div id="wrapper">
        <Header /> 
        <div className="content-page">
            <div className="content"> 
                <div className="container-fluid"> 
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box"> 
                                <h4 className="page-title">Loss & Profit</h4>
                            </div>
                        </div>
                    </div>                     
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body"> 
                                    <div className="row">      
                                        <div className="col-lg-12 mb-3">      
                                            <img src="assets\images\others\Flow-1.png" className='w-100' />
                                        </div>
                                        <div className="col-lg-3">      
                                            <button className='btn btn-primary w-100'>Print Report</button>
                                        </div>
                                        <div className="col-lg-6"></div>
                                        <div className="col-lg-3">      
                                            <button className='btn btn-primary w-100'>Expand Report</button>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body"> 
                                    <h4>Donate to world Hunger program (1% of net profit will be donated)</h4>
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

export default LossProfit