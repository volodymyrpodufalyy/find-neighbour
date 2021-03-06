import React, {useEffect, useState} from 'react';
import s from './mainInfoUser.module.scss'
import {Link, NavLink} from "react-router-dom";
import img from "../../assets/img/account-avatar-profile-human-man-user-30448.png"


const MainInfoUser = props => {

    const {fullname} = props.state[0].user
    const {moreAbout, age, kindOfActivity, address} = props.state[0]
    let addressDetail = address.replace(/(^\s+)|(\s+$)/g, '').split(',')

    return (

            <div className={s.main_info_container}>

                <div className={s.user_img}>
                    <a href="#">
                        <img src={img} alt="User_img"/>
                    </a>
                </div>
                <div className={s.user_title}>
                    <h3>{fullname}</h3>

                    <h5>{moreAbout ? moreAbout : <Link to={'/settings'}>Add more info</Link>}</h5>
                </div>
                <div className={s.additional_info}>
                    <div className={s.age}>
                        <h5>Age</h5>
                        <p>{age} Year</p>
                    </div>
                    <div className={s.kind_of}>
                        <h5>Kind of Activity</h5>
                        <p>{kindOfActivity ? 'Студент' : 'Працюю'}</p>
                    </div>
                    <div className={s.city}>
                        <h5>City</h5>
                        <p>{address ? addressDetail[0] : <Link to={'/addinfo'}>Вкажіть <br/> адресу</Link>}</p>
                    </div>
                </div>
                <div className={s.btn_cont}>
                    <Link to={"/settings"} className={s.link}>
                        <button className={s.btn} >Change Info</button>
                    </Link>
                </div>


            </div>
  );
};

export default MainInfoUser;
