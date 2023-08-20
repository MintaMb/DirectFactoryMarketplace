import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import { toast } from "react-toastify";
import moment from "moment";
import NoData from "../common-component/NoData";
import Spinner from "../common-component/Spinner";

const Messages = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });
  const { setSpinner, spinner } = useContext(GlobalContext);
  const [messageList, setMessageList] = useState([]);
  // modal show/Hide  functions
  const [modalShow, setShowModal] = useState(false);
  const showModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  // ================== get message list api
  const userMessage = async () => {
    setSpinner(true);
    let token = localStorage.getItem("Token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/client_all_messages`,
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
        setMessageList(data?.data);
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
    userMessage();
  }, []);
  // ================== add messages api
  const addMessages = async (data) => {
    setSpinner(true);
    let userData = JSON.parse(localStorage.getItem("userData"));
    let token = localStorage.getItem("Token");
    try {
      const formData = new FormData();
      formData.append("subject", data.subject);
      formData.append("description", data.description);
      formData.append("receiver_id", "64c7c0171543f388134844d9"); // Update receiver_id as needed
      formData.append("company_id", userData?.company_id);
      if (data.attachments && data.attachments.length > 0) {
        for (const file of data.attachments) {
          formData.append('attachments', file);
        }
      }
  
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/client_send_message`,
        {
          headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: formData, // Serialize formData into JSON
        }
      );

      const responseData = await response.json();

      if (response.status === 200) {
        setSpinner(false);
        userMessage();
        setMessageList((prevList) => [...prevList, responseData.data]);
        reset();
        hideModal();
        toast.success("Message sent successfully");
      } else if (response.status >= 400) {
        toast.error(responseData.message, {
          autoClose: 5000,
        });
      }
    } catch (error) {
      setSpinner(false);
    }
  };

  console.log(watch(), "haha");
  return (
    <>
    {spinner && <Spinner/>}
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
                            type='button'
                            className='btn btn-primary float-end'
                            onClick={() => {
                              showModal();
                            }}>
                            Send Message
                          </button>
                        </div>
                        <div className='col-lg-12 mt-3'>
                          <table class='table border w-100'>
                            {messageList?.length ? (
                              <tbody>
                                {messageList?.map((item, index) => {
                                  return (
                                    <>
                                      <tr>
                                        <th width='20%'>
                                          <Link to='message-details'>
                                            {item?.subject}
                                          </Link>
                                        </th>
                                        <td>{item?.description}</td>
                                        <th width='10%'>
                                          {moment(item?.created_at).format(
                                            "DD MMM YYYY  h:mm A"
                                          )}
                                          
                                        </th>
                                      </tr>
                                    </>
                                  );
                                })}
                              </tbody>
                            ) : (
                              <NoData title='No messages ...' />
                            )}
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
        {/* ================== add messages  */}
        {modalShow && (
          <div
            id='send-message-model'
            className={`modal ${showModal ? "d-flex show-modal" : ""} `}
            tabindex='-1'
            role='dialog'
            aria-hidden='true'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-body'>
                  <form
                    className='px-3 row'
                    onSubmit={handleSubmit(addMessages)}>
                    <div className='mb-2 col-lg-12'>
                      <h4 className='text-center'>Send Message</h4>
                    </div>
                    <div className='mb-2 col-lg-12'>
                      <input
                        type='text'
                        className='form-control'
                        name='subject'
                        {...register("subject", {
                          //   required: "Subject is required",
                        })}
                        placeholder='Subject...'
                      />
                      {errors.subject && (
                        <p className='text-danger'>{errors.subject.message}</p>
                      )}
                    </div>
                    <div className='mb-2 col-lg-12'>
                      <Controller
                        name='description'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <>
                            <textarea
                              {...field}
                              className='form-control'
                              rows={4}
                              placeholder='Write something here...'
                            />
                            {errors.description && (
                              <p className='text-danger'>
                                {errors.description.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>
                    <div className='mb-2 col-lg-12'>
                      <input type='file' className='form-control'     multiple
    {...register('attachments')}
 />
                    </div>
                    <div className='mb-3 col-lg-12 text-center'>
                    <button
                        className='btn btn-primary me-3 w-40   mt-3 mb-2'
                        type='submit'
                        onClick={() => {
                          hideModal();
                        }}>
                        Close
                      </button>
                      <button
                        className='btn btn-primary w-40  mt-3 mb-2'
                        type='submit'
                        onClick={() => {
                          // reset();
                        }}>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
