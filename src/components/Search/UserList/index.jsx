import React, { useState } from "react";
import { Spin } from "antd";
import classNames from "classnames";
import { connect } from "react-redux";
import { addinfoActions } from "redux/actions";
import { CardItem } from "components";

const UserList = ({
  fetchUserAddInfos,
  results,
  pageSize,
  totalCount,
  isLoading,
}) => {
  const [currentPage, setAddInfoCurrentPage] = useState(1);

  const pageChooser = [];
  for (let i = 1; i <= Math.ceil(totalCount / pageSize); i++) {
    pageChooser.push(i);
  }

  const onPageHandle = (pageNumber) => {
    const pageInt = parseInt(pageNumber, 10);
    setAddInfoCurrentPage(pageInt);
    fetchUserAddInfos(pageInt, pageSize);
  };

  if (isLoading) {
    return (
      <div className="spin-load">
        <Spin size="large" tip="Завантаження..." />
      </div>
    );
  }

  console.log(results, "res");

  return (
    <div>
      <ul className="users__list">
        {results?.map((userInfo) => (
          <li key={userInfo.id}>
            <CardItem card={userInfo} />
          </li>
        ))}
      </ul>
      <div className="pages__chooser">
        <ul className="pages__chooser-list">
          {pageChooser.map((page) => (
            <li key={page}>
              <button
                onClick={(e) => onPageHandle(e.target.innerText)}
                className={classNames("pages__chooser-list-link", {
                  "pages__chooser-list-link--selected": page === currentPage,
                })}
              >
                {page}
              </button>
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
)(UserList);
