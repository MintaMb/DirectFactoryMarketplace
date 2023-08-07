import React from "react";
import noData from "../../assets/images/no-documents.png"; // no data

function NoData(props) {
  return (
    <div
      className={`text-center mt-5 no-data-msg ${
        props.className ? props.className : ""
      }`}
    >
      <img src={noData} alt="no data" width="100px" />
      <p className="head1 mt-2 text-muted">{props.title}</p>
    </div>
  );
}

export default NoData;
