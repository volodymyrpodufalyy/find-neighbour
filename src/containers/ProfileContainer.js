import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';

import MyProfile from "../pages/MyProfile/MyProfile";
import {addinfoActions} from "redux/actions";
import {LoadingOutlined} from "@ant-design/icons";

const ProfileContainer = ({fetchUserAddInfo, profile,isLoad}) => {

    useEffect(() => {

        fetchUserAddInfo();
    }, [])


    return (
        isLoad ? <LoadingOutlined /> :
        <MyProfile profile={profile}/>
    );




};

export default connect(
    ({ addinfo }) => ({
        profile: addinfo.data,
        isLoad: addinfo.isLoading
    }),
    addinfoActions
)(ProfileContainer);
