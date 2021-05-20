import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { CardItem } from "components";
import { Filters } from "containers";
import { connect } from 'react-redux';
import { addinfoActions } from "redux/actions";
import "./Search.scss";

const Search = ({ fetchUserAddInfos, setCurrentPage, results, currentPage, pageSize, totalCount, isLoading }) => {
  const pageChooser = [];

  for (let i = 1; i <= Math.ceil(totalCount/pageSize); i++) {
    pageChooser.push(i);
  }

  useEffect(() => {
    fetchUserAddInfos(currentPage, pageSize);
  }, []);

  const onPageHandle = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchUserAddInfos(pageNumber, pageSize);
  }

  const onHandleList = (value) => {
    // setUsersList(value);
  }

  if(isLoading) {
   return ( 
      <div className="spin-load"> 
        <Spin size="large" tip="Завантаження..."/> 
      </div> 
   );
  }

  return (
    <section className="search__neighbour">
        <div className="search__neighbour-content">
        <div className="search__neighbour-content-sidebar">
            <Filters onHandleList={onHandleList}/>
          </div>
          <div className="search__neighbour-content-list">
            <div>
              <ul className="users__list">
                {results.map((userInfo) => (
                  <li key={userInfo._id}>
                    <CardItem card={userInfo} />
                  </li>
                ))}
              </ul>
              <div className="pages__chooser">
                <ul className="pages__chooser-list">
                  {pageChooser.map((page) => (
                       <li key={page}  >
                        <a onClick={e => onPageHandle(e.target.innerText)} 
                        className="pages__chooser-list-link" 
                        >{page}</a> 
                       </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default connect(
  ({ addinfo }) => ({
      items: addinfo.items.results,
      results: addinfo.results,
      currentPage: addinfo.currentPage,
      pageSize: addinfo.pageSize,
      totalCount: addinfo.totalCount,
      isLoading: addinfo.isLoading
  }),
  addinfoActions
)(Search);