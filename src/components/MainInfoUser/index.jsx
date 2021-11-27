import React from 'react';
import s from './mainInfoUser.module.scss'
import {NavLink} from "react-router-dom";
import img from "../../assets/img/account-avatar-profile-human-man-user-30448.png"


const MainInfoUser = props => {


    return (
        <div className={s.main_info_container}>

            <div className={s.user_img}>
                <a href="#">
                    <img src={img} alt="User_img"/>
                </a>
            </div>
            <div className={s.user_title}>
                <h3>Name</h3>

                <h5>Продається автомобіль
                    Volkswagen Touran
                    Свіжо пригнаний з Франції+ можемо розмитнити на Україньску реїстрацію
                    2012 рік</h5>
            </div>
            <div className={s.additional_info}>
                <div className={s.age}>
                    <h5>Age</h5>
                    <p>45 Year</p>
                </div>
                <div className={s.kind_of}>
                    <h5>Kind of Activity</h5>
                    <p>Student</p>
                </div>
                <div className={s.city}>
                    <h5>City</h5>
                    <p>Lviv</p>
                </div>
            </div>
            <div className={s.btn_cont}>
                <button className={s.btn}>Change Info</button>
            </div>


        </div>
    );
}

export default MainInfoUser;

// <div className={s.div2}>
//     <div className={s.user_name}><
//         p>{}</p>
//     </div>
//     <div>
//         <NavLink to={"/Settings"} className={s.settings}>Settings</NavLink>
//     </div>
//     <div className={s.mail}>
//         <p> email:{}</p>
//     </div>
//     <div className={s.kind_of_activity}>
//         <p>Kind of activity: </p></div>
//     <div>
//         <div>
//             <p className={s.About_p}>About:</p>
//         </div>
//         {/*{!props.profile.moreAboutUser ?*/}
//         {/*    <a className={s.aboutref} href={"/Settings"}>добавити про себе</a> :*/}
//         {/*    <textarea className={s.textarea} ref={info} readOnly*/}
//         {/*              maxLength={300}>{props.profile.moreAboutUser}</textarea>*/}
//         {/*}*/}
//
//     </div>
// </div>
