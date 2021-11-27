import React from "react";
import s from "./Profile.module.css";
import { MainInfoUser } from "../../containers";

const Profile = () => {
  return (
    <section>
      <div className={s.main_info_user}>
        <MainInfoUser />
      </div>
    </section>
  );
};

export default Profile;
