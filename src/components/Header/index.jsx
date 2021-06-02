import React from 'react';
import {Link, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import store from 'redux/store';
import { userActions } from "redux/actions";
import { Menu } from 'antd';
import houselogo from "../../assets/img/house-logo.svg"
import s from "./Header.Module.scss";
import { SearchOutlined } from '@ant-design/icons';


const Header = ({  user }) => {

    const history  = useHistory()

    const handleLogOut = event =>{
        event.preventDefault();
        store.dispatch(userActions.fetchUserLogOut());
        history.push('/');
    }


    if((user.data !== null &&  user.data.confirmed ) && user.isAuth){
        return(

                <div className={s.header}>
                    <Menu style={{ color: "red" }} className={s.menu} mode="horizontal">
                                <Menu.Item key="/homepage" className={s.homeMenuItem} >
                                    <div className={s.homelink} >
                                        <div  className={s.houselogo} > <img src={houselogo} alt="House" /> </div>
                                        <SearchOutlined className={s.searchIcon}
                                        style={{ fontSize: "15px", color: "#da1212" }}
                                        />
                                        <Link to={"/"} className={s.homeTitle} >NEIGHBOUR
                                        </Link>
                                    </div>
                                </Menu.Item>
                                <Menu.Item key="/search" className={s.menuItemSearch} >  
                                    <Link to={"/search"}  className={s.link}>Пошук</Link>
                                </Menu.Item>
                                <Menu.Item key="/profile" className={s.menuItemProfile} >
                                    <Link to={"/profile"}  className={s.link}>Профіль</Link>
                                </Menu.Item>
                                <Menu.Item key="/chat" className={s.menuItemChat} >
                                    <Link  to={"/chat"} className={s.link}>Чат</Link>
                                </Menu.Item>
                                <Menu.Item  key="/logout" className={s.menuItemLogOut} >
                                    <Link to={"/"} onClick={handleLogOut} className={s.link}>Вийти</Link>
                                </Menu.Item>
                    </Menu>
                </div>
        );
    }
    else {
            return(
                <div className={s.header}>
                    <Menu className={s.menuLogOut} mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1" >
                            <Link to={"/signup"} className={s.link}>Зареєструватись</Link>
                        </Menu.Item>
                        <Menu.Item key="2" >
                            <Link to={"/signin"} className={s.link}>Ввійти</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            );
        }
}

export default connect( ({ user }) => ( { user: user }) )(Header);
