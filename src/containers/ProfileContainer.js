import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import MyProfile from "../pages/MyProfile/MyProfile";
import {addinfoActions} from "redux/actions";

const ProfileContainer = ({fetchUserAddInfo, profile}) => {

    useEffect(() => {
        fetchUserAddInfo();
    }, [])

    profile = profile.data[0];

    return (
        <MyProfile profile={profile}/>
    );
};

export default connect(
    ({ addinfo }) => ({
        profile: addinfo
    }),
    addinfoActions
)(ProfileContainer);
