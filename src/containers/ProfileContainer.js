import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import MyProfile from "../pages/MyProfile/MyProfile";
import {addinfoActions} from "../redux/actions";

const ProfileContainer = ({fetchUserAddInfo, addinfo}) => {

    useEffect(() => {
        if (addinfo == null ) {
            fetchUserAddInfo()
            console.log("success")
        } else {
            console.log("sss")
            fetchUserAddInfo()

        }
    },[] );


    return (
        <MyProfile profile={addinfo[0]}/>
    );
};

export default connect(
    ({addinfo}) => ({
        addinfo: addinfo.data
    }),
    addinfoActions,
)(ProfileContainer);
