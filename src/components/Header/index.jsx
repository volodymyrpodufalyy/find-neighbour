import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import store from 'redux/store';
import {userActions} from "redux/actions";
import {Menu} from 'antd';
import houselogo from "../../assets/img/house-logo.svg"
import s from "./Header.Module.scss";
import "./Navbar.css"
import {SearchOutlined} from '@ant-design/icons';


const Header = ({user}) => {

    const history = useHistory()

    const handleLogOut = event => {
        event.preventDefault();
        store.dispatch(userActions.fetchUserLogOut());
        history.push('/');
    }


    if (user.isAuth) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-white"
                 style={{boxShadow: "1px 1px 1px  rgba(25, 25, 29, 0.2)"}}>
                <a className="navbar-brand">
                    <img src={houselogo} alt="House"/>
                    <i className="fas fa-search fa-lg" style={{color: "#ea1717"}}/>
                    <Link to={"/"} className={s.homeTitle}>NEIGHBOUR
                    </Link>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active mr-5">
                            <Link to={"/search"} className="h4 text-dark nav-link ">Search</Link>
                        </li>
                        <li className="nav-item mr-5">
                            <Link to={"/profile"} className="h4 text-dark nav-link">Profile</Link>
                        </li>
                        <li className="nav-item mr-5">
                            <Link to={"/chat"} className="h4 text-dark nav-link">Chat</Link>
                        </li>
                        <li className="nav-item mr">
                            <Link to={"/"} onClick={handleLogOut} className="h4 text-dark nav-link">Log Out</Link>
                        </li>
                    </ul>
                </div>
            </nav>


        );
    } else {
        return (
            <div style={{backgroundColor: "white"}}>
                <a className="navbar-brand">
                    <img src={houselogo} alt="House"/>
                    <i className="fas fa-search fa-lg" style={{color: "#ea1717"}}/>
                    <Link className={s.homeTitle}>NEIGHBOUR
                    </Link>
                </a>
            </div>
        );
    }
}


export default connect(({user}) => ({user: user}))(Header);
