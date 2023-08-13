import React from "react";

export default function NewUserModal({ showModal, onClick, onSubmit }) {
  return (
    <>
      <div
        id='create-customer-model'
        className={`modal ${showModal ? "d-flex show-modal" : ""} `}
        tabindex='-1'
        role='dialog'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-body'>
              <div className='text-center mt-2 mb-4'>
                <div className='auth-logo'>
                  <h4 className='mt-2 text-primary'>Assign New User</h4>
                </div>
              </div>
              <form className='px-3 row' onSubmit={onSubmit}>
                <div className='mb-2 col-lg-6'>
                  <label for='name' className='form-label'>
                    Name
                  </label>
                  <input
                    className='form-control'
                    {...register("first_name")}
                    type='name'
                    id='name'
                    required=''
                    placeholder='Enter Name..'
                  />
                </div>
                <div className='mb-2 col-lg-6'>
                  <label for='email' className='form-label'>
                    Email Address
                  </label>
                  <input
                    className='form-control'
                    type='email'
                    {...register("email")}
                    id='email'
                    required=''
                    placeholder='Enter Email Address..'
                  />
                </div>
                <div className='mb-2 col-lg-6'>
                  <label for='mobile_number' className='form-label'>
                    Mobile Number
                  </label>
                  <input
                    className='form-control'
                    type='mobile_number'
                    maxLength={15}
                    {...register("phone")}
                    required=''
                    onKeyPress={(offer) => {
                      if (!/[0-9]/.test(offer.key)) {
                        offer.preventDefault();
                      }
                    }}
                    id='mobile_number'
                    placeholder='Enter Mobile Number..'
                  />
                </div>
                <div className='mb-2 col-lg-6'>
                  <label for='password' className='form-label'>
                    Password
                  </label>
                  <input
                    className='form-control'
                    type='password'
                    {...register("password")}
                    required=''
                    id='password'
                    placeholder='Enter your Password'
                  />
                </div>
                <div className='mb-1 col-lg-12'>
                  <label>Select Permissions</label>
                </div>
                {permissions.map((permission) => (
                  <div className='mb-1 col-lg-4' key={permission}>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      {...register("permissions")}
                      value={permission?.value} // Capture the selected permission value
                    />
                    &nbsp;&nbsp;{permission?.name}
                  </div>
                ))}
                <div className='mt-2 col-lg-12 text-center'>
                  <button
                    className='btn btn-primary'
                    onClick={() => {
                      showModal();
                    }}>
                    Submit
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className='btn btn-outline-danger'
                    data-bs-dismiss='modal'
                    type='button'
                    onClick={onClick}>
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
}
