import React from "react";
import { Link } from "react-router-dom";

const Messages = () => {
  return (
    <>
      <div id='wrapper'>
        <div className='content-page'>
          <div className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12'>
                  <div className='page-title-box'>
                    <h4 className='page-title'>Messages</h4>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-lg-4'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Search in message..'
                          />
                        </div>
                        <div className='col-lg-5'></div>
                        <div className='col-lg-3'>
                          <button
                            class='btn btn-primary float-end'
                            data-bs-toggle='modal'
                            data-bs-target='#send-message-model'>
                            Send Message
                          </button>
                        </div>
                        <div className='col-lg-12 mt-3'>
                          <table class='table border w-100'>
                            <tbody>
                              <tr>
                                <th width='20%'>
                                  <Link to='message-details'>
                                    Lorem Ipsum is simply dummy text of
                                  </Link>
                                </th>
                                <td>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                </td>
                                <th width='10%'>11.51 PM</th>
                              </tr>
                              <tr>
                                <th width='20%'>
                                  <Link to='message-details'>
                                    Lorem Ipsum is simply dummy text of the
                                  </Link>
                                </th>
                                <td>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                </td>
                                <th width='10%'>11.51 PM</th>
                              </tr>
                              <tr>
                                <th width='20%'>
                                  <Link to='message-details'>
                                    Lorem Ipsum is simply dummy text of the
                                  </Link>
                                </th>
                                <td>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                </td>
                                <th width='10%'>11.51 PM</th>
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
        <div
          id='send-message-model'
          className='modal fade'
          tabindex='-1'
          role='dialog'
          aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-body'>
                <form className='px-3 row' action='#'>
                  <div className='mb-2 col-lg-12'>
                    <h4 className='text-center'>Send Message</h4>
                  </div>
                  <div className='mb-2 col-lg-12'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Subject...'
                    />
                  </div>
                  <div className='mb-2 col-lg-12'>
                    <textarea
                      className='form-control'
                      rows='5'
                      placeholder='write something here...'></textarea>
                  </div>
                  <div className='mb-2 col-lg-12'>
                    <input type='file' className='form-control' />
                  </div>
                  <div className='col-lg-4 mx-auto'>
                    <button className='btn btn-primary w-100 mt-3 mb-2'>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
