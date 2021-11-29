import React, {Component} from 'react';
import s from "./MainInfo.module.scss"
import {NavLink} from "react-router-dom";
import imge from "../../../assets/img/account-avatar-profile-human-man-user-30448.png"

let info = React.createRef();

const MainInfo = (props) => {


    return (
        <div>
            <Info profile={props.profile}/>
        </div>
    )
}


const Info = (props) => {

    console.log(props, 'props');

    return (

        <div>
            {/* <div className={s.div1}>             
                    <div className={s.user_img}><p><a href="#"><img src={imge} alt="User img" /></a></p></div>
                <div className={s.div2}>
                    <div className={s.user_name}><p>{props.profile.user.fullname}</p></div>
                    <div><NavLink to={"/Settings"} className={s.settings}>Settings</NavLink></div>
                    <div className={s.mail}><p> email:{props.profile.user.email}</p></div>
                    <div className={s.kind_of_activity}><p>Kind of activity: {props.profile.kindOfActivity ? <a href={"/Settings"}>добавте вид діяльності</a>: props.profile.kindOfActivity}</p></div>
                    <div>
                        <div><p className={s.About_p}>About:</p></div>
                        {!props.profile.moreAboutUser ? <a className={s.aboutref} href={"/Settings"}>добавити про себе</a> :
                            <textarea className={s.textarea} ref={info} readOnly maxLength={300}>{props.profile.moreAboutUser}</textarea>
                        }

                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default MainInfo
