import React from "react";
import s from "./mainInfoUser.module.scss";
import img from "../../assets/img/account-avatar-profile-human-man-user-30448.png";

const MainInfoUser = ({ user }) => {
  const { info } = user;

  return (
    <div className={s.main_info_container}>
      <div className={s.user_img}>
        <a href="#">
          <img src={img} alt="User_img" />
        </a>
      </div>
      <div className={s.user_title}>
        <h3>{user?.fullname}</h3>

        {info?.moreAbout && <h5>{user?.moreAbout}</h5>}
      </div>
      <div className={s.additional_info}>
        <div className={s.age}>
          <h5>Age</h5>
          <p>{info?.age} Year</p>
        </div>
        <div className={s.kind_of}>
          <h5>Kind of Activity</h5>
          <p>{info?.isStudent ? "Student" : "Non student"}</p>
        </div>
        <div className={s.city}>
          <h5>City</h5>
          <p>{info?.address.split(',')[0]}</p>
        </div>
      </div>
      <div className={s.btn_cont}>
        <button className={s.btn}>Change Info</button>
      </div>
    </div>
  );
};

export default MainInfoUser;
