import React from "react";
import { Link } from "react-router-dom";

const MessagesDetails = () => {
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
                <div className='col-lg-7 mx-auto'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-lg-12'>
                          <h5>Lorem Ipsum is simply dummy text of</h5>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum
                          </p>
                          <div class='alert alert-primary' role='alert'>
                            Attachment-1.pdf
                          </div>
                          <div class='alert alert-primary' role='alert'>
                            Attachment-1.pdf
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
    </>
  );
};

export default MessagesDetails;
