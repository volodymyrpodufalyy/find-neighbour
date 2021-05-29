/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Spin } from "antd";
import classNames from "classnames";
import { connect } from 'react-redux';
import { addinfoActions } from "redux/actions";
import { CardItem } from "components";

const UserList = ({ fetchUserAddInfos, results, pageSize, totalCount, isLoading }) => {
    const [currentPage, setAddInfoCurrentPage] = useState(1);

    useEffect(() => {
        fetchUserAddInfos(currentPage, pageSize);
      }, []);
      
    const pageChooser = [];  
      for (let i = 1; i <= Math.ceil(totalCount/pageSize); i++) {
        pageChooser.push(i);
    }

    const onPageHandle = (pageNumber) => {
        const pageInt = parseInt(pageNumber, 10);
        setAddInfoCurrentPage(pageInt);
        fetchUserAddInfos(pageInt, pageSize);
    }

    if(isLoading) {
        return ( 
           <div className="spin-load"> 
             <Spin size="large" tip="Завантаження..."/> 
           </div> 
        );
    }

    return (
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
                        className={classNames("pages__chooser-list-link", {
                          "pages__chooser-list-link--selected": page === currentPage
                        })}
                        >{page}</a> 
                       </li>
                    ))}
                </ul>
              </div>
        </div>
    )
}

export default connect(
    ({ addinfo }) => ({
        items: addinfo.items,
        results: addinfo.results,
        pageSize: addinfo.pageSize,
        totalCount: addinfo.totalCount,
        isLoading: addinfo.isLoading
    }),
    addinfoActions
  )(UserList);