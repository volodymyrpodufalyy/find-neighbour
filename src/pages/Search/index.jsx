import React from "react";
import { UserList } from "components";
import { Filters } from "containers";
import "./Search.scss";
import FooterSearch from "../../components/Search/FooterSearch/FooterSearch";

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
            <FooterSearch/>
        </section>
    );
};

export default Search;
