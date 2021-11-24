import React from "react";
import { UserList } from "components";
import { Filters } from "containers";
import "./Search.scss";

const Search = () => {  

  return (
    <section className="search__neighbour">
        <div className="search__neighbour-content">
        <div className="search__neighbour-content-sidebar">
            <Filters />
          </div>
          <div className="search__neighbour-content-list">
            <UserList/>
          </div>
        </div>
    </section>
  );
};

export default Search;