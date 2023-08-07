import React, { useState } from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";

function PortalLayout(props) {
  return (
    <>
      <div className={`dashboard-body`}>
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default PortalLayout;
