import React from "react";
import s from "./settings.module.css"
import imge from "../../assets/img/account-avatar-profile-human-man-user-30448.png";


export let refFromSettingsInfo = React.createRef();

const SettingsInfo = (props) => {




    return (
        <div className={s.settings_div}>


            <div className={s.setting_user_img}>
                <p>
                    {/*<a href={props.img}><img src={props.img}/></a>*/}
                    <a href="#"><img src={imge} alt="User img" /></a>
                </p>
            </div>


            <div className={s.setting_user_name}><p>{props.username} Username</p></div>

            <a className={s.change_photo} href="#">Change photo</a>

            <div className={s.div_email}>
                <label className={s.label_email}>Email:
                    <input className={s.input_label_email}
                           type='email'
                           value={props.gmail}/></label>
            </div>
            <div className={s.div_number}>
                <label className={s.label_phone}>Phone:
                    <input className={s.input_number} value={props.number}/></label>
            </div>
            <div className={s.div_kind_of_activity}>
                <label className={s.setting_kind_of_activity}>Kind of activity:
                    <select>
                        <option>Student</option>
                        <option>Graduate of University</option>
                        <option>Freelancer</option>
                        <option>Work at job</option>
                    </select>

                </label>
            </div>
            <div className={s.div_about}>
                <label className={s.about}>
                    About: <textarea className={s.text_about} ref={refFromSettingsInfo} maxLength={300}>{props.abouts}</textarea>
                </label>
            </div>

            <div className={s.gender}>
                <label className={s.label_gender}>Gender:
                    <select>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non-binary</option>
                    </select>

                </label>
            </div>
            <div className={s.pets}>
                <label className={s.label_pets}>Have pets:
                    <select className={s.select_pets}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>I do not know</option>
                    </select>

                </label>
            </div>
            <div className={s.habits}>
                <label className={s.label_habits}>Have bad habits:
                    <select className={s.select_habits}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>I do not know</option>
                    </select>

                </label>
            </div>
            <div className={s.working}>
                <label className={s.label_working}>Working:
                    <select>
                        <option>Yes</option>
                        <option>No</option>
                        <option>I do not know</option>
                    </select>

                </label>
            </div>
            <div className={s.status}>
                <label className={s.label_status}>Marital status:
                    <select>
                        <option>Yes</option>
                        <option>No</option>
                        <option>I do not know</option>
                    </select>

                </label>
            </div>


        </div>

    )
}
export default SettingsInfo
