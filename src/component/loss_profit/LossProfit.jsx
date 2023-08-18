import React from "react";
import { Link } from "react-router-dom";
import garph from "../../assets/images/graph.png";
import { Bar } from "react-chartjs-2";
import Verticalchart from "./Verticalchart";
const LossProfit = () => {
  return (
    <div id='wrapper'>
      <div className='content-page'>
        <div className='content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12'>
                <div className='page-title-box'>
                  <h4 className='page-title'>Loss & Profit</h4>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='card'>
                  <div className='card-body'>
                    <Verticalchart />
                  </div>
                </div>
              </div>

              <div className='row mb-3'>
                {/* <div className='col-lg-12 mb-3'>
                        <img src={garph} className='w-100' />
                      </div> */}
                <div className='col-lg-6 text-end  pe-0'>
                  <button className='btn btn-primary '>Print Report</button>
                </div>
                <div className='col-lg-6 '>
                  <button className='btn btn-primary '>Expand Report</button>
                </div>
              </div>
              <div className='col-lg-12'>
                <div className='card'>
                  <div className='card-body'>
                    <h4>
                      Donate to world Hunger program (1% of net profit will be
                      donated)
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LossProfit;
