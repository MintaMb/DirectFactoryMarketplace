import React from "react";
import { Link } from "react-router-dom";

const BusinessSettings = () => {
  return (
    <>
      <div id='wrapper'>
        <div className='content-page'>
          <div className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12'>
                  <div className='page-title-box'>
                    <h4 className='page-title'>Business Settings</h4>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='page-title'>Business Settings</h4>
                      <hr className='mb-2' />
                      <div className='row'>
                        <div className='col-lg-4 mb-2'>
                          <label>Business Name </label>
                          <input
                            type='text'
                            className='form-control'
                            value='Business Name'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Mobile Number </label>
                          <input
                            type='text'
                            className='form-control'
                            value='(+1 12323 232323)'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Email ID </label>
                          <input
                            type='email'
                            className='form-control'
                            value='business@gmail.com'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Address </label>
                          <input
                            type='text'
                            className='form-control'
                            value='business@gmail.com'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Director Name </label>
                          <input
                            type='text'
                            className='form-control'
                            value='Director Name'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Director Mobile Number </label>
                          <input
                            type='text'
                            className='form-control'
                            value='(+1 12323 232323)'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Director Email ID </label>
                          <input
                            type='email'
                            className='form-control'
                            value='Director Email ID'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Type of Establishment </label>
                          <input
                            type='text'
                            className='form-control'
                            value='Type of Establishment'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Type of Product </label>
                          <input
                            type='text'
                            className='form-control'
                            value='Type of Product'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Number of Employee </label>
                          <input
                            type='text'
                            className='form-control'
                            value='Number of Employee'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Selling Last Year </label>
                          <input
                            type='text'
                            className='form-control'
                            value='Selling Last Year'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Country </label>
                          <input
                            type='text'
                            className='form-control'
                            value='Country'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Type of Industry </label>
                          <input
                            type='text'
                            className='form-control'
                            value='Type of Industry'
                          />
                        </div>
                        <div className='col-lg-4 mb-2'>
                          <label>Logo </label>
                          <input type='file' className='form-control' />
                        </div>
                        <div className='col-lg-12 mb-2 text-center'>
                          <button className='btn btn-primary'>
                            Save Changes
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

export default BusinessSettings;
