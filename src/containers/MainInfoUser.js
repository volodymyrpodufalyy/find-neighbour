import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MainInfoUser } from "components";
import { addinfoActions } from "redux/actions";
import { userActions } from "../redux/actions";
import { Spin } from "antd";
const MainInfoUserContainer = ({ user, isLoading, fetchUserData }) => {
  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(user, "user");

  if (isLoading) {
    return (
      <div className="spin-load">
        <Spin size="large" tip="Завантаження..." />
      </div>
    );
  }

  return <MainInfoUser user={user} />;
};

export default connect(
  ({ user }) => ({
    user: user.data,
  }),

  { ...userActions, ...addinfoActions }
)(MainInfoUserContainer);
