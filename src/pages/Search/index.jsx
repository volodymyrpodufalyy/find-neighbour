import React, { useState, useEffect } from "react";
import { CardItem, Filter } from "components";
import userdata from "./usersdata.json";
import "./Search.scss";

const Search = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    setUsersList(userdata.slaves);
  }, [])

  return (
    <section className="search__neighbour">
        <div className="search__neighbour-content">
        <div className="search__neighbour-content-sidebar">
            <Filter/>
          </div>
          <div className="search__neighbour-content-list">
            <ul className="users__list">
              {usersList.map((userInfo) => (
                <li key={userInfo._id}>
                  <CardItem card={userInfo} />
                </li>
              ))}
            </ul>
          </div>
        </div>
    </section>
  );
};

export default Search;
