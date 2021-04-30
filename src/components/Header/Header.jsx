import React from 'react';
import {NavLink, useHistory } from 'react-router-dom';
import s from "./Header.module.css";
import { connect } from "react-redux";
import store from 'redux/store';
import { userActions } from "redux/actions";
import main_logo from "../../pages/Home/Main/logo_neifhbor.png";
import main_img from "../../pages/Home/Main/1st-main2-img.jpg";
import "../../../src/pages/Home/Main/App.css"

const Header = ({ isAuth }) => {

    const history  = useHistory()

    const handleLogOut = event =>{
        event.preventDefault();
        store.dispatch(userActions.fetchUserLogOut());
        history.push('/');
    }

    if(isAuth){
        return(
            <div>
                <div className={s.app_header}>
                    <tr className={s.table}>
                        <th><NavLink  to={"/chat"} className={s.newMenu}>Чат</NavLink></th>
                        <th><NavLink  to={"/profile"} className={s.newMenu}>Profile</NavLink></th>
                        <th><NavLink  to={"/home"} className={s.newMenu}>Home</NavLink></th>

                        <th><NavLink  to={"/"} onClick={handleLogOut} className={s.newMenu}>Вийти</NavLink></th>
                    </tr>
                </div>
            </div>
        );
    }
    else{
            return(
                <div >
                    <div className="navbar">
                        <a href="/">
                        <img className="logo_img" src={main_logo} alt=""/></a>
                        <div className="navbuts">
                            <a href="/signin">
                            <input className="navbut1" type="button" value="Have an account"></input>
                            </a>
                            <a href="/signup">
                            <input className="navbut2" type="button" value="Join"></input>
                            </a>
                        </div>
                    </div>

                </div>
            );
        }
}

export default connect(({ user }) => ({ isAuth: user.isAuth }))(Header);
