import React from "react";
import s from "./Profile.module.css";
import {MainInfoUser} from "../../containers";
import FooterSearch from "../../components/Search/FooterSearch/FooterSearch";

const Profile = () => {
    return (
        <section className={s.container}>
            <div className={s.main_info_user}>
                <MainInfoUser/>
            </div>
            <FooterSearch/>
        </section>
    );
};

export default Profile;
