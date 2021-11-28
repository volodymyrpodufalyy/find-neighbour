import React, { useEffect } from "react";
import { Card } from "antd";
import { Avatar, CardItem } from "components";
import { useLocation } from "react-router";
import "./UserInfo.scss";
import { connect } from "react-redux";
import { addinfoActions } from "redux/actions";
import { Spin } from "antd";

const UserInfo = (props) => {
  const { fetchUserAddInfos, results, isLoading } = props;
  const { state } = useLocation();

  const { user } = state.info;

  useEffect(() => {
    fetchUserAddInfos(1, 6);
  }, []);

  if (isLoading) {
    return (
      <div className="spin-load">
        <Spin size="large" tip="Завантаження..." />
      </div>
    );
  }

  const details = [
    {
      label: "Age",
      value: state.info?.age,
    },
    {
      label: "Phone number",
      value: state.info?.phoneNumber,
    },
    {
      label: "City",
      value: state.info?.address.split(",")[0],
    },
    {
      label: "Sex",
      value: state.info?.sex,
    },
    {
      label: "Bad habits",
      value: state.info?.hasBadHabits ? "Yes" : "No",
    },
    {
      label: "Has job",
      value: state.info?.hasJob ? "Yes" : "No",
    },
    {
      label: "Is married",
      value: state.info?.isMarried ? "Yes" : "No",
    },
    {
      label: "Is student",
      value: state.info?.isStudent ? "Yes" : "No",
    },
  ];

  return (
    <div className="user-page">
      <div className="user-page__header">
        <div className="header-content">
          <Card
            bordered
            style={{
              width: 240,
              height: 240,
              borderRadius: 20,
              boxShadow: "5px 15px 15px rgb(196, 196, 196)",
            }}
          >
            <div className="card-image">
              <div className="card-image__avatar">
                <Avatar user={user} />
              </div>
            </div>
            <h2 className="card-title centered">{user?.fullname}</h2>
            <h2 className="card-subtitle centered">{user?.email}</h2>
          </Card>
          <Card
            bordered
            style={{
              width: "80%",
              height: 240,
              borderRadius: 20,
              boxShadow: "5px 15px 15px rgb(196, 196, 196)",
              padding: "20px 30px",
            }}
          >
            <h2 className="card-title">Information</h2>
            <p className="card-article">{state.info?.moreAbout}</p>
            <hr />
            <div className="card-details">
              {details.map((item) => (
                <div className="card-details__item">
                  <h3 className="card-title centered">{item.label}</h3>
                  <h3 className="card-subtitle centered">{item.value}</h3>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="user-page__content">
        <h2 className="card-title">Find neighbour</h2>
          <ul className="examples-list">
            {results.map((userInfo) => (
              <li key={userInfo.id}>
                <CardItem card={userInfo} />
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default connect(
  ({ addinfo }) => ({
    items: addinfo.items,
    results: addinfo.results,
    pageSize: addinfo.pageSize,
    totalCount: addinfo.totalCount,
    isLoading: addinfo.isLoading,
  }),
  addinfoActions
)(UserInfo);
