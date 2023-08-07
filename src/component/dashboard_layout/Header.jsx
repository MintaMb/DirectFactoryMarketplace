import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  // --------------------- logout api
  const LogOut = async () => {
    localStorage.clear();
    // window.location.reload();
    window.location.href = "/";
  };
  return (
    <>
      <div className="navbar-custom">
        <div className="container-fluid">
          <ul className="list-unstyled topnav-menu float-end mb-0">
            <li className="dropdown d-none d-lg-inline-block">
              <Link
                className="nav-link dropdown-toggle arrow-none waves-effect waves-light"
                data-toggle="fullscreen"
                to="#"
              >
                <i className="fe-maximize noti-icon"></i>
              </Link>
            </li>
            <li className="dropdown notification-list topbar-dropdown">
              <Link
                className="nav-link dropdown-toggle waves-effect waves-light"
                data-bs-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <i className="fe-bell noti-icon"></i>
                <span className="badge bg-danger rounded-circle noti-icon-badge">
                  9
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end dropdown-lg">
                <div className="dropdown-item noti-title">
                  <h5 className="m-0">
                    <span className="float-end">
                      <Link to="" className="text-dark">
                        <small>Clear All</small>
                      </Link>
                    </span>
                    Notification
                  </h5>
                </div>
                <div className="noti-scroll" data-simplebar>
                  <Link
                    to="javascript:void(0);"
                    className="dropdown-item notify-item active"
                  >
                    <div className="notify-icon">
                      <img
                        src="assets/images/users/user-1.jpg"
                        className="img-fluid rounded-circle"
                        alt=""
                      />{" "}
                    </div>
                    <p className="notify-details">Cristina Pride</p>
                    <p className="text-muted mb-0 user-msg">
                      <small>
                        Hi, How are you? What about our next meeting
                      </small>
                    </p>
                  </Link>
                </div>
                <Link
                  to="javascript:void(0);"
                  className="dropdown-item text-center text-primary notify-item notify-all"
                >
                  View all
                  <i className="fe-arrow-right"></i>
                </Link>
              </div>
            </li>
            <li className="dropdown notification-list topbar-dropdown">
              <Link
                className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light"
                data-bs-toggle="dropdown"
                to="javascript:void(0);"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <img
                  src="/assets/images/users/user-1.jpg"
                  alt="user-image"
                  className="rounded-circle"
                />
                <span className="pro-user-name ms-1">
                  Geneva <i className="mdi mdi-chevron-down"></i>
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end profile-dropdown ">
                <div className="dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome !</h6>
                </div>
                <Link
                  to="javascript:void(0);"
                  className="dropdown-item notify-item"
                >
                  <i className="fe-user"></i>
                  <span>My Account</span>
                </Link>
                <Link
                  to="javascript:void(0);"
                  className="dropdown-item notify-item"
                >
                  <i className="fe-settings"></i>
                  <span>Settings</span>
                </Link>
                <div className="dropdown-divider"></div>
                <div
                  onClick={() => LogOut()}
                  className="dropdown-item notify-item"
                >
                  <i className="fe-log-out"></i>
                  <span>Logout</span>
                </div>
              </div>
            </li>
            <li className="dropdown notification-list">
              <Link
                to="javascript:void(0);"
                className="nav-link right-bar-toggle waves-effect waves-light"
              >
                <i className="fe-settings noti-icon"></i>
              </Link>
            </li>
          </ul>
          <div className="logo-box">
            <Link to="/client/overview" className="logo logo-dark text-center">
              <span className="logo-sm">
                <img
                  src="/assets/images/new-logo.png"
                  alt="image"
                  height={22}
                />
              </span>
              <span className="logo-lg">
                <img
                  src="/assets/images/new-logo.png"
                  alt="image"
                  height={50}
                />
              </span>
            </Link>
            <Link to="/client/overview" className="logo logo-light text-center">
              <span className="logo-sm">
                <img
                  src="/assets/images/new-logo.png"
                  alt="image"
                  height={22}
                />
              </span>
              <span className="logo-lg">
                <img
                  src="/assets/images/new-logo.png"
                  alt="image"
                  height={50}
                />
              </span>
            </Link>
          </div>
          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button className="button-menu-mobile waves-effect waves-light">
                <i className="fe-menu"></i>
              </button>
            </li>
            <li>
              <Link
                className="navbar-toggle nav-link"
                data-bs-toggle="collapse"
                data-bs-target="#topnav-menu-content"
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </li>
          </ul>
          <div className="clearfix"></div>
        </div>
      </div>
      <div className="left-side-menu">
        <div className="h-100" data-simplebar>
          <div className="user-box text-center">
            <img
              src="/assets/images/users/user-1.jpg"
              alt="user-img"
              title="Mat Helme"
              className="rounded-circle avatar-md"
            />
            <div className="dropdown">
              <Link
                to="javascript: void(0);"
                className="text-dark dropdown-toggle h5 mt-2 mb-1 d-block"
                data-bs-toggle="dropdown"
              >
                Geneva Kennedy
              </Link>
              <div className="dropdown-menu user-pro-dropdown">
                <Link
                  to="javascript:void(0);"
                  className="dropdown-item notify-item"
                >
                  <i className="fe-user me-1"></i>
                  <span>My Account</span>
                </Link>
                <Link
                  to="javascript:void(0);"
                  className="dropdown-item notify-item"
                >
                  <i className="fe-settings me-1"></i>
                  <span>Settings</span>
                </Link>
                <Link
                  to="javascript:void(0);"
                  className="dropdown-item notify-item"
                >
                  <i className="fe-lock me-1"></i>
                  <span>Lock Screen</span>
                </Link>
                <Link
                  to="javascript:void(0);"
                  className="dropdown-item notify-item"
                >
                  <i className="fe-log-out me-1"></i>
                  <span>Logout</span>
                </Link>
              </div>
            </div>
            <p className="text-muted">Admin Head</p>
          </div>
          <div id="sidebar-menu">
            <ul id="side-menu">
              <li>
                <Link to="/overview">
                  <i className="mdi mdi-chart-box-plus-outline"></i>
                  <span> Overview </span>
                </Link>
              </li>
              <li>
                <Link to="/inventory">
                  <i className="mdi mdi-diamond-stone"></i>
                  <span> Inventory </span>
                </Link>
              </li>
              <li>
                <Link to="/loss-profit">
                  <i className="mdi mdi-currency-usd-circle-outline"></i>
                  <span> Loss Profit </span>
                </Link>
              </li>
              <li>
                <Link to="/add-ons">
                  <i className="mdi mdi-view-grid-plus-outline"></i>
                  <span> Add-Ons </span>
                </Link>
              </li>
              <li>
                <Link to="/messages">
                  <i className="mdi mdi-message-text-outline"></i>
                  <span> Messages </span>
                </Link>
              </li>
              <li>
                <Link to="/order">
                  <i className="mdi mdi-cart-variant"></i>
                  <span> Order </span>
                </Link>
              </li>
              <li>
                <Link to="/user">
                  <i className="mdi mdi-account-outline"></i>
                  <span> User </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </>
  );
};

export default Layout;
