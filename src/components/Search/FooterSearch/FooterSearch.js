import React from "react";
import "./FooterSearch.css";
import gmail from "./gmail.png"
import instagram from "./instagram.svg"
import facebook from "./facebook.svg"

const FooterSearch = () => {
    return(
        <div className="footer__search">
            <div className="footer__eblock"/>
            <div className="footer__search-info">
                <div className="search__contact__us">
                    <h3>Contact us:</h3>
                    <h3>Gmail: propositumtop@gmail.com</h3>
                </div>
                <div className="search__about__us">
                    <img src={instagram} className="sau__i"/>
                    <img src={facebook} className="sau__f"/>
                    <img src={gmail} className="sau__g"/>
                </div>
            </div>
            <h3 className="mbp">©Made By Propositum</h3>
        </div>
    );
}

export default FooterSearch;