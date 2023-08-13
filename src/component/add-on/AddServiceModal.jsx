import React from "react";
import { Link } from "react-router-dom";

const AddServiceModal = ({ showModal, onClick }) => {
  return (
    <>
      <div
        id='create-customer-model'
        className={`modal ${showModal ? "d-flex show-modal" : ""} `}
        tabindex='-1'
        role='dialog'
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-body'>
              <div className='text-center mt-2 mb-4'>
                <div className='auth-logo'>
                  <h4 className='mt-4 text-primary text-start mb-0'>
                    Add New Service
                  </h4>
                  <hr />
                </div>
              </div>
              <form className='px-3 row' action='#'>
                <div className='mb-3 col-lg-11'>
                  <div className='table-responsive'>
                    <table className='w-100'>
                      <tr>
                        <td className='text-end'>
                          <label className='form-label'>
                            SEO Export{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Graphic Designer{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            B2B Sales Rep{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='text-end'>
                          <label className='form-label'>
                            Radio Ads{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Local Online Sales Rep{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Petrol Station Ads{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='text-end'>
                          <label className='form-label'>
                            Tik Tok Ads{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Shopping Mall Bill Board Ads{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Facebook Ads{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='text-end'>
                          <label className='form-label'>
                            Website{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            SMS to all Contacts{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Google Pay Ads{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='text-end'>
                          <label className='form-label'>
                            Our Magazine{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Social Media Expert{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Truck Bill Board{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='text-end'>
                          <label className='form-label'>
                            Yellow Pages{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Our Database Mail Out{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Call out To{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className='text-end'>
                          <label className='form-label'>
                            Repair Tech{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Highway Billboards{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                        <td className='text-end'>
                          <label className='form-label'>
                            Live Chat Tech/Support{" "}
                            <i className='mdi mdi-progress-question text-danger'></i>
                          </label>
                          <input
                            className='form-check-input mx-1'
                            type='checkbox'
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className='mb-3 col-lg-12 text-center'>
                  <button className='btn btn-primary' type='button'>
                    Submit for Approval
                  </button>
                  &nbsp;&nbsp;
                  <button className='btn btn-outline-danger' onClick={onClick}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddServiceModal;
