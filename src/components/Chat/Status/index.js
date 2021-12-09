import React from "react";
import "./Status.scss";

const Status = ({ fullname }) => (
  <div className="chat__dialog-header">
    <div className="chat__dialog-header-center">
      <b className="chat__dialog-header-username">{fullname}</b>
    </div>
  </div>
);

export default Status;
