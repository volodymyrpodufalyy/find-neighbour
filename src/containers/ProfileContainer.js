import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import MyProfile from "../pages/MyProfile/MyProfile";
import { addinfoActions } from "redux/actions";

const ProfileContainer = ({ fetchUserAddInfo, profile, isLoading }) => {

    useEffect(() => {
        fetchUserAddInfo();
    }, [])

    if (!profile) {
        return  (
            <div className="spin-load">
                <Spin size="large" tip="Завантаження профілю..."/>
            </div>
        );
    }

    return (
        <MyProfile profile={profile}/>
    );
};

export default connect(
    ({ addinfo }) => ({
        profile: addinfo.data,
        isLoading: addinfo.isLoading
    }),
    addinfoActions
)(ProfileContainer);
