import React, { useState, useEffect } from "react";
import { Empty } from "antd";
import { CardItem } from "components";
import { Filters } from "containers";
import userdata from "./usersdata.json";
import "./Search.scss";

//TODO: Добавити сортування по статі,поганим звичкам і тваринам

const Search = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    setUsersList(userdata.slaves);
  }, [])
  const onHandleList = (value) => {
    setUsersList(value);
  }

  return (
    <section className="search__neighbour">
        <div className="search__neighbour-content">
        <div className="search__neighbour-content-sidebar">
            <Filters onHandleList={onHandleList}/>
          </div>
          <div className="search__neighbour-content-list">
           {usersList.length ? (<ul className="users__list">
              {usersList.map((userInfo) => (
                <li key={userInfo._id}>
                  <CardItem card={userInfo} />
                </li>
              ))}
            </ul>) : (
                <Empty style={{ marginTop: "17rem" }} 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
                description="Нічого не знайдено" />
            )}
          </div>
        </div>
    </section>
  );
};

export default Search;
