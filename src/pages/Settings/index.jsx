import React from "react";
import {Settings} from "../../containers";
import FooterSearch from "../../components/Search/FooterSearch/FooterSearch";
import s from "./settings_page.module.css"

const SettingsInfo = (props) => {
    return (

        <div className={s.container}>
            <Settings/>
            <FooterSearch/>
        </div>
    )
}

export default SettingsInfo


