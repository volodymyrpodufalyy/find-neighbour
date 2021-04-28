import React from 'react';
import {NavLink, useHistory } from 'react-router-dom';
import s from "./Header.module.css";
import { connect } from "react-redux";
import store from 'redux/store';  
import { userActions } from "redux/actions";

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
                        <th><NavLink  to={"/"} onClick={handleLogOut} className={s.newMenu}>Вийти</NavLink></th>
                    </tr>
                </div>
            </div>
        );
    }
    else{
            return(
                <div className={s.app_header}>
                    <tr className={s.table}>
                        <th><NavLink  to={"/signup"} className={s.newMenu}>Sign up</NavLink></th>
                        <th><NavLink to={"/signin"} className={s.newMenu}>Login</NavLink></th>
                    </tr>
                </div>
            );
        }
}

export default connect(({ user }) => ({ isAuth: user.isAuth }))(Header);
