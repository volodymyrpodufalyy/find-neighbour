import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';

import MyProfile from "../pages/MyProfile/MyProfile";
import {addinfoActions} from "redux/actions";

const ProfileContainer = ({fetchUserAddInfo, profile}) => {

    useEffect(() => {
        fetchUserAddInfo();
    }, [])


    return (
        <MyProfile profile={profile}/>
    );
};

export default connect(
    ({ addinfo }) => ({
        profile: addinfo.data
    }),
    addinfoActions
)(ProfileContainer);
